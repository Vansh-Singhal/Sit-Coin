import { createSlice } from "@reduxjs/toolkit";

// Transaction Slice to manage user and admin transactions
const reversalSlice = createSlice({
  name: "reversals",
  initialState: {
    reversals: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchReversalsStart: (state) => {
      state.reversals = [];
      state.loading = true;
      state.error = null;
    },
    fetchReversalsSuccess: (state, action) => {
      state.loading = false;
      state.reversals = action.payload; // Save fetched transactions
    },
    fetchReversalsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Error from the API or process
    },
    addReversal: (state, action) => {
      state.reversals.push(action.payload); // Add a new transaction
    },
    clearReversals: (state) => {
      state.reversals = []; // Clear transactions (useful for logout)
    },
  },
});

// Action creators
export const {
  fetchReversalsStart,
  fetchReversalsSuccess,
  fetchReversalsFailure,
  addReversal,
  clearReversals,
} = reversalSlice.actions;

export default reversalSlice.reducer;
