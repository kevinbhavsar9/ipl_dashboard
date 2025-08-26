// pages/api/scorecard/[matchId].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { chromium } from "playwright";
import { redis } from "../../../../utils/lib/redis";

type Data = { source: string; data?: unknown; error?: string };

const scrapeScoreCard = async (matchId: string) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) " +
      "Chrome/115.0.0.0 Safari/537.36",
  });

  const page = await context.newPage();

  const loggedData: unknown[] = [];

  page.on("console", async (msg) => {
    for (const arg of msg.args()) {
      try {
        const val = await arg.jsonValue();
        if (Array.isArray(val) && (val.length == 2 || val.length > 60)) {
          loggedData.push(val);
          // console.log("Captured console array:", val);
        }
      } catch {
        // Non-serializable content, ignore
        return "Error occured"
      }
    }
  });

  try {
    const response = await page.goto(
      `https://www.iplt20.com/match/2025/${matchId}`,
      {
        waitUntil: "networkidle",
        timeout: 60000, // 1 minute
      }
    );
    console.log("Response status:", response?.status());
    // await page.click("a.ap-inner-tb-click", { hasText: "Innings" });
    await page.waitForTimeout(5000); // wait for console log to appear

    await browser.close();

    const scoreCardData = loggedData[2];

    if (scoreCardData) {
      const transformedScoreCardData =
        Array.isArray(scoreCardData) &&
        scoreCardData?.map((item: any) => {
          const { BattingCard, BowlingCard, Extras } = item;

          const transformed_batting = BattingCard.map((batting_map) => {
            const { PlayerID, PlayerName, Runs, Sixes, Fours, Balls } =
              batting_map;
            return { PlayerID, PlayerName, Runs, Sixes, Fours, Balls };
          });

          const transformed_bowling = BowlingCard.map((bowling_map) => {
            const { PlayerID, PlayerName, Runs, Wickets, Economy } =
              bowling_map;
            return { PlayerID, PlayerName, Runs, Wickets, Economy };
          });

          const transformed_extra = Extras.map((extra_map) => {
            const { BattingTeamName, BowlingTeamName, Total } = extra_map;
            return { BattingTeamName, BowlingTeamName, Total };
          });

          return {
            BattingCard: transformed_batting,
            BowlingCard: transformed_bowling,
            Extras: transformed_extra,
          };
        });

      // return res.status(200).json({
      //   success: true,
      //   data: [[], [], transformedScoreCardData],
      // });

      return transformedScoreCardData;
      // return res.status(200).json({ success: true, data: loggedData });
    } else {
      throw "No console data found";
      // return res
      //   .status(404)
      //   .json({ success: false, error: "No console data found" });
    }
  } catch (error: unknown) {
    await browser.close();
    console.error("Error fetching table:", error);
    const errorMsg =
      typeof error === "object" && error !== null && "message" in error
        ? String((error as { message?: unknown }).message)
        : String(error);
    return errorMsg;
    // res.status(500).json({ success: false, error: errorMsg });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { matchId } = req.query as { matchId?: string };
  if (!matchId)
    return res
      .status(400)
      .json({ source: "fresh", error: "matchId is required" });

  const cached = await redis.get(`${matchId}_scoreCard`);
  if (cached) {
    return res.status(200).json({ source: "cache", data: cached });
  }

  // 2. Otherwise scrape fresh
  const scrapedData = await scrapeScoreCard(matchId); // <-- your scraping logic

  if (typeof scrapedData === "object") {
    // 3. Save in Redis with 1-day expiry (86400 seconds)
    await redis.set(`${matchId}_scoreCard`, scrapedData);

    return res.status(200).json({ source: "fresh", data: scrapedData });
  } else {
    return res.status(500).json({ source: "fresh", error: scrapedData });
  }
}
