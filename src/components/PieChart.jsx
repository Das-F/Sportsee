import "./PieChart.css";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { GetUserScoreFormatted } from "../../api/api";

const color = "#FF0000";
const gray = "#F5F5F5";

function PieChartComponent({ userId }) {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    GetUserScoreFormatted(userId)
      .then((s) => {
        // Normalize: some APIs return 0.91 or { score: 0.91 }
        let value = s;
        if (typeof s === "object" && s !== null) value = s.score ?? s.todayScore ?? 0;
        if (typeof value !== "number") value = Number(value) || 0;
        // Clamp between 0 and 1
        value = Math.max(0, Math.min(1, value));
        setScore(value);
      })
      .catch((err) => {
        console.error("PieChart: erreur GetUserScoreFormatted:", err);
        setScore(0);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (!userId) return <p>Utilisateur non spécifié</p>;
  if (loading || score === null) return <p>Chargement...</p>;

  const scorePercent = Math.round(score * 100);

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
        <div className="pie-chart-score">{scorePercent}%</div>
        <div className="pie-chart-objective">
          de votre <br />
          objectif
        </div>
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
