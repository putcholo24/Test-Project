const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let contacts = [
  {
    ContactId: "gbh654dtu6754",
    Name: "Dora Flores",
    Email: "dora@intent.do",
    Phone: "0422 333 555",
    ContactType: "Employee",
    PortalAccess: true,
    AdminAccess: true
  },
  
  {
    ContactId: "gbh654dtu6754",
    Name: "Dora Flores",
    Email: "dora@intent.do",
    Phone: "0422 333 555",
    ContactType: "Client",
    PortalAccess: true,
    AdminAccess: false
  },
  
  {
    ContactId: "gbh654dtu6754",
    Name: "Dora Flores",
    Email: "dora@intent.do",
    Phone: "0422 333 555",
    ContactType: "Lead",
    PortalAccess: false,
    AdminAccess: false
  },
  
  {
    ContactId: "gbh654dtu6754",
    Name: "Dora Flores",
    Email: "dora@intent.do",
    Phone: "0422 333 555",
    ContactType: "Partner",
    PortalAccess: true,
    AdminAccess: false
  },
  
  {
    ContactId: "gbh654dtu6754",
    Name: "Dora Flores",
    Email: "dora@intent.do",
    Phone: "0422 333 555",
    ContactType: "Investor",
    PortalAccess: true,
    AdminAccess: false
  }
];

app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

app.get('/api/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.ContactId === req.params.id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found." });
  }
  res.json(contact);
});

app.post('/api/contacts', (req, res) => {
  const newContact = {
    ContactId: `id${Date.now()}`,
    ...req.body
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.put('/api/contacts/:id', (req, res) => {
  const index = contacts.findIndex(c => c.ContactId === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Contact not found." });
  }
  contacts[index] = { ...contacts[index], ...req.body };
  res.json(contacts[index]);
});

app.delete('/api/contacts/:id', (req, res) => {
  const originalLength = contacts.length;
  contacts = contacts.filter(c => c.ContactId !== req.params.id);
  if (contacts.length === originalLength) {
    return res.status(404).json({ message: "Contact not found." });
  }
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
