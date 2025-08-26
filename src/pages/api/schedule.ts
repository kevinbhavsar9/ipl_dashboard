// pages/api/points-table.js
import { chromium } from "playwright";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import { redis } from "../../../utils/lib/redis";

export type Team = {
  name: string;
  code: string;
  logo: string | null;
  score: string;
  overs: string;
};

export type MatchLinks = {
  matchReport: string | null;
  highlights: string | null;
  matchCentre: string | null;
};

export type Match = {
  matchID: string | undefined;
  matchOrder: string | null;
  venue: string;
  dateTime: string;
  result: string;
  homeTeam: Team;
  awayTeam: Team;
  links: MatchLinks;
  [key: string]: string | MatchLinks | Team | null | number | undefined;
};

const scrapeScheduleTable = async () => {
  const url = "https://www.iplt20.com/matches/results";

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) " +
      "Chrome/115.0.0.0 Safari/537.36",
  });

  const page = await context.newPage();

  try {
    const response = await page.goto(url, { waitUntil: "networkidle" });
    console.log("Response status:", response?.status());

    await page.waitForSelector("#team_archive", { timeout: 30000 });

    const UlHtml = await page.$eval("#team_archive", (el) => el.innerHTML);

    await browser.close();

    // Load into Cheerio
    const $ = cheerio.load(`<ul>${UlHtml}</ul>`);
    const matches: Match[] = [];

    $("li").each((_, el) => {
      const matchOrder = $(el).find(".vn-matchOrder").text().trim() || null;
      const venue = $(el).find(".vn-venueDet p").text().trim();
      const dateTime = $(el).find(".vn-matchDateTime").text().trim();
      const result = $(el).find(".vn-ticketTitle").text().trim();

      const homeTeam = {
        name: $(el)
          .find(".vn-shedTeam")
          .first()
          .find("h3")
          .first()
          .text()
          .trim(),
        code: $(el)
          .find(".vn-shedTeam")
          .first()
          .find(".vn-teamCode h3")
          .text()
          .trim(),
        logo:
          $(el).find(".vn-shedTeam").first().find("img").attr("src") || null,
        score: $(el).find(".vn-shedTeam").first().find("p").text().trim(),
        overs: $(el)
          .find(".vn-shedTeam")
          .first()
          .find(".ov-display")
          .text()
          .trim(),
      };

      const awayTeam = {
        name: $(el)
          .find(".vn-shedTeam")
          .last()
          .find("h3")
          .first()
          .text()
          .trim(),
        code: $(el)
          .find(".vn-shedTeam")
          .last()
          .find(".vn-teamCode h3")
          .text()
          .trim(),
        logo: $(el).find(".vn-shedTeam").last().find("img").attr("src") || null,
        score: $(el).find(".vn-shedTeam").last().find("p").text().trim(),
        overs: $(el)
          .find(".vn-shedTeam")
          .last()
          .find(".ov-display")
          .text()
          .trim(),
      };

      const links = {
        matchReport: $(el).find("a.matchReportIcon").attr("href") || null,
        highlights: $(el).find("a.matchHLIcon").attr("href") || null,
        matchCentre: $(el).find("a.vn-matchBtn").attr("href") || null,
      };

      const tempArr = links.matchCentre?.split("/");
      const matchID = tempArr && tempArr[tempArr?.length - 1];

      matches.push({
        matchID,
        matchOrder,
        venue,
        dateTime,
        result,
        homeTeam,
        awayTeam,
        links,
      });
    });

    return matches;
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
  res: NextApiResponse
): Promise<void> {
  const cached: Match[] | null = await redis.get("scheduleData");
  if (cached) {
    return res.status(200).json({ source: "cache", matches: cached });
  }

  // 2. Otherwise scrape fresh
  const scrapedData = await scrapeScheduleTable(); // <-- your scraping logic

  if (typeof scrapedData === "object") {
    // 3. Save in Redis with 1-day expiry (86400 seconds)
    await redis.set("scheduleData", scrapedData, { ex: 86400 });

    return res.status(200).json({ source: "fresh", matches: scrapedData });
  } else {
    return res.status(500).json({ source: "fresh", error: scrapedData });
  }
}
