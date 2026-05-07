// question1/index.js
const express = require('express');
const app = express();
app.use(express.json());

// In-memory database
let items = [];
let nextId = 1;

// GET all
app.get('/items', (req, res) => {
  res.json(items);
});

// GET one
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// POST create
app.post('/items', (req, res) => {
  const item = { id: nextId++, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

// PUT update
app.put('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  items[index] = { id: items[index].id, ...req.body };
  res.json(items[index]);
});

// DELETE
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  items.splice(index, 1);
  res.json({ message: 'Deleted successfully' });
});

app.listen(3000, () => console.log('Server running on port 3000'));