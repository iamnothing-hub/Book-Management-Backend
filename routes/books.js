const express = require('express');
const { authenticateToken } = require('../authMiddleware');
const { v4: uuidv4 } = require('uuid');
let books = require('../data/books');

const router = express.Router();

router.use(authenticateToken);

router.get('/', (req, res) => {
  res.json(books);
});

router.post('/', (req, res) => {
  const newBook = { id: uuidv4(), ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  books[index] = { ...books[index], ...req.body };
  res.json(books[index]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  books = books.filter((book) => book.id !== id);
  res.json({ message: 'Book deleted' });
});

module.exports = router;