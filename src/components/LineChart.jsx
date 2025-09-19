import "./LineChart.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const sampleData = [
  { name: "L", pv: 2400 },
  { name: "M", pv: 1398 },
  { name: "M", pv: 9800 },
  { name: "J", pv: 3908 },
  { name: "V", pv: 4800 },
  { name: "S", pv: 3800 },
  { name: "D", pv: 4300 },
];

const LineChartComponent = ({ data }) => {
  const chartData = Array.isArray(data) && data.length ? data : sampleData;

  return (
    <div className="line-chart-container">
      <div style={{ width: "100%", height: "100%", backgroundColor: "#E60000" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
            <XAxis dataKey="name" stroke="#ffffff" tickLine={false} axisLine={false} />
            <YAxis hide={true} onClick={() => console.log("Clicked Y Axis")} />
            <Tooltip />
            <Line type="monotone" dataKey="pv" stroke="#ffffff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
