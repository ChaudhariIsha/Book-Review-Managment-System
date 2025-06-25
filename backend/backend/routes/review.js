const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();


// === CREATE a Review ===
router.post('/',authenticateToken, async (req, res) => {
  const { book_title, review_text, rating,author,genre } = req.body;
    console.log('Decoded user:', req.user);
  const userId = req.user.userId;

  if (!book_title || !review_text|| !rating || !author ||!genre) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await db.promise().query(
      'INSERT INTO reviews (user_id, book_title, review, rating,author,genre) VALUES (?, ?, ?, ?,?,?)',
      [userId, book_title,review_text, rating,author,genre]
    );
    res.status(201).json({ message: 'Review added successfully' });
  } catch (err) {
    console.error('Create review error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// === READ All Reviews ===
router.get('/', async (req, res) => {
  try {
    const [reviews] = await db.promise().query(`
      SELECT r.id, r.book_title, r.author, r.genre, r.review, r.rating, u.name AS reviewer
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      ORDER BY r.id DESC
    `);
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Fetch reviews error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// === UPDATE a Review ===
router.put('/:id', authenticateToken, async (req, res) => {
  const { book_title, author, genre, review_text, rating } = req.body;
  const reviewId = req.params.id;

  try {
    const [result] = await db.promise().query(
      `UPDATE reviews SET book_title = ?, author = ?, genre = ?, review = ?, rating = ? WHERE id = ?`,
      [book_title, author, genre, review_text, rating, reviewId]
    );

    if (result.affectedRows === 0) {
      return res.status(403).json({ error: 'You can only edit your own reviews' });
    }

    res.status(200).json({ message: 'Review updated successfully' });
  } catch (err) {
    console.error('Update review error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// === DELETE a Review ===
router.delete('/:id', authenticateToken, async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.user.id; // User ID from the token

  try {
    // Retrieve the review by its ID
    const [review] = await db.promise().query(
      'SELECT * FROM reviews WHERE id = ?',
      [reviewId]
    );

    // If review doesn't exist
    if (review.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    

    // Proceed to delete the review
    const [result] = await db.promise().query(
      'DELETE FROM reviews WHERE id = ?',
      [reviewId]
    );

    // Check if deletion was successful
    if (result.affectedRows === 0) {
      return res.status(500).json({ error: 'Failed to delete the review' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Delete review error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
