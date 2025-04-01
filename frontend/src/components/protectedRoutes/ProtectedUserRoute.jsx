import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedUserRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedUserRoute;
