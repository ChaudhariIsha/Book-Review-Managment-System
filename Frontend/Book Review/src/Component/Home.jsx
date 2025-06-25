// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../assets/Home.css';
import Footer from './Footer';
import SubmitReviewForm from './SubmitReview';

const Home = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Sample data - replace with actual data from your backend
  const featuredReviews = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2t8ZW58MHx8MHx8fDA%3D",
      excerpt: "A classic tale of the American Dream..."
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      rating: 5,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJvb2t8ZW58MHx8MHx8fDA%3D",
      excerpt: "A powerful story about justice and morality..."
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJvb2t8ZW58MHx8MHx8fDA%3D",
      excerpt: "A dystopian masterpiece that remains relevant..."
    }
  ];

  const categories = [
    "Fiction", "Non-Fiction", "Mystery", "Science Fiction",
    "Biography", "History", "Poetry", "Self-Help"
  ];

  const carouselItems = [
    {
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Discover Your Next Great Read",
      description: "Join our community of book lovers and share your thoughts on the books that matter to you."
    },
    {
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Share Your Literary Journey",
      description: "Connect with fellow readers and discover new perspectives on your favorite books."
    },
    {
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Explore Diverse Genres",
      description: "From classic literature to contemporary bestsellers, find your next favorite book."
    }
  ];

  const handleWriteReviewClick = (e) => {
    e.preventDefault();
    setShowReviewForm(true);
  };

  const handleCloseForm = () => {
    setShowReviewForm(false);
  };

  return (
    <div className="home-container">
      {/* Hero Section with Carousel */}
      <section className="hero-section">
        <Carousel fade className="hero-carousel">
          {carouselItems.map((item, index) => (
            <Carousel.Item key={index}>
              <div 
                className="carousel-slide"
                style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.image})` }}
              >
                <div className="carousel-content">
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  <button onClick={handleWriteReviewClick} className="cta-button">Write a Review</button>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="review-form-modal">
          <div className="review-form-container">
            <button className="close-button" onClick={handleCloseForm}>×</button>
            <SubmitReviewForm onClose={handleCloseForm} />
          </div>
        </div>
      )}

      {/* Featured Reviews Section */}
      <section className="featured-reviews">
        <h2>Featured Reviews</h2>
        <div className="reviews-grid">
          {featuredReviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-image-container">
                <img src={review.image} alt={review.title} className="review-image" />
                <div className="rating-badge">★ {review.rating}</div>
              </div>
              <div className="review-content">
                <h3>{review.title}</h3>
                <p className="author">by {review.author}</p>
                <p className="excerpt">{review.excerpt}</p>
                <Link to={`/reviews/${review.id}`} className="read-more">
                  Read Full Review <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Browse by Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link key={category} to={`/category/${category.toLowerCase()}`} className="category-card">
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Share Your Thoughts?</h2>
        <p>Join our community of book enthusiasts and start reviewing today!</p>
        <button onClick={handleWriteReviewClick} className="cta-button">Get Started</button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
