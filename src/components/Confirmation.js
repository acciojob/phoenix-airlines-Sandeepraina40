// This is the Confirmation component - shows booking confirmation details
// Users can see their booking information and return to home page

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
  // Redux hooks to access store and dispatch actions
  const dispatch = useDispatch();
  const { selectedFlight } = useSelector(state => state.flights);
  const { userDetails, bookingDetails, isBookingConfirmed } = useSelector(state => state.booking);
  
  // React Router hook for navigation
  const history = useHistory();

  // Function to handle returning to home page
  const handleReturnHome = () => {
    // Reset booking state for new booking
    dispatch({
      type: 'RESET_BOOKING'
    });

    // Navigate to home page
    history.push('/');
  };

  // If booking is not confirmed, redirect to search page
  if (!isBookingConfirmed || !selectedFlight) {
    history.push('/flight-search');
    return null;
  }

  return (
    <div className="confirmation">
      <div className="container">
        {/* Success Header */}
        <header className="confirmation-header">
          <div className="success-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p>Your flight has been successfully booked</p>
        </header>

        {/* Booking Details */}
        <div className="booking-details">
          <div className="details-section">
            <h2>Booking Information</h2>
            <div className="detail-item">
              <span className="label">Booking Reference:</span>
              <span className="value">{bookingDetails.bookingId}</span>
            </div>
            <div className="detail-item">
              <span className="label">Booking Date:</span>
              <span className="value">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <span className="label">Total Amount:</span>
              <span className="value">${bookingDetails.totalPrice}</span>
            </div>
          </div>

          <div className="details-section">
            <h2>Flight Details</h2>
            <div className="detail-item">
              <span className="label">Airline:</span>
              <span className="value">{selectedFlight.airline}</span>
            </div>
            <div className="detail-item">
              <span className="label">Flight Number:</span>
              <span className="value">{selectedFlight.flightNumber}</span>
            </div>
            <div className="detail-item">
              <span className="label">Route:</span>
              <span className="value">{selectedFlight.source} → {selectedFlight.destination}</span>
            </div>
            <div className="detail-item">
              <span className="label">Departure Time:</span>
              <span className="value">{selectedFlight.departureTime}</span>
            </div>
            <div className="detail-item">
              <span className="label">Arrival Time:</span>
              <span className="value">{selectedFlight.arrivalTime}</span>
            </div>
            <div className="detail-item">
              <span className="label">Duration:</span>
              <span className="value">{selectedFlight.duration}</span>
            </div>
          </div>

          <div className="details-section">
            <h2>Passenger Details</h2>
            <div className="detail-item">
              <span className="label">Name:</span>
              <span className="value">{userDetails.name}</span>
            </div>
            <div className="detail-item">
              <span className="label">Email:</span>
              <span className="value">{userDetails.email}</span>
            </div>
            <div className="detail-item">
              <span className="label">Phone:</span>
              <span className="value">{userDetails.phone}</span>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="important-info">
          <h3>Important Information</h3>
          <ul>
            <li>Please arrive at the airport at least 2 hours before departure</li>
            <li>Bring a valid photo ID for check-in</li>
            <li>Check-in opens 24 hours before departure</li>
            <li>Baggage allowance: 1 carry-on bag (7kg) + 1 personal item</li>
            <li>For any changes or cancellations, contact our customer service</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className="return-home-btn"
            onClick={handleReturnHome}
          >
            Return to Home
          </button>
          <button 
            className="print-btn"
            onClick={() => window.print()}
          >
            Print Confirmation
          </button>
        </div>

        {/* Contact Information */}
        <div className="contact-info">
          <h3>Need Help?</h3>
          <p>Contact Phoenix Airlines Customer Service:</p>
          <p>Phone: +1-800-PHOENIX (746-3649)</p>
          <p>Email: support@phoenixairlines.com</p>
          <p>Available 24/7 for your convenience</p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
