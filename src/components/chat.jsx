import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import '../pages/labs.css'

const socket = io("http://localhost:3000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("new message to relay", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("new message to relay");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("new message sent", message);
      setMessage("");
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className="chat-message">
            {msg}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
