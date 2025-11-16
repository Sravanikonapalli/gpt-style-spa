### Simplified Chat App — Full-Stack Project (React + Node.js)

A full-stack chat interface similar to ChatGPT.
Includes collapsible sidebar, theme toggle, structured table responses, and feedback buttons — all using React + CSS and a simple Node.js mock API.

### Live URLs
1. **Backend**
[https://gpt-style-spa.onrender.com](https://gpt-style-spa.onrender.com)

2. **Frontend**
[https://gpt-style-spa.vercel.app/](https://gpt-style-spa.vercel.app/)
### Features
## Frontend (React)

- SPA (Single Page Application)
- Collapsible sidebar
- Light/Dark theme toggle
- Chat window with:
    - User messages
    - Assistant text reply
    - Table responses
    - Like / Dislike buttons
- Auto-scroll chat
- Separate CSS for every component
- Only async/await

## Backend (Node + Express)

- Mock API (No database needed)
- Returns sessions, conversations, new session ID
- Accepts user message & returns mock structured reply
- CORS enabled


### Installation & Setup
1. Github setup
```bash
git clone https://github.com/Sravanikonapalli/gpt-style-spa.git
cd chatgpt-style-spa
```

2. Backend Setup
```bash
cd backend
npm install
node server.js
```

Backend runs at:

http://localhost:5000

3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

Frontend runs at:

http://localhost:3000

### API Endpoints

- **GET →** /api/sessions
Returns all session IDs & titles.

- **GET →** /api/new-chat
Generates and returns a new session ID.

- **GET →** /api/session/:id
Returns conversation history for the given session.

- **POST →** /api/chat/:id

Request body:
```bash

{
  "question": "your text"
}
```

Sample response:

```bash
{
  "text": "Here is the information:",
  "table": [
    { "Name": "Alice", "Age": 24 },
    { "Name": "Bob", "Age": 30 }
  ]
}
```

### Tech Stack
**Frontend**
React, 
React Router, 
CSS

**Backend**
Node.js, 
Express, 
CORS