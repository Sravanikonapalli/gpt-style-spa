const { nanoid } = require('nanoid');
const sessions = [
    { id: 'sess-1', title: 'Shopping list help' },
    { id: 'sess-2', title: 'Monthly budget' }
];

const conversations = {
    'sess-1': [
        { role: 'user', text: 'Help me plan a shopping list for 2 people for a week.' },
        { role: 'assistant', text: 'Sure — here is a compact shopping list:', table: [
        { item: 'Rice (kg)', qty: '2' },
        { item: 'Milk (L)', qty: '7' },
        { item: 'Eggs (pcs)', qty: '12' }
    ] }
],
'sess-2': [
    { role: 'user', text: 'Give me a simple monthly budget breakdown for ₹50,000' },
    { role: 'assistant', text: 'Here is a suggested breakdown:', table: [
    { category: 'Rent', amount: '20000' },
    { category: 'Groceries', amount: '8000' },
    { category: 'Savings', amount: '10000' }
    ] }
  ]
};


function listSessions() {
    return sessions;
}


function newSession() {
    const id = 'sess-' + nanoid(6);
    const title = `New chat ${sessions.length + 1}`;
    sessions.unshift({ id, title });
    conversations[id] = [];
    return { id, title };
}


function getConversation(id) {
    return conversations[id] || null;
}


function addUserMessage(id, text) {
    if (!conversations[id]) conversations[id] = [];
    conversations[id].push({ role: 'user', text });
}

function generateMockAnswer(id, question) {
// Very simple mock: return a short text and a tiny table based on keywords
    let table = [];
    let answer = `Mock reply to: "${question}"`;
    if (/budget|salary|income/i.test(question)) {
        table = [
            { category: 'Needs', pct: '50%', example: 'Rent, groceries' },
            { category: 'Wants', pct: '30%', example: 'Dining, entertainment' },
            { category: 'Savings', pct: '20%', example: 'Emergency fund' }
        ];
        answer = 'A classic 50/30/20 breakdown might help. See the table below.';

    } else if (/shopping|grocery|list/i.test(question)) {
        table = [
            { item: 'Rice (kg)', qty: '2' },
            { item: 'Milk (L)', qty: '7' },
            { item: 'Eggs (pcs)', qty: '12' }
        ];
        answer = 'Here is a compact shopping list for basics.';
    } else {
        table = [
            { key: 'Example', value: 'Demo row 1' },
            { key: 'Example', value: 'Demo row 2' }
        ];
        answer = 'I generated a small example table for your question.';
    }
    const msg = { role: 'assistant', text: answer, table };
    conversations[id].push(msg);
    return msg;
}

module.exports = {
listSessions,
newSession,
getConversation,
addUserMessage,
generateMockAnswer
};