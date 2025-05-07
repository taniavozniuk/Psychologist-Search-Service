// import { JSX } from "@emotion/react/jsx-runtime";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "./hooks/AuthContext";

// // interface PrivateRouteProps {
// //   children: JSX.Element;
// // }

// export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
//   const { isLoggedIn } = useAuth();

//   return isLoggedIn ? children : <Navigate to="/" replace />;
// };