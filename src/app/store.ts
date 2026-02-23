import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./features/contactSlice";
import authReducer from "./features/authSlice"

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
