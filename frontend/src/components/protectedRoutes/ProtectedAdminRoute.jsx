import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectedAdminRoute = ({ children }) => {
  const { admin } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin === null) {
      navigate("/admin/login");
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedAdminRoute;
