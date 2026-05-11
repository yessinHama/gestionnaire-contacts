require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const jwt     = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT       = 3001;
const JWT_SECRET = process.env.JWT_SECRET;

// ========== UTILISATEUR PAR DEFAUT ==========
const users = [];

(async () => {
  const hashedPassword = await bcrypt.hash('password', 10);
  users.push({ id: 1, email: 'admin@test.com', password: hashedPassword });
})();

// ========== MIDDLEWARE ==========
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ========== LOGIN ==========
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// ========== CONTACTS PAR DEFAUT ==========
let contacts = [
  {
    id: 1,
    firstname: 'John',
    name: 'Doe',
    email: 'john.doe@example.com',
    phone: '12345678'
  },
];
let nextId = 2;

// ========== ROUTES CONTACTS ==========

// GET
app.get('/contacts', requireAuth, (req, res) => {
  res.json(contacts);
});

// POST
app.post('/contacts', requireAuth, (req, res) => {
  const { firstname, name, email, phone } = req.body;
  const newContact = { id: nextId++, firstname, name, email, phone };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// PUT
app.put('/contacts/:id', requireAuth, (req, res) => {
  const id    = parseInt(req.params.id);
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Contact non trouvé' });
  }
  contacts[index] = { id, ...req.body };
  res.json(contacts[index]);
});

// DELETE
app.delete('/contacts/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id);
  contacts  = contacts.filter((c) => c.id !== id);
  res.json({ message: 'Contact supprimé' });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});