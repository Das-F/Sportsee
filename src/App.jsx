import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BarChartComponent from "./components/Barchart.jsx";
import RadarChartComponent from "./components/Radarchart.jsx";
import LineChartComponent from "./components/LineChart.jsx";
import PieChartComponent from "./components/PieChart.jsx";

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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <button onClick={printUserActivity} style={{ marginLeft: 8 }}>
          Show user activity (console)
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <BarChartComponent />
      <LineChartComponent />
      <PieChartComponent />
      <RadarChartComponent />
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
