const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  titre: String,
  categorie: String,
  annee: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Book', bookSchema);
