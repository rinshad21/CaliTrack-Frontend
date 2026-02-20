import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "@/utils/isTokenValid";

const AdminRoutes = ({ children }: any) => {
  if (!isTokenValid("adminToken")) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin" replace />;
  }
  return children ? children : <Outlet />;
};

export default AdminRoutes;