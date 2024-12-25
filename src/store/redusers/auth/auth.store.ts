import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {AuthState} from "./IAuth.ts";

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem('isLoggedIn') === 'true',
  role: "guest",
  idToken: null
};

export const authStore = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ role: "user" | "admin", idToken: string }>) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.idToken = action.payload.idToken;
      localStorage.setItem('idToken', action.payload.idToken); // Зберегти токен в localStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = "guest";
      localStorage.removeItem('isLoggedIn')
    },

  },
});

export const { login, logout } = authStore.actions;
export default authStore.reducer;
