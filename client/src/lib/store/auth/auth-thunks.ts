import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserData } from "./auth-slice-types";
import axios from "axios";
import axiosInstance from "@/lib/axios/axios";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: IUserData;
  token: string;
}

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
