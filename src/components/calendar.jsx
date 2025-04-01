import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SharedCalendar = () => {
  const [markedDates, setMarkedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetch('/api/calendar')
      .then((res) => res.json())
      .then((data) => setMarkedDates(data));
  }, []);

  const onDateClick = (date) => {
    setSelectedDate(date);
    fetch('/api/calendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date }),
    }).then(() => setMarkedDates((prev) => [...prev, date]));
  };

  return (
    <Calendar
      onClickDay={onDateClick}
      tileClassName={({ date }) =>
        markedDates.find((d) => new Date(d).toDateString() === date.toDateString())
          ? 'marked-date'
          : null
      }
    />
  );
};

export default SharedCalendar;
