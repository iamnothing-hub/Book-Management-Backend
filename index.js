const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/login', authRoutes);
app.use('/books', bookRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});