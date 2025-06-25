import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Book Review</h3>
          <p>Your trusted source for honest book reviews and literary discussions.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/book">Reviews</Link></li>
            <li><Link to="/submit-review">Write a Review</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/category/fiction">Fiction</Link></li>
            <li><Link to="/category/non-fiction">Non-Fiction</Link></li>
            <li><Link to="/category/mystery">Mystery</Link></li>
            <li><Link to="/category/science-fiction">Science Fiction</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li><i className="bi bi-envelope"></i> contact@bookreview.com</li>
            <li><i className="bi bi-telephone"></i> +1 (555) 123-4567</li>
            <li><i className="bi bi-geo-alt"></i> 123 Book Street, Reading City</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Book Review. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 