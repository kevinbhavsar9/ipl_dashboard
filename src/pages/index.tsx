import { MatchContainer } from "../../components/live_upcoming_matches/MatchComponent";
import { PointsComponent } from "../../components/Points/Points";
import { ScheduleComponent } from "../../components/Schedule/ScheduleComponent";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full">
      <MatchContainer className="border border-gray-300 rounded bg-white my-3"/>
      <div className="grid grid-cols-2 h-2/3 my-1">
        <PointsComponent className="border border-gray-300 rounded bg-white mr-1"/>
        <ScheduleComponent className="border border-gray-300 rounded bg-white ml-1"/>
      </div>
    </div>
  );
}
