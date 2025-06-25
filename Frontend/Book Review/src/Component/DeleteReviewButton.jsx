import React from 'react';
import { deleteReview } from '../Services/bookService';
import { toast } from 'react-toastify';
import { Button } from './ui/Button';

const DeleteReviewButton = ({ reviewId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const res = await deleteReview(reviewId);
      // Check if the API response is successful
      if (res.status === 200) {
        toast.success('Review deleted successfully!');
        onDelete(); // Refresh the list or handle state change
      } else {
        // If the API returns an error status
        toast.error('Failed to delete the review!');
      }
    } catch (error) {
      // Improved error handling to log and display the error
      console.error('Error during deletion:', error);
      toast.error(error?.response?.data?.message || 'An error occurred while deleting the review');
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete} size="sm">
      Delete
    </Button>
  );
};

export default DeleteReviewButton;
