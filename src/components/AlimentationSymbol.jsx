function AlimentationSymbol({ title, value, unit, img }) {
  return (
    <div>
      <img src={img} alt={title} />
      <p>
        {value} {unit}
      </p>
      <h3>{title}</h3>
    </div>
  );
}

export default AlimentationSymbol;
