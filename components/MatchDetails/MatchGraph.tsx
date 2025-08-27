import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  Cell,
} from "recharts";
import { BarChartData } from "./MatchScores";
import { formatNumber } from "../../utils/utilFunctions";
import { COLORS } from "./MatchPie";

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  tooltipContent: string;
}

const MatchGraph = ({
  data,
  tooltipContent,
}: {
  data: BarChartData[];
  tooltipContent: string;
}) => {
  const CustomBarChartTooltip = ({
    active = false,
    payload = [],
    tooltipContent,
  }: TooltipProps) =>
    active && payload && payload.length ? (
      <div className="flex flex-col w-[250px] border border-[#F6F6F6] shadow-tooltip">
        <div className="flex items-center p-3 bg-[#F6F6F6] text-[#4D4D4D] text-xs font-semibold">
          {payload[0].payload.label}
        </div>
        <div className="flex flex-col p-3 gap-3 bg-white">
          <div className="flex gap-2 justify-start items-center">
            <div className="text-[#4D4D4D] text-xs">
              {`${tooltipContent}: `}{" "}
              <span className="font-semibold">
                {formatNumber(payload[0].payload.value)}
              </span>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            axisLine={{ stroke: "#ccc", fill: "none" }}
            dataKey={"label"}
            tickFormatter={(value) =>
              value.includes(" ") ? value.split(" ")[0] : value
            }
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={formatNumber}
          />
          <Tooltip
            wrapperStyle={{ outline: "none" }}
            content={<CustomBarChartTooltip tooltipContent={tooltipContent} />}
            cursor={false}
          />
          <Bar
            dataKey="value"
            name="label"
            fill="#39729F"
            radius={[0, 0, 0, 0]}
            barSize={40}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MatchGraph;
