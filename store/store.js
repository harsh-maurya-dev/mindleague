// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from "../slices/dashboard/dashboardSlice.js"

export const store = configureStore({
  reducer: {
    // add slices here
    dashboardSlice : dashboardReducer
  },
});
