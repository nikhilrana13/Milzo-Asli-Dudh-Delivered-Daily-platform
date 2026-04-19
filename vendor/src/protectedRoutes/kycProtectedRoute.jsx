import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const KycProtectedRoute = () => {
  const user = useSelector((state) => state.Auth.user);
  // user not loaded
  if (!user) return null;
  const isApproved = user?.kycStatus?.toLowerCase() === "approved";
  return isApproved ? <Outlet /> : <Navigate to="/vendor/kyc" replace />;
};

export default KycProtectedRoute;