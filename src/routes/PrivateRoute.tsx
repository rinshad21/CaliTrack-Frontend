import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "@/utils/isTokenValid";

const PrivateRoutes = ({ children }: any) => {
  if (!isTokenValid()) {
    localStorage.removeItem("token");
    localStorage.removeItem("level");
    return <Navigate to="/login" replace />;
  }
  return children ? children : <Outlet />;
};

export default PrivateRoutes;