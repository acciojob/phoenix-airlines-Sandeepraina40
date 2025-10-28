// This reducer handles all flight-related data and actions
// Think of it as a function that takes the current state and an action, 
// then returns a new state based on what action was performed

// Initial state - this is what our flight data looks like when the app starts
const initialState = {
  searchResults: [],           // Array to store flight search results
  searchParams: {             // Object to store search parameters
    tripType: 'one-way',      // 'one-way' or 'round-trip'
    source: '',               // Departure city
    destination: '',           // Arrival city
    departureDate: '',        // Date of departure
    returnDate: ''            // Date of return (only for round-trip)
  },
  isLoading: false,           // Boolean to show loading spinner
  error: null                 // String to store any error messages
};

// The reducer function - this is the heart of Redux
// It receives the current state and an action, then returns new state
const flightReducer = (state = initialState, action) => {
  switch (action.type) {
    // When user searches for flights
    case 'SEARCH_FLIGHTS':
      return {
        ...state,                           // Keep existing state
        searchParams: action.payload,       // Update search parameters
        isLoading: true,                    // Show loading spinner
        error: null                         // Clear any previous errors
      };

    // When flight search is successful
    case 'SEARCH_FLIGHTS_SUCCESS':
      return {
        ...state,                           // Keep existing state
        searchResults: action.payload,      // Store the flight results
        isLoading: false,                   // Hide loading spinner
        error: null                         // Clear any errors
      };

    // When flight search fails
    case 'SEARCH_FLIGHTS_ERROR':
      return {
        ...state,                           // Keep existing state
        isLoading: false,                   // Hide loading spinner
        error: action.payload               // Store the error message
      };

    // When user selects a flight to book
    case 'SELECT_FLIGHT':
      return {
        ...state,                           // Keep existing state
        selectedFlight: action.payload      // Store the selected flight
      };

    // Default case - return current state if action is not recognized
    default:
      return state;
  }
};

export default flightReducer;
