import "./AlimentationBoard.css";
import AlimentationSymbol from "./AlimentationSymbol";
import { useEffect, useState } from "react";
import { GetUserNutritionFormatted } from "../../api/api";

function AlimentationBoard({ userId }) {
  const [nutrition, setNutrition] = useState([]);

  useEffect(() => {
    GetUserNutritionFormatted(userId)
      .then((formatted) => {
        console.log("Données formatées:", formatted);
        setNutrition(formatted);
      })
      .catch((err) => console.error("Erreur nutrition:", err));
  }, [userId]);

  if (!nutrition.length) return <p>Chargement...</p>;

  return (
    <div className="alimentation-board">
      {nutrition.map((item, index) => (
        <div className="alimentation-symbol-card" key={index}>
          <AlimentationSymbol img={item.img} value={item.value} unit={item.unit} title={item.type} />
        </div>
      ))}
    </div>
  );
}

export default AlimentationBoard;
