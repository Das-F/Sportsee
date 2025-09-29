import "./PieChart.css";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

// Données locales (utilisateur courant)
const userData = {
  id: 18,
  score: 0.3,
};

const color = "#FF0000";
const gray = "#F5F5F5";

function PieChartComponent() {
  const rawScore = userData.score ?? userData.todayScore ?? 0;
  const scorePercent = Math.round(rawScore * 100);

  const pieData = [
    { name: "score", value: scorePercent },
    { name: "rest", value: 100 - scorePercent },
  ];

  return (
    <div className="pie-chart-container">
      <h2 className="pie-chart-title">Score</h2>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          margin: 0,
          pointerEvents: "none",
          textAlign: "center",
        }}
      >
        <div className="pie-chart-score">%</div>
        <div className="pie-chart-objective">de votre objectif</div>
      </div>

      <ResponsiveContainer>
        <PieChart>
          <Pie data={pieData} cx="50%" cy="50%" startAngle={180} endAngle={-180} innerRadius={50} outerRadius={60} cornerRadius={8} dataKey="value">
            <Cell key="cell-score" fill={color} />
            <Cell key="cell-rest" fill={gray} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartComponent;
