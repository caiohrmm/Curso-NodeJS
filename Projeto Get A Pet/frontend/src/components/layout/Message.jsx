import styles from "./Message.module.css";

import React, { useState, useEffect } from "react";

import bus from "../../utils/bus";

const Message = () => {
  // Estado que manipula se a mensagem é de sucesso ou de erro
  const [type, setType] = useState("");

  // Estado que manipula se a flash message vai estar visivel ou nao
  const [visibility, setVisibility] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    bus.addListener('flash', ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);
      setTimeout(() => {
        setVisibility(false);
      }, 10000);
    });
  }, []);

  return (
    visibility && (
      <div className={`${styles.message} ${styles[type]}`}>{message} </div>
    )
  );
};

export default Message;
