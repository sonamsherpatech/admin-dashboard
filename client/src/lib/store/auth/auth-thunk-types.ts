import { IUserData } from "./auth-slice-types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: IUserData;
  token: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
