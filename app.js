require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('MongoDB erreur :', err));

app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/books', require('./routes/books'));
app.use('/reviews', require('./routes/reviews'));

module.exports = app;
