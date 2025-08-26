import { Extras } from "@/pages/stats/[matchId]";

interface DeailsTileProps {
  data: Extras[][]
}

const DetailsTile = ({ data }: DeailsTileProps) => {

  console.log(data)

  const eval_winner = (team1: Extras, team2: Extras) => {

    console.log(team1, team2)
    if (Array.isArray(team1) && Array.isArray(team2)) {
      return "Loading"
    }
    else {
      const team1_score: string = team1.Total.split("/")[0];
      const team2_score: string = team2.Total.split("/")[0];
      // const team1_wickets = team1.Total.split("/")[1];
      const team2_wickets:string = team2.Total.split("/")[1];

      if (team1_score > team2_score) {
        return `${team1.BattingTeamName} Won by ${parseInt(team1_score) - parseInt(team2_score)} Runs`
      }
      else if (team2_score > team1_score) {
        return `${team2.BattingTeamName} Won by ${10 - parseInt(team2_wickets)} Wickets`

      }
      else {
        return `The match was draw`;

      }
    }


  }

  const team1 = data.length > 0 ? data[0][0] : [];
  const team2 = data.length > 0 ? data[1][0] : [];

  return (
    <div className="flex flex-col mx-8">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span>{!Array.isArray(team1) ? team1?.BattingTeamName : ""}</span>
          <span>{!Array.isArray(team1) ? team1?.Total : ""}</span>
        </div>
        <div className="flex flex-col">
          <span>{!Array.isArray(team2) ? team2?.BattingTeamName : ""}</span>
          <span>{!Array.isArray(team2) ? team2?.Total : ""}</span>

        </div>
      </div>
      <div className="mx-auto">{!Array.isArray(team1) && !Array.isArray(team2)
        ? eval_winner(team1, team2)
        : "Loading..."}</div>
    </div>
  );
};

export default DetailsTile;
