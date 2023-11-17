import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  RegisterData,
  RegisterState,
  register,
  resetRegisterState,
} from "../store/user/registerSlice";
import { Client } from "../model";
import { ProgressState } from "../utils/types";

export interface RegisterHook {
  data: Client | null;
  loading: ProgressState;
  error: string | null;
  handleRegister: (registerData: RegisterData | FormData) => Promise<void>;
  resetRegister: () => void;
}

export const useRegister = (): RegisterHook => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector<RootState, RegisterState>(
    (state) => state.register,
  );

  const handleRegister = async (registerData: RegisterData | FormData) => {
    dispatch(register(registerData) as any);
  };

  const resetRegister = () => {
    dispatch(resetRegisterState());
  };

  return {
    data,
    loading,
    error,
    handleRegister,
    resetRegister,
  };
};
