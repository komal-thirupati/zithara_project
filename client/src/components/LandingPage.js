import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to Visual Search for Jewellery</h1>
        <p>
          Discover your perfect piece through our AI-powered platform. Simply upload an image
          or describe your dream jewellery, and let our advanced technology find the perfect match for you.
        </p>
        <button onClick={() => navigate('/home')} className="enter-button">
          Begin Your Journey
        </button>
      </div>
    </div>
  );
};

export default LandingPage;