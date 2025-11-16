import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ChatInput from './ChatInput';
import TableResponse from './TableResponse';
import AnswerFeedback from './AnswerFeedback';
import './ChatWindow.css';

export default function ChatWindow() {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const areaRef = useRef();

  // Load chat history
  useEffect(() => {
    async function loadConversation() {
      if (!sessionId) {
        setMessages([]);
        return;
      }

      try {
        const res = await fetch(`https://gpt-style-spa.onrender.com/api/session/${sessionId}`);
        const data = await res.json();
        setMessages(data.messages || []);
      } catch (err) {
        console.error('Failed to load session', err);
        setMessages([]);
      }
    }

    loadConversation();
  }, [sessionId]);

  // Auto-scroll
  useEffect(() => {
    if (areaRef.current) {
      areaRef.current.scrollTop = areaRef.current.scrollHeight;
    }
  }, [messages]);

  // Send message
  async function handleSend(text) {
    if (!text || !sessionId) return;

    // optimistic user message
    setMessages(prev => [...prev, { role: 'user', text }]);

    try {
      const res = await fetch(`https://gpt-style-spa.onrender.com/api/chat/${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text })
      });

      const reply = await res.json();

      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: reply.text, table: reply.table }
      ]);
    } catch (err) {
      console.error('Send message failed', err);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: 'Error: could not get reply' }
      ]);
    }
  }

  return (
    <div className="chat-window">
      <div className="chat-area" ref={areaRef}>
        
        {!sessionId && (
          <div className="no-session">Select or create a session to start chatting.</div>
        )}

        {messages.map((m, idx) => (
          <div key={idx} className={`message ${m.role}`}>
            <div className="bubble">{m.text}</div>

            {/* table response */}
            {m.table && <TableResponse data={m.table} />}

            {/* feedback only for assistant replies */}
            {m.role === 'assistant' && (
              <AnswerFeedback />
            )}
          </div>
        ))}

      </div>

      <div className="chat-footer">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
