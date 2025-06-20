const Book = require('../models/Book');

exports.getBooks = (req, res) => {
  Book.find({ userId: req.userId }, (err, books) => {
    if (err) return res.status(500).json({ error: err });
    res.json(books);
  });
};

exports.createBook = (req, res) => {
  const book = new Book({
    titre: req.body.titre,
    categorie: req.body.categorie,
    annee: req.body.annee,
    userId: req.userId
  });

  book.save((err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Livre ajouté' });
  });
};

exports.updateBook = (req, res) => {
  Book.findOne({ _id: req.params.id, userId: req.userId }, (err, book) => {
    if (!book) return res.status(403).json({ message: 'Accès refusé' });

    Book.updateOne({ _id: req.params.id }, req.body, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Livre mis à jour' });
    });
  });
};

exports.deleteBook = (req, res) => {
  Book.findOneAndDelete({ _id: req.params.id, userId: req.userId }, (err, result) => {
    if (!result) return res.status(403).json({ message: 'Non autorisé ou livre introuvable' });
    res.json({ message: 'Livre supprimé' });
  });
};
