// features/auth/useLogout.js
import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      setUser(null);               // clear auth state
      navigate("/users/login");    // redirect
    },

    onError: () => {
      // Even if backend fails, force logout locally
      setUser(null);
      navigate("/users/login");
    },
  });
};
