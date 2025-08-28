import { MatchLinks,Team } from "../types/MatchScheduleTypes";
import { Extras } from "../types/MatchStatsTypes";


export function toTitleCase(str:string) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}


export function formatToIST(isoString: string): string {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    weekday: "short", // Tue
    day: "numeric",   // 3
    month: "short",   // Jun
    hour: "numeric",  // 7
    minute: "2-digit",
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const parts = formatter.formatToParts(date);

  const getValue = (type: string): string => {
    const part = parts.find(p => p.type === type);
    return part ? part.value : "";
  };

  const month = getValue("month").toUpperCase();   // JUN
  const weekday = getValue("weekday").toUpperCase(); // TUE
  const day = getValue("day");                       // 3

  return `${toTitleCase(weekday)}, ${toTitleCase(day)} ${toTitleCase(month)}`;
}



const formatter = Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export const formatNumber = (value: number) => formatter.format(value);

export const getPaginationLabel = (
  data: Array<{
    [key: string]: string | MatchLinks | Team | null | number | undefined;
  }>,
  page: number,
  rowsPerPage: number
) => {
  const length = data.length;
  const totalPages = Math.ceil(length / 5);
  return `Showing ${
    page === null || totalPages === null
      ? 0
      : page === totalPages - 1
      ? length - rowsPerPage * page
      : rowsPerPage
  }
 / ${formatNumber(length)}`;
};

export const eval_winner = (team1: Extras, team2: Extras) => {

    const team1_score: string = team1.Total.split("/")[0];
    const team2_score: string = team2.Total.split("/")[0];
    // const team1_wickets = team1.Total.split("/")[1];
    const team2_wickets: string = team2.Total.split("/")[1];

    if (team1_score > team2_score) {
      return `${team1.BattingTeamName} Won by ${parseInt(team1_score) - parseInt(team2_score)
        } Runs`;
    } else if (team2_score > team1_score) {
      return `${team2.BattingTeamName} Won by ${10 - parseInt(team2_wickets)
        } Wickets`;
    } else {
      return `The match was draw`;
    }

  };
