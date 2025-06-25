import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitReview } from '../Services/bookService';
import '../assets/SubmitReview.css';

const SubmitReview = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    book_title: '',
    review_text: '',
    rating: '',
    author: '',
    genre: '',
    customGenre: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.book_title.trim()) newErrors.book_title = 'Book title is required';
    if (!formData.author.trim()) newErrors.author = 'Author name is required';
    if (!formData.genre) newErrors.genre = 'Please select a genre';
    if (formData.genre === 'other' && !formData.customGenre.trim()) {
      newErrors.customGenre = 'Please specify the genre';
    }
    if (!formData.review_text.trim()) newErrors.review_text = 'Review is required';
    if (!formData.rating) newErrors.rating = 'Rating is required';
    if (formData.rating && (formData.rating < 1 || formData.rating > 5)) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        genre: formData.genre === 'other' ? formData.customGenre : formData.genre
      };
      const response = await submitReview(submitData);
      if (response.status === 201) {
        onClose();
        navigate('/book');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to submit review. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="submit-review-container">
      <div className="review-form">
        <h2>Write a Book Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="book_title">Book Title</label>
            <input
              type="text"
              id="book_title"
              name="book_title"
              value={formData.book_title}
              onChange={handleChange}
              placeholder="Enter book title"
              className={errors.book_title ? 'error' : ''}
            />
            {errors.book_title && <span className="error-message">{errors.book_title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className={errors.author ? 'error' : ''}
            />
            {errors.author && <span className="error-message">{errors.author}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className={errors.genre ? 'error' : ''}
            >
              <option value="">Select a genre</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="mystery">Mystery</option>
              <option value="science-fiction">Science Fiction</option>
              <option value="biography">Biography</option>
              <option value="history">History</option>
              <option value="poetry">Poetry</option>
              <option value="self-help">Self-Help</option>
              <option value="other">Other</option>
            </select>
            {errors.genre && <span className="error-message">{errors.genre}</span>}
          </div>

          {formData.genre === 'other' && (
            <div className="form-group">
              <label htmlFor="customGenre">Specify Genre</label>
              <input
                type="text"
                id="customGenre"
                name="customGenre"
                value={formData.customGenre}
                onChange={handleChange}
                placeholder="Enter custom genre"
                className={errors.customGenre ? 'error' : ''}
              />
              {errors.customGenre && <span className="error-message">{errors.customGenre}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="rating">Rating (1-5)</label>
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${formData.rating >= star ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                >
                  ★
                </button>
              ))}
            </div>
            {errors.rating && <span className="error-message">{errors.rating}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="review_text">Your Review</label>
            <textarea
              id="review_text"
              name="review_text"
              value={formData.review_text}
              onChange={handleChange}
              placeholder="Share your thoughts about the book..."
              className={errors.review_text ? 'error' : ''}
            />
            {errors.review_text && <span className="error-message">{errors.review_text}</span>}
          </div>

          {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitReview;
