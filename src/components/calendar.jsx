import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SharedCalendar = () => {
  const [markedDates, setMarkedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Load marked dates on mount
  useEffect(() => {
    fetch('/api/calendar')
      .then(res => res.json())
      .then(data => setMarkedDates(data));
  }, []);

  const onDateClick = async (date) => {
    setSelectedDate(date);
    const response = await fetch(`/api/calendar/comments?date=${date.toISOString()}`);
    const data = await response.json();
    setComments(data);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const response = await fetch('/api/calendar/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate, comment: newComment })
    });

    if (response.ok) {
      const updated = await response.json();
      setComments(updated);
      setMarkedDates((prev) => [...new Set([...prev, selectedDate])]);
      setNewComment("");
    }
  };

  return (
    <div>
      <Calendar
        onClickDay={onDateClick}
        tileClassName={({ date }) =>
          markedDates.find(d => new Date(d).toDateString() === date.toDateString())
            ? 'marked-date'
            : null
        }
      />

      {selectedDate && (
        <div className="comment-box">
          <h4>Comments for {selectedDate.toDateString()}:</h4>
          <ul>
            {comments.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment..."
          />
          <button onClick={handleCommentSubmit}>Add Comment</button>
        </div>
      )}
    </div>
  );
};

export default SharedCalendar;
