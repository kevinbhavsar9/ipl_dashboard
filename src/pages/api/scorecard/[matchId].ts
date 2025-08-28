import type { NextApiRequest, NextApiResponse } from "next";
import { chromium } from "playwright";
import { redis } from "../../../../utils/lib/redis";
import { BattingPlayer,BowlingPlayer, Extras } from "../../../../utils/types/MatchStatsTypes";
import { SCRAPE_URL } from "../../../../utils/config";

type Data = { source: string; data?: unknown; error?: string };

//Score Card data is loged in the IPL site, Below code is listens to console log and store all the logged data, from there score card data is fetched
const scrapeScoreCard = async (matchID: string) => {
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
        }
      } catch {
        return "Error occured"
      }
    }
  });

  try {
    const response = await page.goto(
      `${SCRAPE_URL}/match/2025/${matchID}`,
      {
        waitUntil: "networkidle",
        timeout: 60000, // 1 minute
      }
    );
    console.log("Response status:", response?.status());
    await page.waitForTimeout(5000); // wait for console log to appear

    await browser.close();

    const scoreCardData = loggedData[2];


    if (scoreCardData) {
      const transformedScoreCardData =
        Array.isArray(scoreCardData) &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        scoreCardData?.map((item: any) => {
          const { BattingCard, BowlingCard, Extras } = item;

          let transformed_batting=[]
          let transformed_bowling=[]
          let transformed_extra=[]


           transformed_batting = BattingCard?BattingCard.map((batting_map:BattingPlayer) => {
            const { PlayerID, PlayerName, Runs, Sixes, Fours, Balls } =
              batting_map;
            return { PlayerID, PlayerName, Runs, Sixes, Fours, Balls };
          }):[];

           transformed_bowling = BowlingCard?BowlingCard.map((bowling_map:BowlingPlayer) => {
            const { PlayerID, PlayerName, Runs, Wickets, Economy } =
              bowling_map;
            return { PlayerID, PlayerName, Runs, Wickets, Economy };
          }):[];
           transformed_extra = Extras ? Extras.map((extra_map:Extras) => {
            const { BattingTeamName, BowlingTeamName, Total } = extra_map;
            return { BattingTeamName, BowlingTeamName, Total };
          }):[];

          return {
            BattingCard: transformed_batting??[],
            BowlingCard: transformed_bowling??[],
            Extras: transformed_extra??[],
          };
        });

   

      return transformedScoreCardData;
    } else {
      throw "No console data found";
    }
  } catch (error: unknown) {
    await browser.close();
    console.error("Error fetching table:", error);
    const errorMsg =
      typeof error === "object" && error !== null && "message" in error
        ? String((error as { message?: unknown }).message)
        : String(error);
    return errorMsg;
  }
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { matchID } = req.query as { matchID?: string };
  console.log(matchID,"here is match id")
  if (!matchID)
    return res
      .status(400)
      .json({ source: "fresh", error: "matchID is required" });

  const cached = await redis.get(`${matchID}_scoreCard`);
  if (cached) {
    return res.status(200).json({ source: "cache", data: cached });
  }

  // 2. Otherwise scrape fresh
  const scrapedData = await scrapeScoreCard(matchID); // <-- scraping function

  if (typeof scrapedData === "object") {
    // 3. Save in Redis with 1-day expiry (86400 seconds)
    await redis.set(`${matchID}_scoreCard`, scrapedData);

    return res.status(200).json({ source: "fresh", data: scrapedData });
  } else {
                // @ts-expect-error will fix later
    return res.status(500).json({ source: "fresh", error: scrapedData });
  }
}
