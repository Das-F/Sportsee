import "../components/ErrorMessage.css";

function ErrorMessage({ message }, { link }) {
  return (
    <div className="error-message">
      <h1 className="error-text">{message}</h1>
      <p className="error-subtext">{link}</p>
    </div>
  );
}

export default ErrorMessage;
