// pages/api/scorecard/[matchId].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { chromium } from "playwright";



type Data = { success: boolean; data?: unknown; error?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { matchId } = req.query as { matchId?: string };
  if (!matchId)
    return res
      .status(400)
      .json({ success: false, error: "matchId is required" });

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) " +
      "Chrome/115.0.0.0 Safari/537.36",
  });

  const page = await context.newPage();

  const loggedData: unknown[] = [];

  // page.on("console", async (msg) => {
  //   try {
  //     console.log(`Console ${msg.type()}: ${msg.text()}`); // Debug: see all console messages

  //     const args = msg.args();
  //     for (let i = 0; i < args.length; i++) {
  //       try {
  //         const val = await args[i].jsonValue();

  //         // Log all console data for debugging
  //         if (val && typeof val === "object") {
  //           loggedData.push({
  //             type: msg.type(),
  //             index: i,
  //             data: val,
  //             timestamp: new Date().toISOString(),
  //           });

  //           // // Check if this matches your target data structure
  //           // if (
  //           //   val.innings ||
  //           //   val.scorecard ||
  //           //   val.batting ||
  //           //   Array.isArray(val)
  //           // ) {
  //           //   targetData = val;
  //           //   console.log("Target data found:", JSON.stringify(val, null, 2));
  //           // }
  //         }
  //       } catch (argError) {
  //         // Some arguments might not be serializable
  //         console.log(`Non-serializable arg at index ${i}`);
  //       }
  //     }
  //   } catch (error) {
  //     console.log("Console listener error:", error);
  //   }
  // });

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
        console.log("Error occured");
      }
    }
  });

  try {
    const response = await page.goto(
      `https://www.iplt20.com/match/2025/${matchId}`,
      {
        waitUntil: "networkidle",
      }
    );
    console.log("Response status:", response?.status());
    // await page.click("a.ap-inner-tb-click", { hasText: "Innings" });
    await page.waitForTimeout(5000); // wait for console log to appear

    await browser.close();

    if (loggedData) {
      return res.status(200).json({ success: true, data: loggedData });
    } else {
      return res
        .status(404)
        .json({ success: false, error: "No console data found" });
    }
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
