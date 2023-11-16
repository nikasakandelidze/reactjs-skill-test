import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  LoginData,
  LoginState,
  login,
  resetLoginState,
} from "../store/user/loginSlice";
import { AuthState } from "../model";
import { ProgressState } from "../utils/types";

export interface LoginHook {
  data: AuthState | null;
  loading: ProgressState;
  error: string | null;
  handleLogin: (loginData: LoginData) => Promise<void>;
  resetLogin: () => void;
}

export const useLogin = (): LoginHook => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector<RootState, LoginState>(
    (state) => state.login,
  );

  const handleLogin = async (loginData: LoginData) => {
    dispatch(login(loginData) as any);
  };

  const resetLogin = () => {
    dispatch(resetLoginState());
  };

  return {
    data,
    loading,
    error,
    handleLogin,
    resetLogin,
  };
};
