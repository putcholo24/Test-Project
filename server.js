const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

let contacts = 
  [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

app.get('/api/contacts', (req, res) => res.json(contacts));

app.get('/api/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id == req.params.id);
  if (!contact) return res.status(404).send("Contact not found");
  res.json(contact);
});

app.post('/api/contacts', (req, res) => {
  const newContact = { id: Date.now(), ...req.body };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.put('/api/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id == req.params.id);
  if (!contact) return res.status(404).send("Not found");
  Object.assign(contact, req.body);
  res.json(contact);
});

app.delete('/api/contacts/:id', (req, res) => {
  contacts = contacts.filter(c => c.id != req.params.id);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
