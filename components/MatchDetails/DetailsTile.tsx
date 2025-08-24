const DetailsTile = () => {
  return (
    <div className="flex flex-col mx-8">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span>Mumbai Indians</span>
          <span>Runs: 220</span>
        </div>
        <div className="flex flex-col">
          <span>Chennai Super Kings</span>
          <span>Runs: 235</span>
        </div>
      </div>
      <div className="mx-auto">Chennai Super Kings Won by 15 Runs</div>
    </div>
  );
};

export default DetailsTile;
