import React from 'react';
import './AnswerFeedback.css';

export default function AnswerFeedback() {
  return (
    <div className="feedback-wrap">
      <button className="feedback-btn like">Like</button>
      <button className="feedback-btn dislike">Dislike</button>
    </div>
  );
}
