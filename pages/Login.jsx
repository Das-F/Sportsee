import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Login.css";

function Login() {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!userId.trim()) {
      alert("Veuillez entrer un identifiant.");
      return;
    }
    navigate(`/user/${encodeURIComponent(userId.trim())}`);
  }

  return (
    <div>
      <div className="topbar">
        <img className="logo" src="/assets/Logo.svg" alt="Sportsee logo" />
      </div>

      <div className="container">
        <div className="card">
          <h1>Bienvenue sur Sportsee</h1>
          <p>Entrez votre identifiant pour accéder à votre tableau de bord.</p>

          <form className="field" onSubmit={handleSubmit}>
            <label htmlFor="userId">Identifiant utilisateur</label>
            <input id="userId" type="text" placeholder="Ex : 12, 18 ou 20" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <button type="submit">Accéder</button>
            <div className="note">Vous pouvez entrer 12 ou 18 (données d'exemple).</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
