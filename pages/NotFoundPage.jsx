import "../pages/NotFoundPage.css";
import ErrorMessage from "../src/components/ErrorMessage.jsx";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <div className="not-found">
        <ErrorMessage className="error-message" alt="Error 404" fillColor="#ff0101" />
        <h1>Il n'existe pas de donnée pour cet utilisateur.</h1>
      </div>
      <div className="return-home">
        <Link to="/">Retourner à la page de connexion</Link>
      </div>
    </>
  );
}

export default NotFoundPage;
