import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  restriction,
  redirect = "/login",
  children,
}: {
  restriction: boolean;
  redirect?: string;
  children?: any;
}) => {
  if (restriction) {
    return <Navigate to={redirect} replace />;
  }
  return children;
};
