import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Import the default export from cartSlice

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Use cartReducer here
  },
});
