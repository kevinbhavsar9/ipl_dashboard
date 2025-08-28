import { eval_winner } from "../../utils/lib/helper";
import { Extras } from "../../utils/types/MatchStatsTypes";
import CircularProgress from "@mui/material/CircularProgress";

interface DeailsTileProps {
  data: Extras[][];
}

const DetailsTile = ({ data }: DeailsTileProps) => {

  const team1 = data.length > 0 ? data[0][0] : [];
  const team2 = data.length > 0 ? data[1][0] : [];

  return (
    <div className="flex flex-col">
      {

        data.length > 0 ? <>
          {/* ScoreCard for each team */}
          <div className="flex justify-between flex-wrap">
            {[team1, team2].map((item, idx) => (<div key={idx} className="flex flex-col w-full md:w-fit py-2 px-4 my-2 bg-white rounded-xl" >
              <span>{!Array.isArray(item) ? item?.BattingTeamName : ""}</span>
              <strong>{!Array.isArray(item) ? item?.Total : ""}</strong>
            </div>))
            }
          </div>

          {/* Result for the match*/}
          <div className="mx-auto">
            <h2 className="text-xl font-semibold text-green-700 text-center">{eval_winner(team1 as Extras, team2 as Extras)}</h2>
          </div>
        </> :
          <div className="flex justify-center items-center h-[200px] w-full">
            <CircularProgress />
          </div>
      }

    </div >
  );
};

export default DetailsTile;
