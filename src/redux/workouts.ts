import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseurl from "@/utils/getBaseurl";
interface Workout {
  _id: string;
  day: number;
  exercises: string[];
  level: string;
}
const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseurl()}/api/workouts`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

const workoutsapi = createApi({
  reducerPath: "workoutApi",
  baseQuery,
  tagTypes: ["workouts"],
  endpoints: (builder) => ({
    fetchAllWorkouts: builder.query<Workout[], void>({
      query: () => "/",
      transformResponse: (response: any) => response.workouts,
      providesTags: ["workouts"],
    }),
  }),
});
export const { useFetchAllWorkoutsQuery } = workoutsapi;
export default workoutsapi;
