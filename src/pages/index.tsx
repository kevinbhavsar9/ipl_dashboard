import { LiveUpComingMatchContainer } from "../../components/Matches/LiveUpComingMatchContainer";
import { PointsComponent } from "../../components/Points/Points";
import { ScheduleComponent } from "../../components/Schedule/ScheduleComponent";


export default function Home() {
  return (
    <div className="flex flex-col h-full w-full overflow-x-hidden gap-4">
      <LiveUpComingMatchContainer />
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <PointsComponent />
        <ScheduleComponent />
      </div>
    </div>
  );
}
