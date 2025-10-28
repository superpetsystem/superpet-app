import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthResponse, User } from "@/types/auth";
import { authService } from "@/services/authService";

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  currentCompanyId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      state.isAuthenticated = true;
      state.error = null;
      
      // Salvar no localStorage
      localStorage.setItem("token", action.payload.access_token);
    },
    
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", action.payload);
    },
    
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      state.currentCompanyId = null;
      
      // Limpar localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    setCurrentCompany: (state, action: PayloadAction<string>) => {
      state.currentCompanyId = action.payload;
    },
  },
  
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("token", action.payload.access_token);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Erro ao fazer login";
      })
      // Register
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("token", action.payload.access_token);
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Erro ao registrar";
      })
      // Get Profile
      .addCase(getProfileAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfileAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getProfileAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Erro ao carregar perfil";
      });
  },
});

// Async thunks
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao fazer login";
      return rejectWithValue(message);
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (data: { email: string; name: string; password: string }, { rejectWithValue }) => {
    try {
      return await authService.register(data);
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao registrar";
      return rejectWithValue(message);
    }
  }
);

export const getProfileAsync = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getProfile();
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao carregar perfil";
      return rejectWithValue(message);
    }
  }
);

export const { setCredentials, setRefreshToken, setUser, logout, clearError, setCurrentCompany } = authSlice.actions;

export default authSlice.reducer;

