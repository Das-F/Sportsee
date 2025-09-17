function AlimentationSymbol({ title, value, unit, icon }) {
  return (
    <div>
      <img src={icon} alt={title} />
      <p>
        {value} {unit}
      </p>
      <h3>{title}</h3>
    </div>
  );
}

export default AlimentationSymbol;
