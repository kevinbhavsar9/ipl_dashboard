import DetailsTile from "../../../components/MatchDetails/DetailsTile";
import MatchGraph from "../../../components/MatchDetails/MatchGraph";
import MatchScores from "../../../components/MatchDetails/MatchScores";

const Page = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <DetailsTile />
      <MatchScores />
      <MatchGraph />
    </div>
  );
};

export default Page;
