import { useContext } from "react";
import { AuthContext } from "./authcontext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
