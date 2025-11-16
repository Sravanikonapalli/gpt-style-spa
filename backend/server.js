const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mock = require('./mockData');


const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());


// GET /api/sessions
app.get('/api/sessions', (req, res) => {
    res.json({ sessions: mock.listSessions() });
});


// GET /api/new-chat
app.get('/api/new-chat', (req, res) => {
    const session = mock.newSession();
    res.json(session);
});


// GET /api/session/:id
app.get('/api/session/:id', (req, res) => {
    const { id } = req.params;
    const conv = mock.getConversation(id);
    if (!conv) return res.status(404).json({ error: 'Session not found' });
    res.json({ id, messages: conv });
});


// POST /api/chat/:id
app.post('/api/chat/:id', (req, res) => {
    const { id } = req.params;
    const { question } = req.body || {};
    if (!question) return res.status(400).json({ error: 'Missing question in body' });
    // store user message
    mock.addUserMessage(id, question);
    const reply = mock.generateMockAnswer(id, question);
    res.json(reply);
});


app.listen(PORT, () => {
    console.log(`Mock API server running on http://localhost:${PORT}`);
});