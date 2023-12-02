// MessageContext.js
import React, { createContext, useState, useContext } from "react";

export const MessageContext = createContext();

export const MessageContextProvider = (props) => {
  const [message, setMessage] = useState(
    "Witaj w aplikacji Tomato Accounting!"
  );

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {props.children}
    </MessageContext.Provider>
  );
};
