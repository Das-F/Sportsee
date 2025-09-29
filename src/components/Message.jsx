import "./Message.css";

const Message = ({ text, id, firstName }) => {
  const displayName = firstName || id || "Utilisateur";
  return (
    <div className="message-container">
      <h1 className="message-title">
        Bonjour <span className="id-text">{displayName}</span>
      </h1>
      <p className="message-text">{text}</p>
    </div>
  );
};

export default Message;
