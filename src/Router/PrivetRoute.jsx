import React from "react";
import useAuth from "../Hooks/useAuth";
import { useLocation } from "react-router";
import Loading from "../components/Loading";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <Navigate to="/login" state={location.pathname} replace={true}></Navigate>
    );
  }
  return children;
};

export default PrivetRoute;
