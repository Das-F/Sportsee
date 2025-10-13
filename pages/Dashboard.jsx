import "../pages/Dashboard.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetUserName } from "../api/api.js";
import Layout from "../src/components/Layout.jsx";
import BarChartComponent from "../src/components/BarChart.jsx";
import RadarChartComponent from "../src/components/RadarChart.jsx";
import LineChartComponent from "../src/components/LineChart.jsx";
import PieChartComponent from "../src/components/PieChart.jsx";
import AlimentationBoard from "../src/components/AlimentationBoard.jsx";
import Message from "../src/components/Message.jsx";

function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setFirstName(null);

    GetUserName(id)
      .then((name) => {
        if (!name) {
          navigate("/404", { replace: true });
          return;
        }
        if (mounted) setFirstName(name);
      })
      .catch((err) => {
        console.error("Erreur récupération prénom :", err);
        navigate("/404", { replace: true });
      });

    return () => {
      mounted = false;
    };
  }, [id, navigate]);
  return (
    <>
      <div className="dashboard">
        <Layout className="dashboard-layout" />

        <div className="dashboard-content">
          <div className="dashboard-header">
            <Message text="Félicitations ! Vous avez explosé vos objectifs hier 👏" id={id} firstName={firstName} />
          </div>

          <div className="graphs-container">
            <div className="left-graphs">
              <BarChartComponent userId={id} />
              <div className="bottom-graphs">
                <LineChartComponent userId={id} />
                <RadarChartComponent userId={id} />
                <PieChartComponent userId={id} />
              </div>
            </div>
            <div className="right-graphs">
              <AlimentationBoard userId={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
