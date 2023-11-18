import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { AuthState, Client } from "../model";
import { ProgressState } from "../utils/types";
import {
  UserState,
  getUserInfo,
  resetUserState,
} from "../store/user/userSlice";
import { useEffect } from "react";

export interface UserInfoHook {
  data: Client | null;
  loading: ProgressState;
  error: string | null;
  resetUser: () => void;
}

export const useUserInfo = (): UserInfoHook => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector<RootState, UserState>(
    (state) => state.user,
  );

  const authState = useSelector<RootState, AuthState | null>(
    (state) => state.login.data,
  );

  const resetUser = () => {
    dispatch(resetUserState());
  };

  useEffect(() => {
    if (authState) {
      dispatch(getUserInfo(authState) as any);
    }
  }, [authState, dispatch]);

  return {
    data,
    loading,
    error,
    resetUser,
  };
};
