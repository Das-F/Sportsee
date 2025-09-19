import { useState } from "react";
import "./App.css";
import BarChartComponent from "./components/Barchart.jsx";
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
      <div className="card">
        <button onClick={printUserActivity} style={{ marginLeft: 8 }}>
          Show user activity (console)
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <BarChartComponent />
      <LineChartComponent />
      <RadarChartComponent />
      <PieChartComponent />
      <AlimentationBoard />
    </>
  );
}

export default App;
