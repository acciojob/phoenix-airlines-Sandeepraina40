// This is the Flight Search component - where users search for flights
// Users can select trip type, enter cities, and choose dates

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './FlightSearch.css';

const FlightSearch = () => {
  const [formData, setFormData] = useState({
    tripType: 'one-way',
    source: '',
    destination: '',
    departureDate: '',
    returnDate: ''
  });

  const dispatch = useDispatch();
  const { searchResults, isLoading, error } = useSelector(state => state.flights);
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.source.trim()) errors.source = 'Please enter departure city';
    if (!formData.destination.trim()) errors.destination = 'Please enter destination city';
    if (!formData.departureDate) errors.departureDate = 'Please select departure date';
    if (formData.tripType === 'round-trip' && !formData.returnDate)
      errors.returnDate = 'Please select return date';
    if (formData.source.toLowerCase() === formData.destination.toLowerCase())
      errors.destination = 'Source and destination must be different';
    return errors;
  };

  // ✅ Step 3 inserted here
  const handleSearch = () => {
    const mockFlights = [
      { id: 1, airline: "IndiGo", source: "Bengaluru", destination: "Mumbai", departureTime: "08:00 AM", arrivalTime: "10:30 AM", duration: "2h 30m", price: 4200 },
      { id: 2, airline: "Air India", source: "Mumbai", destination: "Bengaluru", departureTime: "11:00 AM", arrivalTime: "01:30 PM", duration: "2h 30m", price: 4600 },
      { id: 3, airline: "SpiceJet", source: "Delhi", destination: "Goa", departureTime: "09:00 AM", arrivalTime: "12:00 PM", duration: "3h", price: 3800 },
    ];

    const filtered = mockFlights.filter(
      f =>
        f.source.toLowerCase() === formData.source.toLowerCase() &&
        f.destination.toLowerCase() === formData.destination.toLowerCase()
    );

    dispatch({
      type: 'SEARCH_FLIGHTS_SUCCESS',
      payload: filtered.length > 0 ? filtered : []
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      alert('Please fix the following errors:\n' + Object.values(errors).join('\n'));
      return;
    }

    dispatch({ type: 'SEARCH_FLIGHTS', payload: formData });
    handleSearch(); // ✅ instant search
  };

  const handleBookFlight = (flight) => {
    dispatch({ type: 'SELECT_FLIGHT', payload: flight });
    history.push('/flight-booking');
  };

  return (
    <div className="flight-search">
      <div className="container">
        <header className="search-header">
          <h1>Search Flights</h1>
          <button className="back-btn" onClick={() => history.push('/')}>← Back to Home</button>
        </header>

        <form className="search-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Trip Type:</label>
            <div className="trip-type-options">
              <label>
                <input type="radio" name="tripType" value="one-way"
                  checked={formData.tripType === 'one-way'}
                  onChange={handleInputChange}
                /> One-way
              </label>
              <label style={{ marginLeft: '1rem' }}>
                <input type="radio" name="tripType" value="round-trip"
                  checked={formData.tripType === 'round-trip'}
                  onChange={handleInputChange}
                /> Round-trip
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="source">From:</label>
              <input type="text" id="source" name="source"
                value={formData.source} onChange={handleInputChange}
                placeholder="Enter departure city" required />
            </div>
            <div className="form-group">
              <label htmlFor="destination">To:</label>
              <input type="text" id="destination" name="destination"
                value={formData.destination} onChange={handleInputChange}
                placeholder="Enter destination city" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="departureDate">Departure Date:</label>
              <input type="date" id="departureDate" name="departureDate"
                value={formData.departureDate} onChange={handleInputChange} required />
            </div>
            {formData.tripType === 'round-trip' && (
              <div className="form-group">
                <label htmlFor="returnDate">Return Date:</label>
                <input type="date" id="returnDate" name="returnDate"
                  value={formData.returnDate} onChange={handleInputChange}
                  min={formData.departureDate} />
              </div>
            )}
          </div>

          <button type="submit" className="search-btn" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search Flights'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="search-results">
          <h2>Available Flights</h2>
          <ul className="flights-list">
            {searchResults.length > 0 ? (
              searchResults.map(flight => (
                <li key={flight.id} className="flight-card">
                  <div className="flight-info">
                    <h3>{flight.airline}</h3>
                    <p>{flight.source} → {flight.destination}</p>
                    <p>Departure: {flight.departureTime} | Arrival: {flight.arrivalTime}</p>
                    <p>Duration: {flight.duration}</p>
                  </div>
                  <div className="flight-price">
                    <span className="price">${flight.price}</span>
                    <button className="book-flight" onClick={() => handleBookFlight(flight)}>Book Flight</button>
                  </div>
                </li>
              ))
            ) : (
              <li>No flights available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
