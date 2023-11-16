import { HttpResponseError } from "./types";

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
