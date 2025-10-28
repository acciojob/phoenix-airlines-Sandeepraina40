// This reducer handles all booking-related data and actions
// It manages user information, booking details, and confirmation status

// Initial state - this is what our booking data looks like when the app starts
const initialState = {
  userDetails: {              // Object to store user information
    name: '',                 // User's full name
    email: '',                // User's email address
    phone: ''                 // User's phone number
  },
  bookingDetails: {           // Object to store booking information
    flightId: '',             // ID of the selected flight
    bookingId: '',            // Unique booking reference number
    totalPrice: 0,            // Total cost of the booking
    passengers: 1             // Number of passengers
  },
  isBookingConfirmed: false,  // Boolean to track if booking is confirmed
  validationErrors: {},       // Object to store form validation errors
  isLoading: false           // Boolean to show loading spinner
};

// The reducer function - handles all booking-related actions
const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    // When user updates their personal details
    case 'UPDATE_USER_DETAILS':
      return {
        ...state,                           // Keep existing state
        userDetails: {                      // Update user details
          ...state.userDetails,             // Keep existing user details
          ...action.payload                 // Add/update with new details
        },
        validationErrors: {}                // Clear validation errors
      };

    // When form validation fails
    case 'SET_VALIDATION_ERRORS':
      return {
        ...state,                           // Keep existing state
        validationErrors: action.payload    // Store validation error messages
      };

    // When user confirms their booking
    case 'CONFIRM_BOOKING':
      return {
        ...state,                           // Keep existing state
        bookingDetails: {                   // Update booking details
          ...state.bookingDetails,          // Keep existing booking details
          ...action.payload                 // Add/update with new details
        },
        isLoading: true,                    // Show loading spinner
        validationErrors: {}                // Clear validation errors
      };

    // When booking confirmation is successful
    case 'BOOKING_CONFIRMED':
      return {
        ...state,                           // Keep existing state
        isBookingConfirmed: true,           // Mark booking as confirmed
        bookingDetails: {                   // Update with final booking details
          ...state.bookingDetails,
          bookingId: action.payload.bookingId  // Add unique booking ID
        },
        isLoading: false                    // Hide loading spinner
      };

    // When booking confirmation fails
    case 'BOOKING_ERROR':
      return {
        ...state,                           // Keep existing state
        isLoading: false,                   // Hide loading spinner
        error: action.payload               // Store error message
      };

    // When user wants to start a new booking
    case 'RESET_BOOKING':
      return initialState;                  // Reset to initial state

    // Default case - return current state if action is not recognized
    default:
      return state;
  }
};

export default bookingReducer;
