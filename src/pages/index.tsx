import { MatchContainer } from "../../components/Matches/MatchComponent";
import { PointsComponent } from "../../components/Points/Points";
import { ScheduleComponent } from "../../components/Schedule/ScheduleComponent";


export default function Home() {
  return (
    <div className="flex flex-col h-full w-full overflow-x-hidden gap-4">
      <MatchContainer />
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <PointsComponent />
        <ScheduleComponent />
      </div>
    </div>
  );
}
