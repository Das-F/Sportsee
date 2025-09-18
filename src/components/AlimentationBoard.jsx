import "./AlimentationBoard.css";
import AlimentationSymbol from "./AlimentationSymbol";

function AlimentationBoard() {
  return (
    <div className="alimentation-board">
      <div className="alimentation-symbol-card">
        <AlimentationSymbol img="/assets/AlimentationBoard-icons/Calories-icon.svg" value={120} unit="kcal" title="Calories" />
      </div>
      <div className="alimentation-symbol-card">
        <AlimentationSymbol img="/assets/AlimentationBoard-icons/Proteines-icon.svg" value={30} unit="g" title="Protéines" />
      </div>
      <div className="alimentation-symbol-card">
        <AlimentationSymbol img="/assets/AlimentationBoard-icons/Glucides-icon.svg" value={50} unit="g" title="Glucides" />
      </div>
      <div className="alimentation-symbol-card">
        <AlimentationSymbol img="/assets/AlimentationBoard-icons/Lipides-icon.svg" value={20} unit="g" title="Lipides" />
      </div>
    </div>
  );
}

export default AlimentationBoard;
