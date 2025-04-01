import React from 'react';
import Chat from '../components/Chat';
import Calendar from '../components/Calendar';

const Labs = () => {
  return (
    <div className="labs-page" style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 1 }}>
        <h2>Web Chat</h2>
        <Chat />
      </div>
      <div style={{ flex: 1 }}>
        <h2>Shared Calendar</h2>
        <Calendar />
      </div>
    </div>
  );
};

export default Labs;
