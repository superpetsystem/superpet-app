import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getProfileAsync, logout } from "@/store/authSlice";
import { toast } from "sonner";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, token, isLoading, error, currentCompanyId } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Se há token mas não há usuário, buscar perfil
    if (token && !user && !isLoading) {
      dispatch(getProfileAsync());
    }
  }, [token, user, isLoading, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout realizado com sucesso");
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    token,
    currentCompanyId,
    logout: handleLogout,
  };
};

