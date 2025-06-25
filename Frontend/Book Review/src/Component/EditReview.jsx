import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getReviewById, updateReview } from '../Services/bookService';
import '../assets/EditReviewForm.css';

const EditReviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reviewData, setReviewData] = useState({
    book_title: '',
    review_text: '',
    rating: '',
    author: '',
    genre: ''
  });

  const [errors, setErrors] = useState({
    book_title: '',
    review_text: '',
    rating: '',
    author: '',
    genre: ''
  });

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await getReviewById(id);
        setReviewData({
          book_title: response.data.book_title,
          review_text: response.data.review_text,
          rating: response.data.rating,
          author: response.data.author,
          genre: response.data.genre
        });
      } catch (error) {
        toast.error('Failed to load review data.');
        console.error(error);
      }
    };

    fetchReview();
  }, [id]);

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!reviewData.book_title) newErrors.book_title = 'Book title is required';
    if (!reviewData.review_text) newErrors.review_text = 'Review text is required';
    if (!reviewData.rating || reviewData.rating < 1 || reviewData.rating > 5)
      newErrors.rating = 'Rating must be between 1 and 5';
    if (!reviewData.author) newErrors.author = 'Author is required';
    if (!reviewData.genre) newErrors.genre = 'Genre is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await updateReview(id, reviewData);
      if (response.status === 200) {
        toast.success('Review updated successfully!');
        navigate('/book');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="edit-review-form-container">
      <div className="edit-review-form-wrapper">
        <h2>Edit Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="book_title">Book Title</label>
            <input
              type="text"
              id="book_title"
              name="book_title"
              value={reviewData.book_title}
              onChange={handleChange}
              className={errors.book_title ? 'error' : ''}
              readOnly
            />
            {errors.book_title && <span className="error-message">{errors.book_title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={reviewData.author}
              onChange={handleChange}
              className={errors.author ? 'error' : ''}
              readOnly
            />
            {errors.author && <span className="error-message">{errors.author}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={reviewData.genre}
              onChange={handleChange}
              className={errors.genre ? 'error' : ''}
              readOnly
            />
            {errors.genre && <span className="error-message">{errors.genre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="review_text">Review Text</label>
            <textarea
              id="review_text"
              name="review_text"
              value={reviewData.review_text}
              onChange={handleChange}
              className={errors.review_text ? 'error' : ''}
            />
            {errors.review_text && <span className="error-message">{errors.review_text}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating (1-5)</label>
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${reviewData.rating >= star ? 'active' : ''}`}
                  onClick={() => setReviewData(prev => ({ ...prev, rating: star }))}
                >
                  ★
                </button>
              ))}
            </div>
            {errors.rating && <span className="error-message">{errors.rating}</span>}
          </div>

          <div className="form-group">
            <button type="submit" className='update-review-button'>Update Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReviewForm;
