import "./BarChart.css";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

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

const BarChartComponent = ({ data: propData, userId }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    // If propData provided, normalize locally
    if (propData) {
      if (Array.isArray(propData)) {
        if (propData.length && propData[0] && propData[0].day) setSessions(propData);
        else if (propData.length && propData[0] && propData[0].sessions) setSessions(propData[0].sessions);
      } else if (propData.sessions) setSessions(propData.sessions);
      return;
    }

    if (!userId) return;
    setLoading(true);
    // Lazy import API to avoid circular deps at module load
    import("../../api/api").then(({ GetUserActivityFormatted }) => {
      GetUserActivityFormatted(userId)
        .then((res) => {
          if (!mounted) return;
          // res may be { userId, sessions } or an array
          if (Array.isArray(res)) setSessions(res);
          else if (res && Array.isArray(res.sessions)) setSessions(res.sessions);
          else setSessions([]);
        })
        .catch((err) => {
          console.error("BarChart: erreur GetUserActivityFormatted:", err);
          setSessions([]);
        })
        .finally(() => {
          if (mounted) setLoading(false);
        });
    });

    return () => {
      mounted = false;
    };
  }, [propData, userId]);

  if (!userId && (!propData || !propData.length)) return <p>Utilisateur non spécifié</p>;
  if (loading) return <p>Chargement...</p>;

  // No local fallback: prefer API result (sessions) or propData; otherwise show message
  const usedSessions = sessions.length ? sessions : [];

  // formatting days for X axis : '2020-07-01' -> '1'
  const chartData = usedSessions.map((s) => ({
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
      <ResponsiveContainer width={680} height="90%">
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
