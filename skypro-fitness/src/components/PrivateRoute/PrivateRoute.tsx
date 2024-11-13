import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import { AppRoutes } from "../../lib/appRoutes";

function PrivateRoute() {
  const { user } = useUserContext();
  return user ? <Outlet /> : <Navigate to={AppRoutes.MAIN} />;
}

export default PrivateRoute;
