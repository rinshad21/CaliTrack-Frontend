import { configureStore } from "@reduxjs/toolkit";
import workoutsapi from "./workouts";
import progressApi from "./progressSlice";

export const store: any = configureStore({
  reducer: {
    [workoutsapi.reducerPath]: workoutsapi.reducer,
    [progressApi.reducerPath]: progressApi.reducer,
  },
  middleware: (GetDefaultMiddleware) =>
    GetDefaultMiddleware().concat(
      workoutsapi.middleware,
      progressApi.middleware,
    ),
});
