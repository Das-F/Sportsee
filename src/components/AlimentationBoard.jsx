import "./AlimentationBoard.css";
import AlimentationSymbol from "./AlimentationSymbol";

const data = {
  id: 18,
  userInfos: {
    firstName: "Cecilia",
    lastName: "Ratorez",
    age: 34,
  },
  score: 0.3,
  keyData: {
    calorieCount: 2500,
    proteinCount: 90,
    carbohydrateCount: 150,
    lipidCount: 120,
  },
};

function AlimentationBoard() {
  const keyData = data.keyData || {};

  return (
    <div className="alimentation-board">
      <div className="alimentation-symbol-card">
        <AlimentationSymbol img="/assets/AlimentationBoard-icons/Calories-icon.svg" value={keyData.calorieCount} unit="kcal" title="Calories" />
      </div>
      <div className="alimentation-symbol-card">
        <AlimentationSymbol img="/assets/AlimentationBoard-icons/Proteines-icon.svg" value={keyData.proteinCount} unit="g" title="Protéines" />
      </div>
      <div className="alimentation-symbol-card">
        <AlimentationSymbol img="/assets/AlimentationBoard-icons/Glucides-icon.svg" value={keyData.carbohydrateCount} unit="g" title="Glucides" />
      </div>
      <div className="alimentation-symbol-card">
        <AlimentationSymbol img="/assets/AlimentationBoard-icons/Lipides-icon.svg" value={keyData.lipidCount} unit="g" title="Lipides" />
      </div>
    </div>
  );
}

export default AlimentationBoard;
