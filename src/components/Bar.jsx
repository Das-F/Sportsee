import "./Bar.css";

function Bar({ title }) {
  return (
    <div className="bar" style={{ backgroundColor: "#000000", height: "70px" }}>
      <img src="/sportsee-front/public/assets/logo.svg" alt="Sportsee logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <h2 style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", color: "white" }}>{title}</h2>
      <h2 style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", color: "white" }}>{title}</h2>
    </div>
  );
}

export default Bar;
