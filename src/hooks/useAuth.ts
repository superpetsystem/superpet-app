import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getProfileAsync, logout } from "@/store/authSlice";
import { authService } from "@/services/authService";
import { toast } from "sonner";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, token, isLoading, error, currentCompanyId } = useAppSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Verificar se há tokens no localStorage
    const storageToken = localStorage.getItem("token");
    const storageRefreshToken = localStorage.getItem("refreshToken");

    if (storageToken && !user && !isLoading && !isInitialized) {
      setIsInitialized(true);
      dispatch(getProfileAsync());
    }
  }, [token, user, isLoading, dispatch, isInitialized]);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      dispatch(logout());
      toast.success("Logout realizado com sucesso");
    }
  };

  return {
    user,
    isAuthenticated: isAuthenticated || !!localStorage.getItem("token"),
    isLoading,
    error,
    token,
    currentCompanyId,
    logout: handleLogout,
  };
};

