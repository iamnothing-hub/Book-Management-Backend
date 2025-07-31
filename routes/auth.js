const express = require('express');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../authMiddleware');

const router = express.Router();

const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'user1', password: 'user123' }
];

router.post('/', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username: user.username }, secretKey, {
    expiresIn: '1h'
  });

  res.json({ token });
});

module.exports = router;