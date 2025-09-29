import "./Message.css";

const Message = ({ text, id }) => {
  return (
    <div className="message-container">
      <h1 className="message-title">
        Bonjour<span className="id-text">{id}</span>
      </h1>
      <p className="message-text">{text}</p>
    </div>
  );
};

export default Message;
