import React, { useState } from 'react';
import './ChatInput.css';

export default function ChatInput({ onSend }) {
  const [text, setText] = useState('');

  function submit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  }

  return (
    <form className="chat-input-form" onSubmit={submit}>
      <input
        className="chat-input-field"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button className="button" type="submit">Send</button>
    </form>
  );
}
