import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData, IUserInitialState } from "./auth-slice-types";
import { Status } from "@/lib/types/status";

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
  },
});

export const { setUser, setError, setStatus } = authSlice.actions;
export default authSlice;
