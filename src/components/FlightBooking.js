// This is the Flight Booking component - where users enter their details to book a flight
// Users fill in their personal information and confirm their booking

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './FlightBooking.css';

const FlightBooking = () => {
  // useState for managing form data
  const [userDetails, setUserDetails] = useState({
    name: '',        // User's full name
    email: '',       // User's email address
    phone: ''        // User's phone number
  });

  // Redux hooks to access store and dispatch actions
  const dispatch = useDispatch();
  const { selectedFlight } = useSelector(state => state.flights);
  const { isLoading } = useSelector(state => state.booking);
  
  // React Router hook for navigation
  const history = useHistory();

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update user details with new value
    setUserDetails(prev => ({
      ...prev,              // Keep existing user details
      [name]: value         // Update the specific field that changed
    }));
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate phone number format
  const isValidPhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  // Function to validate the entire form
  const validateForm = () => {
    const errors = {};

    // Check if name is entered
    if (!userDetails.name.trim()) {
      errors.name = 'Name is required';
    } else if (userDetails.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Check if email is entered and valid
    if (!userDetails.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(userDetails.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Check if phone is entered and valid
    if (!userDetails.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!isValidPhone(userDetails.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    return errors;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Validate the form
    const errors = validateForm();
    
    // If there are validation errors, show them
    if (Object.keys(errors).length > 0) {
      dispatch({
        type: 'SET_VALIDATION_ERRORS',
        payload: errors
      });
      return;
    }

    // Update user details in Redux store
    dispatch({
      type: 'UPDATE_USER_DETAILS',
      payload: userDetails
    });

    // Confirm the booking
    dispatch({
      type: 'CONFIRM_BOOKING',
      payload: {
        flightId: selectedFlight.id,
        totalPrice: selectedFlight.price,
        passengers: 1
      }
    });

    // Simulate booking confirmation (in real app, this would be an API call)
    setTimeout(() => {
      // Generate a random booking ID
      const bookingId = 'PA' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // Dispatch booking confirmed action
      dispatch({
        type: 'BOOKING_CONFIRMED',
        payload: { bookingId }
      });

      // Navigate to confirmation page
      history.push('/confirmation');
    }, 1500);
  };

  // If no flight is selected, redirect to search page
  if (!selectedFlight) {
    history.push('/flight-search');
    return null;
  }

  return (
    <div className="flight-booking">
      <div className="container">
        {/* Header */}
        <header className="booking-header">
          <h1>Complete Your Booking</h1>
          <button 
            className="back-btn"
            onClick={() => history.push('/flight-search')}
          >
            ← Back to Search
          </button>
        </header>

        <div className="booking-content">
          {/* Flight Summary */}
          <div className="flight-summary">
            <h2>Flight Details</h2>
            <div className="flight-info">
              <h3>{selectedFlight.airline} - {selectedFlight.flightNumber}</h3>
              <p><strong>Route:</strong> {selectedFlight.source} → {selectedFlight.destination}</p>
              <p><strong>Departure:</strong> {selectedFlight.departureTime}</p>
              <p><strong>Arrival:</strong> {selectedFlight.arrivalTime}</p>
              <p><strong>Duration:</strong> {selectedFlight.duration}</p>
              <p><strong>Price:</strong> ${selectedFlight.price}</p>
            </div>
          </div>

          {/* Booking Form */}
          <form className="booking-form" onSubmit={handleSubmit}>
            <h2>Passenger Details</h2>
            
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Phone Field */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="confirm-booking-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FlightBooking;
