import "./RadarChart.css";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

const sampleData = [
  { subject: "Intensité", A: 120, B: 110, fullMark: 150 },
  { subject: "Vitesse", A: 98, B: 130, fullMark: 150 },
  { subject: "Force", A: 86, B: 130, fullMark: 150 },
  { subject: "Endurance", A: 99, B: 100, fullMark: 150 },
  { subject: "Energie", A: 85, B: 90, fullMark: 150 },
  { subject: "Cardio", A: 65, B: 85, fullMark: 150 },
];

const RadarChartComponent = ({ data = sampleData }) => {
  return (
    <div className="radar-chart-container">
      <div style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={90} width={730} height={250} data={data}>
            <PolarGrid radialLines={false} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#FFFFFF", fontSize: 12, fontWeight: 500 }} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar name="Mike" dataKey="A" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RadarChartComponent;
