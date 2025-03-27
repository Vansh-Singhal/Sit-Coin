import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authSlice from "./authSlice.jsx";
import adminSlice from "./adminSlice.jsx";
import transactionSlice from "./transactionSlice.jsx";
import reversalSlice from "./reversalSlice.jsx";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "sitcoin",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  admin: adminSlice,
  transactions : transactionSlice,
  reversals : reversalSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
