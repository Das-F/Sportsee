import "./LineChart.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const sampleData = [
  { name: "L", sessionLength: 30 },
  { name: "M", sessionLength: 40 },
  { name: "M", sessionLength: 50 },
  { name: "J", sessionLength: 30 },
  { name: "V", sessionLength: 30 },
  { name: "S", sessionLength: 50 },
  { name: "D", sessionLength: 50 },
];

const CustomLegend = () => (
  <div className="custom-legend-linechart">
    <h2>
      Durée moyenne des <br /> sessions
    </h2>
  </div>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip-linechart">
        <p>{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

const LineChartComponent = ({ data }) => {
  const chartData = Array.isArray(data) && data.length ? data : sampleData;

  return (
    <div className="line-chart-container">
      <div className="line-chart-responsive-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Legend verticalAlign="top" align="left" content={<CustomLegend />} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
            <XAxis dataKey="name" stroke="#ffffff" tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} />
            <YAxis hide={true} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line type="monotone" dataKey="sessionLength" stroke="#ffffff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
