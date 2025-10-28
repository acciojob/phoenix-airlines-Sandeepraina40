// This is the Landing Page component - the first page users see
// It's like the homepage of our flight booking website

import React from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  // useHistory is a React Router hook that lets us navigate between pages
  const history = useHistory();

  // Function to handle when user clicks "Search Flights" button
  const handleSearchFlights = () => {
    // Navigate to the flight search page
    history.push('/flight-search');
  };

  return (
    <div className="landing-page">
      {/* Header section with airline branding */}
      <header className="header">
        <div className="container">
          <h1 className="logo">Phoenix Airlines</h1>
          <p className="tagline">Fly High, Fly Safe</p>
        </div>
      </header>

      {/* Main content area */}
      <main className="main-content">
        <div className="container">
          {/* Hero section with main call-to-action */}
          <section className="hero">
            <h2 className="hero-title">Find Your Perfect Flight</h2>
            <p className="hero-description">
              Book flights to destinations worldwide with Phoenix Airlines. 
              Experience comfort, safety, and reliability on every journey.
            </p>
            
            {/* Main search button */}
            <button 
              className="search-flights-btn"
              onClick={handleSearchFlights}
            >
              Search Flights
            </button>
          </section>

          {/* Features section highlighting airline benefits */}
          <section className="features">
            <div className="feature-card">
              <h3>Best Prices</h3>
              <p>Competitive rates for all destinations</p>
            </div>
            <div className="feature-card">
              <h3>Safe Travel</h3>
              <p>Your safety is our top priority</p>
            </div>
            <div className="feature-card">
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer service</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Phoenix Airlines. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
