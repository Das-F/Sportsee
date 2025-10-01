import "./AlimentationSymbol.css";

function AlimentationSymbol({ title, value, unit, img }) {
  const defaultImg = "/assets/AlimentationBoard-icons/Calories-icon.svg";
  return (
    <div className="alimentation-card">
      <div className="alimentation-icon">
        <img className="alimentation-icon-img" src={img || defaultImg} alt={title ? `${title} icon` : "nutrition icon"} />
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
