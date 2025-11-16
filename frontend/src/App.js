import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function Home() {
  const navigate = useNavigate();
  async function newChat() {
    try {
      const res = await fetch('https://gpt-style-spa.onrender.com/api/new-chat');
      const data = await res.json();
      navigate(`/chat/${data.id}`);
    } catch (err) {
      console.error('New chat error', err);
      alert('Could not create a new chat. Make sure the backend is running.');
    }
  }

  return (
    <div className="home-root">
      <h2>Welcome to Simplified Chat</h2>
      <p>Click the button to create a new chat session.</p>
      <button className="button" onClick={newChat}>New Chat</button>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.className = dark ? 'dark' : '';
  }, [dark]);

  return (
    <div className="app-root">
      <Sidebar />
      <div className="main">
        <div className="header">
          <div className="brand"><Link to="/">Simplified Chat</Link></div>
          <div className="header-controls">
            <ThemeToggle dark={dark} setDark={setDark} />
          </div>
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:sessionId" element={<ChatWindow />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
