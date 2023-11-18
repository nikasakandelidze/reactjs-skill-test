import { AxiosError, HttpStatusCode } from "axios";
import { HttpResponseError } from "./types";
import { resetLoginState } from "../store/user/loginSlice";
import { resetUserState } from "../store/user/userSlice";

export const getSingleErrorMessage = (
  errorResponse: HttpResponseError | undefined | null,
  placeholder?: string,
) => {
  if (errorResponse?.message) {
    return errorResponse.message;
  }
  if (errorResponse?.messages) errorResponse.messages?.join(",");
  return placeholder;
};

export const handleUnauthorizedError = (
  err: AxiosError,
  dispatch: (reducer: any) => void,
) => {
  if (err.response?.status === HttpStatusCode.Unauthorized) {
    dispatch(resetLoginState());
    dispatch(resetUserState());
  }
};
