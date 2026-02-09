import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "../App";
import Loading from "@/components/Loading";
import PrivateRoutes from "./PrivateRoute";
import Home from "../pages/Home";

// Lazy load pages (except Home for LCP optimization)
const Exercise = lazy(() => import("../pages/Exercise"));
const Progress = lazy(() => import("../pages/Progress"));
const LoginPage = lazy(() => import("@/components/login-01"));
const Register = lazy(() => import("@/components/Register"));
const Profile = lazy(() => import("@/pages/Profile"));
const AdminLogin = lazy(() => import("@/admin/Adminlogin"));
const AdminRoutes = lazy(() => import("./AdminRouter"));
const Dashboard = lazy(() => import("@/admin/Dashboard"));
const WorkoutLevels = lazy(() => import("@/admin/GetAllworkouts"));
const AddWorkout = lazy(() => import("@/admin/AddWorkout"));
const AdminDashboardHome = lazy(() => import("@/admin/AdminHome"));
const DeleteWorkout = lazy(() => import("@/admin/DeleteWorkouts"));
const UpdateWorkout = lazy(() => import("@/admin/UpdateWorkout"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "exercise",
        element: (
          <Suspense fallback={<Loading />}>
            <Exercise />
          </Suspense>
        ),
      },
      {
        path: "progress",
        element: (
          <PrivateRoutes>
            <Suspense fallback={<Loading />}>
              <Progress />
            </Suspense>
          </PrivateRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "signup",
    element: (
      <Suspense fallback={<Loading />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "admin",
    element: (
      <Suspense fallback={<Loading />}>
        <AdminLogin />
      </Suspense>
    ),
  },
  {
    path: "/admin-dashboard",
    element: (
      <Suspense fallback={<Loading />}>
        <AdminRoutes>
          <Dashboard />
        </AdminRoutes>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <AdminDashboardHome />
          </Suspense>
        ),
      },
      {
        path: "all-workouts",
        element: (
          <Suspense fallback={<Loading />}>
            <WorkoutLevels />
          </Suspense>
        ),
      },
      {
        path: "add-workouts",
        element: (
          <Suspense fallback={<Loading />}>
            <AddWorkout />
          </Suspense>
        ),
      },
      {
        path: "delete-workouts",
        element: (
          <Suspense fallback={<Loading />}>
            <DeleteWorkout />
          </Suspense>
        ),
      },
      {
        path: "update-workouts",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateWorkout />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
