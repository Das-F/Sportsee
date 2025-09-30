import { useState, useEffect } from "react";
import { GetUserName } from "../api/api.js";
import "./App.css";
import Layout from "./components/Layout.jsx";
import BarChartComponent from "./components/BarChart.jsx";
import RadarChartComponent from "./components/Radarchart.jsx";
import LineChartComponent from "./components/LineChart.jsx";
import PieChartComponent from "./components/PieChart.jsx";
import AlimentationBoard from "./components/AlimentationBoard.jsx";
import Message from "./components/Message.jsx";

function App() {
  // Afficher les infos de l'utilisateur 12 dans la console http://localhost:3000/user/12/activity
  function printUserActivity() {
    fetch("http://localhost:3000/user/12/activity")
      .then((response) => response.json())
      .then((data) => console.log("user activity:", data))
      .catch((err) => console.error("fetch error:", err));
  }
  // Lire l'id utilisateur depuis la query string (?user=12)
  const getUserIdFromQuery = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get("user");
    } catch (e) {
      return null;
    }
  };

  const [firstName, setFirstName] = useState(null);
  const userId = getUserIdFromQuery();

  useEffect(() => {
    if (!userId) return;

    let mounted = true;
    setFirstName(null);
    GetUserName(userId)
      .then((name) => {
        if (mounted) setFirstName(name);
      })
      .catch((err) => console.error("Erreur récupération prénom :", err));
    return () => {
      mounted = false;
    };
  }, [userId]);

  return (
    <>
      <div className="personnal-space">
        <Layout />
        <Message text="Félicitations ! Vous avez explosé vos objectifs hier 👏" id={userId || ""} firstName={firstName} />
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
          <AlimentationBoard userId={userId} />
        </div>
      </div>
    </>
  );
}

export default App;
