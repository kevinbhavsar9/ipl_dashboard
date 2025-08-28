// pages/api/points-table.js
import { chromium } from "playwright";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import { redis } from "../../../utils/lib/redis";
import { PointsTableResponse, PointsTableRow } from "../../../utils/types/PointTableTypes";
import { SCRAPE_URL } from "../../../utils/config";


//Point table is scrapped from the actual point table in IPL site
const scrapePointsTable = async () => {
  const url = `${SCRAPE_URL}/points-table/men/2025`;

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

    await page.waitForSelector("#pointsdata", { timeout: 30000 });

    const tableHtml = await page.$eval("#pointsdata", (el) => el.innerHTML);

    await browser.close();

    const $ = cheerio.load(`<table>${tableHtml}</table>`);

    const results: PointsTableRow[] = [];

    $("tr").each((_, row) => {
      const cells = $(row).find("td");
      if (cells.length === 0) return;

      const teamCode = $(cells[2]).text().trim();
      const data: PointsTableRow = {
        rank: $(cells[0]).text().trim(),
        team: teamCode,
        played: $(cells[3]).text().trim(),
        won: $(cells[4]).text().trim(),
        lost: $(cells[5]).text().trim(),
        noResult: $(cells[6]).text().trim(),
        nrr: $(cells[7]).text().trim(),
        runsFor: $(cells[8]).text().trim(),
        runsAgainst: $(cells[9]).text().trim(),
        points: $(cells[10]).text().trim(),
        recentForm: $(cells[11]).text().trim(),
      };

      results.push(data);
    });

    return results;
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
  res: NextApiResponse<PointsTableResponse>
): Promise<void> {
  const cached: PointsTableRow[] | null = await redis.get("pointsData");
  if (cached) {
    return res.status(200).json({ source: "cache", table: cached });
  }

  // 2. Otherwise scrape fresh
  const scrapedData = await scrapePointsTable(); // <-- your scraping logic

  if (typeof scrapedData === "object") {
    // 3. Save in Redis with 1-day expiry (86400 seconds)
    await redis.set("pointsData", scrapedData);

    return res.status(200).json({ source: "fresh", table: scrapedData });
  } else {
    return res.status(500).json({ source: "fresh", error: scrapedData });
  }
}
