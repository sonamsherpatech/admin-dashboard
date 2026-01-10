import { Status } from "@/lib/types/status";

export interface IUserData {
  username: string;
}

export interface IUserInitialState {
  status: Status;
  error: string | null;
  user: IUserData;
}
