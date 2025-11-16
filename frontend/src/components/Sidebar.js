import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { IoIosAdd } from "react-icons/io";

export default function Sidebar() {
  const [sessions, setSessions] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    async function fetchSessions() {
      try {
        const res = await fetch('https://gpt-style-spa.onrender.com/api/sessions');
        const data = await res.json();
        setSessions(data.sessions || []);
      } catch (err) {
        console.error('Could not load sessions', err);
      }
    }
    fetchSessions();
  }, [loc]);

  async function createNew() {
    try {
      const res = await fetch('https://gpt-style-spa.onrender.com/api/new-chat');
      const data = await res.json();
      navigate(`/chat/${data.id}`);
    } catch (err) {
      console.error('New session error', err);
    }
  }

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Collapse Button */}
      <button
        className="collapse-btn"
        onClick={() => setCollapsed(prev => !prev)}
      >
        {collapsed ? '>>' : '<<'}
      </button>

      {/* Expanded Sidebar Content */}
      {!collapsed && (
        <>
          <div className="sidebar-header">
            <h3 className="sidebar-title">Sessions</h3>
            <button className="button" onClick={createNew}>New</button>
          </div>

          <div className="session-list">
            {sessions.length === 0 && (
              <div className="no-sessions">No sessions yet</div>
            )}

            {sessions.map(s => (
              <div
                key={s.id}
                className="session-item"
                onClick={() => navigate(`/chat/${s.id}`)}
              >
                <div className="session-title">{s.title}</div>
                <div className="session-id">{s.id}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {collapsed && (
        <div className="collapsed-icons">
          <div className="icon-new" onClick={createNew}><IoIosAdd size={25}/></div>
        </div>
      )}
    </aside>
  );
}
