import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdminRoute = ({ children }) => {
  const { admin } = useSelector((state) => state.admin);

  if (admin === null) {
    return <Navigate to="/admin/login" />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
