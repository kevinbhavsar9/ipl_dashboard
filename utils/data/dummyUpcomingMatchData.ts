import { Match } from "@/pages/api/schedule"; // adjust path

export const matchesDummyData: Match[] = [
  // Live Match
  {
    matchID: "301",
    matchOrder: "1",
    venue: "Wankhede Stadium, Mumbai",
    dateTime: new Date().toISOString(), // live = now
    result: "Live: MI batting 125/3 (15.2 overs)",
    homeTeam: { code: "MI", name: "Mumbai Indians" },
    awayTeam: { code: "CSK", name: "Chennai Super Kings" },
    links: {
      matchReport: "/stats/301",
      highlights: "/highlights/301",
      matchCentre: "/matchCentre/301",
    },
    status:"live"
  },

  // Upcoming Matches
  {
    matchID: "302",
    matchOrder: "2",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    dateTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // +1 day
    result: "Upcoming",
    homeTeam: { code: "RCB", name: "Royal Challengers Bengaluru" },
    awayTeam: { code: "KKR", name: "Kolkata Knight Riders" },
    links: {
      matchReport: "/stats/302",
      highlights: "/highlights/302",
      matchCentre: "/matchCentre/302",
    },
        status:"upcoming"

  },
  {
    matchID: "303",
    matchOrder: "3",
    venue: "Narendra Modi Stadium, Ahmedabad",
    dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    result: "Upcoming",
    homeTeam: { code: "GT", name: "Gujarat Titans" },
    awayTeam: { code: "DC", name: "Delhi Capitals" },
    links: {
      matchReport: "/stats/303",
      highlights: "/highlights/303",
      matchCentre: "/matchCentre/303",
    },
            status:"upcoming"

  },
  {
    matchID: "404",
    matchOrder: "4",
    venue: "Eden Gardens, Kolkata",
    dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    result: "Upcoming",
    homeTeam: { code: "KKR", name: "Kolkata Knight Riders" },
    awayTeam: { code: "SRH", name: "Sunrisers Hyderabad" },
    links: {
     matchReport: "/stats/404",
      highlights: "/highlights/404",
      matchCentre: "/matchCentre/404",
    },
            status:"upcoming"

  },
  {
    matchID: "505",
    matchOrder: "5",
    venue: "Arun Jaitley Stadium, Delhi",
    dateTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    result: "Upcoming",
    homeTeam: { code: "DC", name: "Delhi Capitals" },
    awayTeam: { code: "LSG", name: "Lucknow Super Giants" },
    links: {
     matchReport: "/stats/505",
      highlights: "/highlights/505",
      matchCentre: "/matchCentre/505",
    },
            status:"upcoming"

  },
  {
    matchID: "606",
    matchOrder: "6",
    venue: "Rajiv Gandhi Intl. Stadium, Hyderabad",
    dateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    result: "Upcoming",
    homeTeam: { code: "SRH", name: "Sunrisers Hyderabad" },
    awayTeam: { code: "PBKS", name: "Punjab Kings" },
    links: {
      matchReport: "/stats/606",
      highlights: "/highlights/606",
      matchCentre: "/matchCentre/606",
    },
            status:"upcoming"

  },
];
