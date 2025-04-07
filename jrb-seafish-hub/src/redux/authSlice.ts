import { createSlice } from "@reduxjs/toolkit";

const getStoredAdmin = () => {
  const adminData = localStorage.getItem("admin");
  try {
    return adminData ? JSON.parse(adminData) : null;
  } catch (error) {
    console.error("Error parsing admin data:", error);
    return null;
  }
};

const initialState = {
  admin: getStoredAdmin(),
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;

      // Persist in localStorage
      localStorage.setItem("admin", JSON.stringify(action.payload.admin));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem("admin");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
