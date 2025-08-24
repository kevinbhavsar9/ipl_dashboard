import React from "react";
import MatchCard from "./MatchCard";

interface MatchContainerProps {
  // className?: string;
}

export const MatchContainer: React.FC<MatchContainerProps> = () => {
  return (
    <div className="flex flex-col border border-gray-300 rounded bg-white my-3">
      <h1 className="mx-4 my-2 font-bold text-grey">Live/Upcoming Matches</h1>
      <div className="flex my-2 max-w-[90vw] overflow-x-scroll scroll scroll-m-4 scroll-bar">
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
      </div>
    </div>
  );
};
