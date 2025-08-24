// // app/api/scores/route.ts
// import { NextResponse } from "next/server";
// import axios from "axios";
// import * as cheerio from "cheerio";
// import { parse } from "node-html-parser";

// // export default async function GET() {
// //   try {
// //     const { data } = await axios.get("https://example.com/scores"); // target site
// //     const $ = cheerio.load(data);

// //     console.log($);

// //     // Example: scrape team names and scores
// //     const scores: any[] = [];
// //     $(".score-card").each((_, el) => {
// //       scores.push({
// //         team: $(el).find(".team-name").text().trim(),
// //         score: $(el).find(".score").text().trim(),
// //       });
// //     });

// //     return NextResponse.json({ scores });
// //   } catch (error: any) {
// //     return NextResponse.json({ error: error.message }, { status: 500 });
// //   }
// // }

// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   try {
//     // Fetch the points table page
//     const { data } = await axios.get("https://www.iplt20.com/points-table/men");
//     const $ = cheerio.load(data);

//     // Locate the table container — assuming it's the only or main points table
//     const rows = $("table.ih-td-tab tbody#pointsdata tr");

//     console.log(rows);

//     const table = rows
//       .map((_, row) => {
//         const cols = $(row).find("td");

//         return {
//           pos: cols.eq(0).text().trim(),
//           // Team logo (via <img>) and name inside team cell
//           team: {
//             name: cols.eq(2).find("h2").text().trim(),
//             logo: cols.eq(2).find("img").attr("src"),
//           },
//           matches: cols.eq(3).text().trim(),
//           won: cols.eq(4).text().trim(),
//           lost: cols.eq(5).text().trim(),
//           nr: cols.eq(6).text().trim(),
//           nrr: cols.eq(7).text().trim(),
//           for: cols.eq(8).text().trim(),
//           against: cols.eq(9).text().trim(),
//           points: cols.eq(10).text().trim(),
//           recentForm: cols
//             .eq(11)
//             .find("span.rf")
//             .map((_, s) => $(s).text().trim())
//             .get(),
//         };
//       })
//       .get();

//     return res.status(200).json({ table: table });
//   } catch (error: any) {
//     return res.status(404).json({ error: error.message });
//   }
// }
