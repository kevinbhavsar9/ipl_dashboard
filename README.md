## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# 🏏 IPL Real-Time Dashboard

This project focuses on building a **real-time IPL dashboard** that aggregates match data, scorecards, points tables, and schedules.  
Since the IPL website renders data dynamically using APIs and heavy JavaScript, we implemented a **scraping and caching pipeline** to ensure fast, reliable, and user-friendly access to data.

---

## 🚀 Functionality Implemented

### 🔴 Live/Upcoming Match Display
- Developed a **dummy live score function** that simulates match events.  
- Implemented **polling on the client side** to fetch real-time data.  

### 📊 Points Table
- Displayed the **official IPL points table** for team standings and performance metrics.  

### 🗓 Match Schedule
- Designed a **user-friendly schedule view** listing all matches with dates, times, and participating teams.  

### 🎨 Historic Matches Updates
- Built a component to display historic data from past matches, along with **statistics and graphical visualizations**.

### 🎨 Responsiveness User Interface
- Built a **visually appealing, mobile-first design** that works across all devices.  
- Organized match data into **intuitive sections** for seamless navigation.  



---

## 🎁 Bonus Features
- **Caching (Redis):** Reduced redundant scraping/API calls by caching frequently requested data.  
- **Realtime Notifications:** Triggered alerts for significant match events (e.g., wickets).  
- **Historical Data:** Stored and served insights from past matches.  
- **Enhanced Data Visualization:** Incorporated charts and performance trends using **Recharts**.  

---

## ⚙️ Scraping Infrastructure

**Tools Used:**
- [Playwright](https://playwright.dev/) – Headless Chromium automation for rendering JavaScript-heavy pages.  
- [Cheerio](https://cheerio.js.org/) – For HTML parsing and DOM traversal.  
- [Redis](https://redis.io/) – For caching scraped data and improving retrieval speed.  

---

## 📌 Scraping Workflow

### 🏆 Points Table & Match Schedule
1. **Browser Launch**  
   - Chromium launched with custom headers and realistic user-agent (to avoid detection).  

2. **Navigation**  
   - Script waits for network stability (`networkidle`) and table element load.  

3. **Extract HTML & Parse**  
   - Table HTML captured and parsed using Cheerio.  
   - Rows (`<tr>`) and cells (`<td>`) mapped to structured fields.  

4. **Transform Data**  
   - Raw HTML converted into **JSON format**.  

---

### 📋 Scorecard Data
1. **Browser Launch** – Chromium instance started with user-agent headers.  
2. **Page Navigation** – Navigates to a specific match page (`/match/2025/{matchID}`).  
3. **Console Listener** – Captures logs printed in the browser console.  
4. **Data Extraction** – Extracts datasets from console logs (avoiding complex nested tabs).  
5. **Transformation** – Console JSON structured into consumable scorecard data.  

---

## ⚡ Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| **Dynamic Rendering Delay** – IPL site relies on APIs; HTML loads with delays. | Used Playwright to simulate real browser behavior and wait for data load. |
| **Scraping Blockers** – Anti-bot measures prevented direct scraping. | Added headers and user-agent to mimic real user sessions. |
| **Timeout Issues** – Long scraping operations degraded UX. | Cached data in Redis for faster retrieval. |
| **Dummy Data for Live Matches** – No direct data source available. | Created dummy APIs and implemented polling on frontend. |

---

## 🔑 Key Takeaways
- **Hybrid Approach:** Combined DOM scraping + console log capture for reliable data extraction.  
- **Caching Layer:** Redis minimized redundant scraping, drastically improving performance.  
- **Scalability:** Architecture supports historical match analytics, real-time notifications, and richer visualizations.  

---



