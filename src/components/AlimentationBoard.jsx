import "./AlimentationBoard.css";
import AlimentationSymbol from "./AlimentationSymbol";
import { useEffect, useState } from "react";
import { GetUserNutritionFormatted } from "../../api/api";

function AlimentationBoard({ userId }) {
  const [nutrition, setNutrition] = useState([]);

  useEffect(() => {
    if (!userId) {
      console.warn("AlimentationBoard: pas d'userId fourni, appel API ignoré");
      return;
    }

    GetUserNutritionFormatted(userId)
      .then((formatted) => {
        console.log("AlimentationBoard: Données formatées:", formatted);
        if (!Array.isArray(formatted)) {
          console.error("AlimentationBoard: format de données inattendu", formatted);
          setNutrition([]);
          return;
        }
        setNutrition(formatted);
      })
      .catch((err) => console.error("Erreur nutrition:", err));
  }, [userId]);

  if (!nutrition.length) return <p>Chargement...</p>;

  return (
    <div className="alimentation-board">
      {nutrition.map((item, index) => (
        <div className="alimentation-symbol-card" key={index}>
          <AlimentationSymbol value={item.value} unit={item.unit} title={item.type} />
        </div>
      ))}
    </div>
  );
}

export default AlimentationBoard;
