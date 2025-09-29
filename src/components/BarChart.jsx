import "./BarChart.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  {
    userId: 18,
    sessions: [
      {
        day: "2020-07-01",
        kilogram: 70,
        calories: 240,
      },
      {
        day: "2020-07-02",
        kilogram: 69,
        calories: 220,
      },
      {
        day: "2020-07-03",
        kilogram: 70,
        calories: 280,
      },
      {
        day: "2020-07-04",
        kilogram: 70,
        calories: 500,
      },
      {
        day: "2020-07-05",
        kilogram: 69,
        calories: 160,
      },
      {
        day: "2020-07-06",
        kilogram: 69,
        calories: 162,
      },
      {
        day: "2020-07-07",
        kilogram: 69,
        calories: 390,
      },
    ],
  },
];

const CustomLegend = () => (
  <div className="bar-chart-legend">
    <h2 className="bar-chart-title">Activité quotidienne</h2>
    <div className="bar-chart-dots">
      <span className="bar-chart-legend-title">
        <span className="bar-chart-legend-dot"></span>
        Poids (kg)
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <span className="bar-chart-legend-dot-red"></span>
        Calories brûlées (kCal)
      </span>
    </div>
  </div>
);

const BarChartComponent = ({ data: propData }) => {
  // Normaliser la source de données pour récupérer un tableau de sessions
  let sessions = [];
  if (propData) {
    if (Array.isArray(propData)) {
      // propData peut être un tableau de sessions ou un tableau d'utilisateurs
      if (propData.length && propData[0] && propData[0].day) {
        sessions = propData;
      } else if (propData.length && propData[0] && propData[0].sessions) {
        sessions = propData[0].sessions;
      }
    } else if (propData.sessions) {
      sessions = propData.sessions;
    }
  }

  // fallback vers les données locales définies au-dessus
  if (!sessions.length && Array.isArray(data) && data[0] && data[0].sessions) {
    sessions = data[0].sessions;
  }

  // formatting days for X axis : '2020-07-01' -> '1'
  const chartData = sessions.map((s) => ({
    day: String(s.day).split("-").pop().replace(/^0/, ""),
    kilogram: s.kilogram,
    calories: s.calories,
  }));

  const kgValues = chartData.map((d) => Number(d.kilogram)).filter((v) => !Number.isNaN(v));
  const minKgRaw = kgValues.length ? Math.min(...kgValues) : 0;
  const maxKgRaw = kgValues.length ? Math.max(...kgValues) : 1;

  const minKg = Math.floor(minKgRaw) - 1;
  const maxKg = Math.ceil(maxKgRaw) + 1;
  // Ticks list for YAxis on right (kg)
  const ticks = [];
  for (let v = minKg; v <= maxKg; v++) ticks.push(v);

  return (
    <div className="bar-chart-container">
      <CustomLegend />
      <ResponsiveContainer width={620} height="90%">
        <BarChart data={chartData} margin={{ top: 15, right: 30, left: 20, bottom: 15 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis yAxisId="left" hide />
          <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} domain={[minKg, maxKg]} ticks={ticks} tickFormatter={(value) => `${value} kg`} />
          <Tooltip />

          <Bar dataKey="calories" fill="#E60000" barSize={8} radius={[10, 10, 0, 0]} yAxisId="left" />
          <Bar dataKey="kilogram" fill="#282D30" barSize={8} radius={[10, 10, 0, 0]} yAxisId="right" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
