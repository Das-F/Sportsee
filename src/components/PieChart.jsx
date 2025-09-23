import "./PieChart.css";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [{ name: "Group A", value: 12 }];
const color = "#FF0000";

function PieChartComponent() {
  return (
    <div className="pie-chart-container" style={{ width: 200, height: 200, position: "relative" }}>
      <h4
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          margin: 0,
          fontSize: "17px",
          fontWeight: "bold",
          color: "#20253A",
        }}
      >
        Score
      </h4>

      <h3
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          margin: 0,
          fontSize: "1rem",
          fontWeight: "normal",
          color: "#74798C",
          pointerEvents: "none",
          textAlign: "center",
          maxWidth: "75px",
        }}
      >
        de votre objectif
      </h3>

      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={70} cornerRadius={8} fill={color} dataKey="value">
            {data.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartComponent;
