import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData, IUserInitialState } from "./auth-slice-types";
import { Status } from "@/lib/types/status";
import { loginUser } from "./auth-thunks";

const initialState: IUserInitialState = {
  user: {
    username: "",
  },
  status: Status.IDLE,
  error: null,
};

const authSlice = createSlice({
  name: "Auth Slice",
  initialState: initialState,
  reducers: {
    setUser(state: IUserInitialState, action: PayloadAction<IUserData>) {
      state.user = action.payload;
    },
    setStatus(state: IUserInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setError(state: IUserInitialState, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    logout(state: IUserInitialState) {
      state.user = { username: "" };
      state.status = Status.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.payload || "Login Failed";
      });
  },
});

export const { setUser, setError, setStatus, logout } = authSlice.actions;
export default authSlice.reducer;
