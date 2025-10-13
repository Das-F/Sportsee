function ErrorMessage({ message, link }) {
  return (
    <div className="error-page">
      <h1 className="error-text">{message}</h1>
      <p className="error-subtext">{link}</p>
    </div>
  );
}

export default ErrorMessage;
