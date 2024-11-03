import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";

function PrivateRoute() {
  const { userData } = useUserContext();
  return userData ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
