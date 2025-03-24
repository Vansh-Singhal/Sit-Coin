import { createSlice } from "@reduxjs/toolkit";

// Transaction Slice to manage user and admin transactions
const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTransactionsStart: (state) => {
      state.transactions = [];
      state.loading = true;
      state.error = null;
    },
    fetchTransactionsSuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload; // Save fetched transactions
    },
    fetchTransactionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Error from the API or process
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload); // Add a new transaction
    },
    clearTransactions: (state) => {
      state.transactions = []; // Clear transactions (useful for logout)
    },
  },
});

// Action creators
export const { fetchTransactionsStart, fetchTransactionsSuccess, fetchTransactionsFailure, addTransaction, clearTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
