import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios/axios";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "./auth-thunk-types";
import { logout } from "./auth-slice";

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async (credentials, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);

    const { token, user } = response.data;

    localStorage.setItem("token", token);

    return { token, user };
  } catch (error: any) {
    const message = error.response?.data?.message || "Login Failed";
    return thunkAPI.rejectWithValue(message);
  }
});

export const registerUser = createAsyncThunk<
  "string",
  RegisterPayload,
  { rejectValue: string }
>("/auth/registerUser", async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data.message;
  } catch (error: any) {
    const message = error.response?.data?.message || "Registration failed";
    return thunkAPI.rejectWithValue(message);
  }
});

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("token");
    dispatch(logout());
  },
);
