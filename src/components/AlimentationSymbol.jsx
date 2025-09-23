import "./AlimentationSymbol.css";

function AlimentationSymbol({ title, value, unit, img }) {
  return (
    <div className="alimentation-card">
      <div className="alimentation-icon">
        <img src={img} alt={title} />
      </div>
      <div className="alimentation-text">
        <p>
          {value} {unit}
        </p>
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default AlimentationSymbol;
