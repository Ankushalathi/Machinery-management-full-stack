import { configureStore } from "@reduxjs/toolkit";
import MachineSlice from "./slices/MachineSlice";
import { apiSlice } from "../services/ApiSlice";  // ✅ Ensure Correct Import

export const store = configureStore({
  reducer: {
    machine: MachineSlice,
    [apiSlice.reducerPath]: apiSlice.reducer, // ✅ API Reducer ko add karo
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),  // ✅ API Middleware ko add karo
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
