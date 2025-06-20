const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = (req, res) => {
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });

    bcrypt.hash(req.body.motDePasse, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: err });

      const user = new User({
        nom: req.body.nom,
        email: req.body.email,
        motDePasse: hash
      });

      user.save((err) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Utilisateur créé' });
      });
    });
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    bcrypt.compare(req.body.motDePasse, user.motDePasse, (err, isValid) => {
      if (!isValid) return res.status(401).json({ message: 'Mot de passe incorrect' });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    });
  });
};
