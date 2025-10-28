// This file creates our Redux store - think of it as a global state container
// The store holds all the data for our entire application

import { createStore, combineReducers } from 'redux';
import flightReducer from './reducers/flightReducer';
import bookingReducer from './reducers/bookingReducer';

// Combine all our reducers into one main reducer
// Each reducer handles a specific part of our application state
const rootReducer = combineReducers({
  flights: flightReducer,    // Handles flight search and flight data
  booking: bookingReducer    // Handles booking information and user details
});

// Create the store with our combined reducer
// This store will be used throughout our app to manage state
const store = createStore(rootReducer);

export default store;
