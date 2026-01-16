import { logout } from "../store/auth/auth-slice";
import { AppDispatch } from "../store/store";

export function performLogout(dispatch: AppDispatch) {
  localStorage.removeItem("token");
  dispatch(logout());
}
