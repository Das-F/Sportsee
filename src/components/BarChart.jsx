import "./BarChart.css";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bar-chart-tooltip">
        <p>{`${payload[1].value} kg`}</p>
        <p>{`${payload[0].value} kCal`}</p>
      </div>
    );
  }
  return null;
};

const BarChartComponent = ({ data: propData, userId }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoverRect, setHoverRect] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (propData) {
      if (Array.isArray(propData)) {
        if (propData.length && propData[0] && propData[0].day) setSessions(propData);
        else if (propData.length && propData[0] && propData[0].sessions) setSessions(propData[0].sessions);
      } else if (propData.sessions) setSessions(propData.sessions);
      return;
    }

    if (!userId) return;
    setLoading(true);
    import("../../api/api").then(({ GetUserActivityFormatted }) => {
      GetUserActivityFormatted(userId)
        .then((res) => {
          if (!mounted) return;
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

  const usedSessions = sessions.length ? sessions : [];

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
  const ticks = [];
  for (let v = minKg; v <= maxKg; v++) ticks.push(v);

  return (
    <div className="bar-chart-container">
      <CustomLegend />

      <ResponsiveContainer width={680} height="90%">
        <BarChart
          data={chartData}
          barGap={8}
          margin={{ top: 15, right: 30, left: 20, bottom: 15 }}
          onMouseMove={(state) => {
            if (state && state.activeCoordinate) {
              const { x } = state.activeCoordinate;
              setHoverRect({
                x: x - 30,
                width: 60,
              });
            } else {
              setHoverRect(null);
            }
          }}
          onMouseLeave={() => setHoverRect(null)}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} domain={[minKg, maxKg]} ticks={ticks} tickFormatter={(value) => `${value} kg`} />
          <Tooltip content={<CustomTooltip />} cursor={false} />

          {hoverRect && <rect x={hoverRect.x} y={0} width={hoverRect.width} height="100%" fill="rgba(196,196,196,0.3)" pointerEvents="none" />}
          <Bar dataKey="kilogram" fill="#282D30" barSize={8} radius={[10, 10, 0, 0]} yAxisId="right" />

          <Bar dataKey="calories" fill="#E60000" barSize={8} radius={[10, 10, 0, 0]} yAxisId="left" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
