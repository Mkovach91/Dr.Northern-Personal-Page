import React from 'react';
import Chat from '../components/Chat';
import Calendar from '../components/calendar';
import '../pages/labs.css'

const Labs = () => {
  return (
    <div className="labs-container">
      <div className="chat-section">
        <Chat />
      </div>
      <div className="calendar-section">
        <Calendar />
      </div>
    </div>
  );
};

export default Labs;