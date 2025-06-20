const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  dateInscription: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
