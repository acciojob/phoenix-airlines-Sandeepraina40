// This is the Flight Search component - where users search for flights
// Users can select trip type, enter cities, and choose dates

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './FlightSearch.css';

const FlightSearch = () => {
  // useState is a React hook for managing component state
  const [formData, setFormData] = useState({
    tripType: 'one-way',    // Default to one-way trip
    source: '',             // Departure city
    destination: '',        // Arrival city
    departureDate: '',     // Departure date
    returnDate: ''          // Return date (only for round-trip)
  });

  // Redux hooks to access store and dispatch actions
  const dispatch = useDispatch();
  const { searchResults, isLoading, error } = useSelector(state => state.flights);
  
  // React Router hook for navigation
  const history = useHistory();

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data with new value
    setFormData(prev => ({
      ...prev,              // Keep existing form data
      [name]: value         // Update the specific field that changed
    }));
  };

  // Function to validate the form before searching
  const validateForm = () => {
    const errors = {};

    // Check if source city is entered
    if (!formData.source.trim()) {
      errors.source = 'Please enter departure city';
    }

    // Check if destination city is entered
    if (!formData.destination.trim()) {
      errors.destination = 'Please enter destination city';
    }

    // Check if departure date is selected
    if (!formData.departureDate) {
      errors.departureDate = 'Please select departure date';
    }

    // For round-trip, check if return date is selected
    if (formData.tripType === 'round-trip' && !formData.returnDate) {
      errors.returnDate = 'Please select return date';
    }

    // Check if source and destination are different
    if (formData.source.toLowerCase() === formData.destination.toLowerCase()) {
      errors.destination = 'Source and destination must be different';
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
      alert('Please fix the following errors:\n' + Object.values(errors).join('\n'));
      return;
    }

    // Dispatch action to search for flights
    dispatch({
      type: 'SEARCH_FLIGHTS',
      payload: formData
    });

    // Simulate flight search (in real app, this would be an API call)
    setTimeout(() => {
      // Mock flight data - in real app, this would come from backend
      const mockFlights = [
        {
          id: '1',
          airline: 'Phoenix Airlines',
          flightNumber: 'PA101',
          source: formData.source,
          destination: formData.destination,
          departureTime: '08:00',
          arrivalTime: '10:30',
          price: 299,
          duration: '2h 30m'
        },
        {
          id: '2',
          airline: 'Phoenix Airlines',
          flightNumber: 'PA102',
          source: formData.source,
          destination: formData.destination,
          departureTime: '14:00',
          arrivalTime: '16:30',
          price: 349,
          duration: '2h 30m'
        },
        {
          id: '3',
          airline: 'Phoenix Airlines',
          flightNumber: 'PA103',
          source: formData.source,
          destination: formData.destination,
          departureTime: '20:00',
          arrivalTime: '22:30',
          price: 279,
          duration: '2h 30m'
        }
      ];

      // Dispatch success action with mock data
      dispatch({
        type: 'SEARCH_FLIGHTS_SUCCESS',
        payload: mockFlights
      });
    }, 1000);
  };

  // Function to handle booking a specific flight
  const handleBookFlight = (flight) => {
    // Store selected flight in Redux store
    dispatch({
      type: 'SELECT_FLIGHT',
      payload: flight
    });

    // Navigate to booking page
    history.push('/flight-booking');
  };

  return (
    <div className="flight-search">
      <div className="container">
        {/* Header */}
        <header className="search-header">
          <h1>Search Flights</h1>
          <button 
            className="back-btn"
            onClick={() => history.push('/')}
          >
            ← Back to Home
          </button>
        </header>

        {/* Search Form */}
        <form className="search-form" onSubmit={handleSubmit}>
          {/* Trip Type Selection */}
          <div className="form-group">
            <label>Trip Type:</label>
            <div className="trip-type-buttons">
              <button
                type="button"
                className={`trip-btn ${formData.tripType === 'one-way' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, tripType: 'one-way' }))}
              >
                One-way
              </button>
              <button
                type="button"
                className={`trip-btn ${formData.tripType === 'round-trip' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, tripType: 'round-trip' }))}
              >
                Round-trip
              </button>
            </div>
          </div>

          {/* Source and Destination */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="source">From:</label>
              <input
                type="text"
                id="source"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                placeholder="Enter departure city"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="destination">To:</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="Enter destination city"
                required
              />
            </div>
          </div>

          {/* Dates */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="departureDate">Departure Date:</label>
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleInputChange}
                required
              />
            </div>
            {formData.tripType === 'round-trip' && (
              <div className="form-group">
                <label htmlFor="returnDate">Return Date:</label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleInputChange}
                  min={formData.departureDate}
                />
              </div>
            )}
          </div>

          {/* Search Button */}
          <button 
            type="submit" 
            className="search-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search Flights'}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="search-results">
            <h2>Available Flights</h2>
            <div className="flights-list">
              {searchResults.map(flight => (
                <div key={flight.id} className="flight-card">
                  <div className="flight-info">
                    <h3>{flight.airline} - {flight.flightNumber}</h3>
                    <p>{flight.source} → {flight.destination}</p>
                    <p>Departure: {flight.departureTime} | Arrival: {flight.arrivalTime}</p>
                    <p>Duration: {flight.duration}</p>
                  </div>
                  <div className="flight-price">
                    <span className="price">${flight.price}</span>
                    <button 
                      className="book-flight"
                      onClick={() => handleBookFlight(flight)}
                    >
                      Book Flight
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
