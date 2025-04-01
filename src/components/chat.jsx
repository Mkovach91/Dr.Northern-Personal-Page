import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

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
    <div>
      <div style={{ height: 200, overflowY: "auto", border: "1px solid #ccc", padding: "0.5rem" }}>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
