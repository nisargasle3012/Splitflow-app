// features/auth/useSession.js
import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

export const useSession = () => {
  const { setUser } = useAuth();

  return useQuery({
    queryKey: ["session"],
    queryFn: getMeApi,
    retry: false,              // IMPORTANT: don't retry 401
    onSuccess: (res) => {
      setUser(res.data);
    },
    onError: () => {
      setUser(null);
    },
  });
};
