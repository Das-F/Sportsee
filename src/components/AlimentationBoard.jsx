import AlimentationSymbol from "./AlimentationSymbol";

function AlimentationBoard() {
  return (
    <div>
      <AlimentationSymbol icon="/path/to/icon1.png" value={120} unit="kcal" title="Calories" />
      <AlimentationSymbol icon="/path/to/icon2.png" value={30} unit="g" title="Protéines" />
      <AlimentationSymbol icon="/path/to/icon3.png" value={50} unit="g" title="Glucides" />
      <AlimentationSymbol icon="/path/to/icon4.png" value={20} unit="g" title="Lipides" />
    </div>
  );
}

export default AlimentationBoard;
