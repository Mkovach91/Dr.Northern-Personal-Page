import React, { useEffect, useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001'); 
    ws.onmessage = (event) => setMessages((prev) => [...prev, event.data]);
    setSocket(ws);
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && message.trim()) {
      socket.send(message);
      setMessage('');
    }
  };

  return (
    <div>
      <div style={{ height: 200, overflowY: 'auto', border: '1px solid #ccc', padding: '0.5rem' }}>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
