export type Team = {
  name: string;
  code: string;
  logo?: string ;
  score?: string;
  overs?: string;
};

export type MatchLinks = {
  matchReport?: string;
  highlights?: string ;
  matchCentre?: string;
};

export type Match = {
  matchID?: string ;
  matchOrder?: string ;
  venue: string;
  dateTime: string;
  result: string;
  homeTeam: Team;
  awayTeam: Team;
  links: MatchLinks;
  status:"live" | "upcoming" | "past";
};