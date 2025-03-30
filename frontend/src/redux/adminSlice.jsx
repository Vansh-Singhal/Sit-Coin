import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    users: [],
    reversals: [],
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.admin = action.payload.admin;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminLogout: (state) => {
      state.admin = null;
      state.loading = false;
      state.error = null;
      state.transactions = [];
      state.users = [];
      state.reversals = [];
    },

    //FETCH REDUCERS
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReversalsSuccess: (state, action) => {
      state.reversals = action.payload;
      state.loading = false;
    },
    fetchTransactionsSuccess: (state, action) => {
      state.transactions = action.payload;
      state.loading = false;
    },
    fetchUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //UPDATE REVERSAL STATUS
    updateReversal: (state, action) => {
      state.reversals = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  adminLogout,
  fetchStart,
  fetchReversalsSuccess,
  fetchTransactionsSuccess,
  fetchUsersSuccess,
  fetchFailure,
  updateReversal,
} = adminSlice.actions;
export default adminSlice.reducer;
