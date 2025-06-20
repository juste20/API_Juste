const Review = require('../models/Review');

exports.createReview = (req, res) => {
  const review = new Review({
    bookId: req.params.bookId,
    userId: req.userId,
    commentaire: req.body.commentaire,
    note: req.body.note
  });

  review.save((err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Avis ajouté' });
  });
};

exports.getReviews = (req, res) => {
  Review.find({ bookId: req.params.bookId }, (err, reviews) => {
    if (err) return res.status(500).json({ error: err });
    res.json(reviews);
  });
};
