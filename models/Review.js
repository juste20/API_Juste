const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  commentaire: String,
  note: { type: Number, min: 1, max: 5 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
