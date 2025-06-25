import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllReviews, deleteReview } from '../Services/bookService';
import '../assets/ReviewList.css'; 

const ReviewListUnique = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getAllReviews();
        if (Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          console.warn('Unexpected review format:', response.data);
          setReviews([]);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to fetch reviews. Please try again.');
      }
    };

    fetchReviews();
  }, []);

  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteReview(reviewToDelete.id);
      toast.success('Review deleted successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setReviews(reviews.filter((review) => review.id !== reviewToDelete.id));
    } catch (error) {
      toast.error('Failed to delete review. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error deleting review:', error);
    }
    setShowDeleteModal(false);
    setReviewToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setReviewToDelete(null);
  };

  if (error) return <p className="review-list-error">{error}</p>;
  if (reviews.length === 0) return <p className="review-list-empty">No reviews found.</p>;

  return (
    <>
      <div className="review-list-container">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <p><strong>Book:</strong> {review.book_title}</p>
            <p><strong>Author:</strong> {review.author}</p>
            <p><strong>Genre:</strong> {review.genre}</p>
            <p><strong>Review:</strong> {review.review}</p>
            <p><strong>Rating:</strong> {review.rating}/5</p>
            <p></p>

            <div className="review-card-buttons">
              <button className="edit-btn" onClick={() => navigate(`/edit-review/${review.id}`)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteClick(review)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h3>Delete Review</h3>
            <p>Are you sure you want to delete the review for "{reviewToDelete?.book_title}"?</p>
            <p>This action cannot be undone.</p>
            <div className="delete-modal-buttons">
              <button className="cancel-btn" onClick={handleDeleteCancel}>Cancel</button>
              <button className="confirm-delete-btn" onClick={handleDeleteConfirm}>Delete</button>
            </div>
          </div>
        </div>
      )}

      
    </>
  );
};

export default ReviewListUnique;
