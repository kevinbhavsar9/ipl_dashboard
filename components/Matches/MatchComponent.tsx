import React from "react";
import MatchCard from "./MatchCard";
import { matchesDummyData } from "../../utils/data/dummyUpcomingMatchData";





export const MatchContainer = () => {
  return (
    <div className="flex flex-col border border-gray-300 rounded bg-white my-3">
      <h1 className="mx-4 my-2 font-bold text-grey">Live/Upcoming Matches</h1>
      <div className="flex my-2 max-w-[95vw] overflow-x-scroll scroll scroll-m-4 scroll-bar">
        {
          matchesDummyData.map((item) => <MatchCard key={item.matchID} matchDetails={item}/>)
        }
      </div>
    </div>
  );
};
