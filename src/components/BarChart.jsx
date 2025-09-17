import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Page A",
    Kcal: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    Kcal: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    Kcal: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    Kcal: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    Kcal: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    Kcal: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    Kcal: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const BarChartComponent = ({ data: propData }) => {
  const chartData = propData && Array.isArray(propData) && propData.length ? propData : data;

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Kg" fill="#282D30" />
          <Bar dataKey="Kcal" fill="#E60000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
