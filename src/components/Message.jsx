// import "./Message.css";
// import { GetUserName } from "../../api/api";

// const Message = ({ text, id, firstName }) => {
//   const displayName = firstName || id || "Utilisateur";
//   return (
//     <div className="message-container">
//       <h1 className="message-title">
//         Bonjour <span className="id-text">{displayName}</span>
//       </h1>
//       <p className="message-text">{text}</p>
//     </div>
//   );
// };

// export default Message;

import "./Message.css";
import { useEffect, useState } from "react";
import { GetUserName } from "../../api/api";

const Message = ({ text, id, firstName }) => {
  const [userName, setUserName] = useState(firstName);

  useEffect(() => {
    if (!firstName && id) {
      GetUserName(id).then((name) => {
        setUserName(name);
      });
    }
  }, [id, firstName]);

  const displayName = userName || "Utilisateur";

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
