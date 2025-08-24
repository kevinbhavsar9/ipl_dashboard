// pages/api/points-table.js
import { chromium } from "playwright";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

interface PointsTableRow {
  rank: string;
  team: string;
  played: string;
  won: string;
  lost: string;
  noResult: string;
  nrr: string;
  runsFor: string;
  runsAgainst: string;
  points: string;
  recentForm: string;
}

interface PointsTableResponse {
  success: boolean;
  table?: PointsTableRow[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PointsTableResponse>
): Promise<void> {
  const url = "https://www.iplt20.com/points-table/men/2025";

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

    return res.status(200).json({ success: true, table: results });
  } catch (error: unknown) {
    await browser.close();
    console.error("Error fetching table:", error);
    const errorMsg =
      typeof error === "object" && error !== null && "message" in error
        ? String((error as { message?: unknown }).message)
        : String(error);
    res.status(500).json({ success: false, error: errorMsg });
  }
}
