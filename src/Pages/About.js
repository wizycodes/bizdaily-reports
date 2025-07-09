import './About.css';
import { useState, useRef } from 'react';

function About() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const formRef = useRef(null); // ✅ For resetting the form

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mqabvlyo', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: new FormData(e.target),
      });

      await response.json();

      if (response.ok) {
        setSubmitted(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        formRef.current.reset(); // Clear the form fields
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  return (
    <div className="about-page">
      <section className="about-info">
        <h2>About Bizdaily Reports</h2>
        <p>
          Bizdaily Reports is your trusted source for real-time, reliable, and curated business news.
          Our mission is to keep professionals, investors, and enthusiasts informed with up-to-date headlines that matter.
        </p>
      </section>

      <section className="contact-form">
        <h3>Contact Us</h3>

        {submitted ? (
          <div className="submission-success">
            <p className="success-message">✅ Thank you! Your message has been sent.</p>
            <button 
              className="reset-btn" 
              onClick={handleReset}
              style={{ margin: '15px auto 0', display: 'block' }}
              >
              Send another message ?
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} ref={formRef}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
            ></textarea>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="spinner"></div>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        )}

        {showToast && (
          <div className="toast success-toast">
            ✅ Message sent successfully!
          </div>
        )}
      </section>
    </div>
  );
}

export default About;
