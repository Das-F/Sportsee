import "./BarChart.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Day 1", Kcal: 4000, Kg: 71 },
  { name: "Day 2", Kcal: 3000, Kg: 71 },
  { name: "Day 3", Kcal: 2000, Kg: 71.5 },
  { name: "Day 4", Kcal: 2780, Kg: 71 },
  { name: "Day 5", Kcal: 1890, Kg: 71 },
  { name: "Day 6", Kcal: 2390, Kg: 70 },
  { name: "Day 7", Kcal: 3490, Kg: 70.9 },
  { name: "Day 8", Kcal: 3490, Kg: 70.9 },
  { name: "Day 9", Kcal: 3490, Kg: 70.9 },
  { name: "Day 10", Kcal: 3490, Kg: 70.9 },
];

const CustomLegend = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "0 20px 20px 20px",
    }}
  >
    {/* Title */}
    <h3 style={{ margin: 0, fontWeight: "bold", color: "#20253A" }}>Activité quotidienne</h3>

    {/* dots on right*/}
    <div style={{ display: "flex", gap: "20px", fontSize: "14px", color: "#74798C" }}>
      <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <span
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#282D30",
          }}
        ></span>
        Poids (kg)
      </span>

      <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <span
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#E60000",
          }}
        ></span>
        Calories brûlées (kCal)
      </span>
    </div>
  </div>
);

const BarChartComponent = ({ data: propData }) => {
  const chartData = propData && Array.isArray(propData) && propData.length ? propData : data;

  const kgValues = chartData.map((d) => Number(d.Kg)).filter((v) => !Number.isNaN(v));
  const minKgRaw = kgValues.length ? Math.min(...kgValues) : 0;
  const maxKgRaw = kgValues.length ? Math.max(...kgValues) : 1;

  const minKg = Math.floor(minKgRaw) - 1;
  const maxKg = Math.ceil(maxKgRaw) + 1;

  return (
    <div className="bar-chart-container" style={{ width: "100%", height: 320 }}>
      <CustomLegend />
      <ResponsiveContainer width={800} height="100%">
        <BarChart data={chartData} margin={{ top: 15, right: 30, left: 20, bottom: 15 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" hide />
          <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} domain={[minKg, maxKg]} tickCount={3} tickFormatter={(value) => `${value} kg`} />
          <Tooltip />

          <Bar dataKey="Kcal" fill="#E60000" barSize={8} radius={[10, 10, 0, 0]} yAxisId="left" />
          <Bar dataKey="Kg" fill="#282D30" barSize={8} radius={[10, 10, 0, 0]} yAxisId="right" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
