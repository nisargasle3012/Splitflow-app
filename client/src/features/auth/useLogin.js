// features/auth/useLogin.js
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: (res) => {
      setUser(res.data.user);
      navigate("/");
    },

    onError: (err) => {
      throw err.response?.data?.message || "Login failed";
    },
  });
};
