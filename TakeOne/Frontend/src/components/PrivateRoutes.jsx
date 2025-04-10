// ✅ Created for Capstone Concept: "Created frontend components in React"
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;