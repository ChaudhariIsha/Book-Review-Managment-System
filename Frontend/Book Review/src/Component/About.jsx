import React from 'react';
import '../assets/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Book Review</h1>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Book Review is dedicated to creating a vibrant community of readers who share their thoughts,
            insights, and recommendations about books. We believe that every book has a story to tell,
            and every reader has a unique perspective to share.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Share Reviews</h3>
              <p>Write and share your thoughts about the books you've read</p>
            </div>
            <div className="feature-card">
              <h3>Rate Books</h3>
              <p>Rate books on a 5-star scale and help others discover great reads</p>
            </div>
            <div className="feature-card">
              <h3>Discover Books</h3>
              <p>Find new books through community recommendations</p>
            </div>
            <div className="feature-card">
              <h3>Connect</h3>
              <p>Connect with fellow book lovers and share your passion for reading</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Meet Our Team</h2>
          <div className="authors-grid">
            <div className="author-card">
              <div className="author-image">
                <img src="/Images/Isha Chaudhari.jpg" alt="Isha Chaudhari" />
              </div>
              <h3>Isha Chaudhari</h3>
              <p className="author-role">Lead Developer</p>
              <p className="author-bio">
                Passionate about creating seamless user experiences and building robust web applications.
                Loves reading science fiction and fantasy novels in her free time.
              </p>
            </div>

            <div className="author-card">
              <div className="author-image">
                <img src="/Images/Kaustubh.jpg" alt="Kaustubh Joshi" />
              </div>
              <h3>Kaustubh</h3>
              <p className="author-role">UI/UX Designer</p>
              <p className="author-bio">
                Creative designer with a keen eye for detail. Enjoys contemporary literature and
                is always looking for new design inspirations in books.
              </p>
            </div>

            <div className="author-card">
              <div className="author-image">
                <img src="/Images/Gouri.jpg" alt="Gouri Chavan" />
              </div>
              <h3>Gouri</h3>
              <p className="author-role">Content Manager</p>
              <p className="author-bio">
                Book enthusiast and content strategist. Specializes in creating engaging
                content and managing our community of book reviewers.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>How It Works</h2>
          <ol className="how-it-works">
            <li>Create an account to get started</li>
            <li>Browse through existing book reviews</li>
            <li>Write your own reviews for books you've read</li>
            <li>Rate books and share your thoughts</li>
            <li>Connect with other readers and discover new books</li>
          </ol>
        </section>

        <section className="about-section">
          <h2>Contact Us</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you! Reach out to us at:
            <br />
            <a href="mailto:contact@bookreview.com">contact@bookreview.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default About; 