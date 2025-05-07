import { JSX } from "@emotion/react/jsx-runtime";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return isLoggedIn ? children : <Navigate to="/" replace />;
};
