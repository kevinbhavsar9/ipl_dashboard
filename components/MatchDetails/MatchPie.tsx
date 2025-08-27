import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { PieChartData } from "./MatchScores";

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA46BE"];
const MatchPie = ({ data }: { data: PieChartData[] }) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart data={data}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MatchPie;
