import { Navigate, createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import Exercise from "../pages/Exercise";
import Progress from "../pages/Progress";
import LoginPage from "@/components/login-01";
import Register from "@/components/Register";
import Profile from "@/pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "exercise", element: <Exercise /> },
      { path: "progress", element: <Progress /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  { path: "login", element: <LoginPage /> },
  { path: "signup", element: <Register /> },
]);
export default router;
