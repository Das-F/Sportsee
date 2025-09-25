import { useState } from "react";
import "./App.css";
import Bar from "./components/Bar.jsx";
import BarChartComponent from "./components/BarChart.jsx";
import RadarChartComponent from "./components/Radarchart.jsx";
import LineChartComponent from "./components/LineChart.jsx";
import PieChartComponent from "./components/PieChart.jsx";
import AlimentationBoard from "./components/AlimentationBoard.jsx";

function App() {
  const [count, setCount] = useState(0);
  // debug: vérifier que le composant se rend
  console.log("App rendered, count =", count);
  // Afficher les infos de l'utilisateur 12 dans la console http://localhost:3000/user/12/activity
  function printUserActivity() {
    fetch("http://localhost:3000/user/12/activity")
      .then((response) => response.json())
      .then((data) => console.log("user activity:", data))
      .catch((err) => console.error("fetch error:", err));
  }
  return (
    <>
      <div className="personnal-space">
        <Bar className="accueil" />
        <Bar className="activities" />
      </div>
      <div className="graphs-container">
        <div className="left-graphs">
          <div className="bar-container">
            <BarChartComponent />
          </div>
          <div className="line-radar-pie-container">
            <LineChartComponent />
            <RadarChartComponent />
            <PieChartComponent />
          </div>
        </div>

        <div className="alimentation-graph">
          <AlimentationBoard />
        </div>
      </div>
    </>
  );
}

export default App;
