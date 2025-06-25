import axios from 'axios'; // Assuming you have an axios instance configured
import { getToken } from './UserService';

export const submitReview = (formData) => {
  const token = getToken();
  return axios.post('http://localhost:5000/api/reviews/', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });
};

export const getAllReviews = () => {
  return axios.get('http://localhost:5000/api/reviews/');
};

export const getReviewById = async (id) => {
  const res = await axios.get('http://localhost:5000/api/reviews/');
  const reviews = res.data;
  return {
    data: reviews.find((r) => r.id.toString() === id.toString()),
  };
};

export const updateReview = (id, data) => {
  const token = getToken();
  return axios.put(`http://localhost:5000/api/reviews/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const deleteReview = (id) => {
  const token = getToken();
  return axios.delete(`http://localhost:5000/api/reviews/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};
