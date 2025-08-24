import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MatchGraph = () => {
  const data = [
    {
      name: "",
      mi: 0,
      csk: 0,
      amt: 0,
    },
    {
      name: "W1",
      mi: 40,
      csk: 60,
      amt: 50,
    },
    {
      name: "W2",
      mi: 70,
      csk: 80,
      amt: 100,
    },
    {
      name: "W3",
      mi: 90,
      csk: 100,
      amt: 150,
    },
    {
      name: "W4",
      mi: 110,
      csk: 170,
      amt: 200,
    },
    {
      name: "W5",
      mi: 130,
      csk: 200,
      amt: 250,
    },
    {
      name: "W6",
      mi: 210,
      csk: 290,
      amt: 300,
    },
    {
      name: "W7",
      mi: 340,
      csk: 300,
      amt: 350,
    },
  ];

  return (
    <div className="flex justify-center items-center mx-8">
      <div className="w-full h-[40vh] bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="mi" stroke="#2933c3ff" />
            <Line type="monotone" dataKey="csk" stroke="#b1c329ff" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MatchGraph;
