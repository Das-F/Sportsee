import "./RadarChart.css";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

const localData = {
  userId: 18,
  kind: {
    1: "cardio",
    2: "energy",
    3: "endurance",
    4: "strength",
    5: "speed",
    6: "intensity",
  },
  data: [
    { value: 200, kind: 1 },
    { value: 240, kind: 2 },
    { value: 80, kind: 3 },
    { value: 80, kind: 4 },
    { value: 220, kind: 5 },
    { value: 110, kind: 6 },
  ],
};

const RadarChartComponent = ({ data: propData }) => {
  const src = propData ?? localData;

  let chartData = [];
  if (src && src.kind && Array.isArray(src.data)) {
    chartData = src.data.map((d) => ({ kind: src.kind[d.kind], value: d.value }));
  } else if (Array.isArray(src)) {
    chartData = src;
  }

  const maxValue = chartData.length ? Math.max(...chartData.map((d) => d.value)) : 0;

  return (
    <div className="radar-chart-container">
      <div style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={50} width={630} height={230} data={chartData}>
            <PolarGrid radialLines={false} />
            <PolarAngleAxis dataKey="kind" tick={{ fill: "#FFFFFF", fontSize: 12, fontWeight: 500 }} />
            <PolarRadiusAxis angle={30} domain={[0, Math.max(50, maxValue)]} tick={false} axisLine={false} />
            <Radar name="Performance" dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RadarChartComponent;
