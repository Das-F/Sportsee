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

  const ICONS = {
    Calories: "/assets/AlimentationBoard-icons/Calories-icon.svg",
    Proteines: "/assets/AlimentationBoard-icons/Proteines-icon.svg",
    Glucides: "/assets/AlimentationBoard-icons/Glucides-icon.svg",
    Lipides: "/assets/AlimentationBoard-icons/Lipides-icon.svg",
  };

  return (
    <div className="alimentation-board">
      {nutrition.map((item, index) => (
        <div className="alimentation-symbol-card" key={index}>
          <AlimentationSymbol value={item.value} unit={item.unit} title={item.type} img={ICONS[item.type] || "/assets/AlimentationBoard-icons/Calories-icon.svg"} />
        </div>
      ))}
    </div>
  );
}

export default AlimentationBoard;
