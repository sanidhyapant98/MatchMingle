// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "../services/authService";

export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      return await loginUser(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Login failed"
      );
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, thunkAPI) => {
    try {
      const payload = { ...formData, age: Number(formData.age) };
      return await signupUser(payload);
    } catch (err) {
      const data = err.response?.data;
      const message =
        typeof data === "string"
          ? data
          : data?.message || "Signup failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        // User created successfully, we can store user if returned, or we can wait for login.
        // Assuming signup doesn't set cookie/token automatically, but we might want it to.
        // In current backend, signup sends "User created successfully" with 201.
        // It doesn't seem to return the user object or set cookie.
        // So we might need to login after signup, or the user manually logs in.
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;