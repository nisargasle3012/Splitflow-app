// features/auth/useSignup.js
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerApi,

    onSuccess: (res) => {
      setUser(res.data.user);
      navigate("/");
    },

    onError: (err) => {
      throw err.response?.data?.message || "Signup failed";
    },
  });
};
