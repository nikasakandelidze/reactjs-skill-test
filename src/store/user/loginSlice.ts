import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../model";
import { HttpResponseError, ProgressState } from "../../utils/types";
import { API_URL, USER_TOKEN } from "../../utils/constants";
import axios, { AxiosError } from "axios";
import { getSingleErrorMessage } from "../../utils";

export interface LoginState {
  data: AuthState | null;
  loading: ProgressState;
  error: string | null;
}

const INIT_TOKEN = localStorage.getItem(USER_TOKEN)
  ? localStorage.getItem(USER_TOKEN)
  : null;

const initialState: LoginState = {
  data: INIT_TOKEN ? { token: INIT_TOKEN } : null,
  loading: "IDLE",
  error: null,
};

export interface LoginData {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async (login: LoginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, { ...login });
      const data: AuthState = response.data;
      localStorage.setItem(USER_TOKEN, data.token);
      return data;
    } catch (err: any) {
      console.log(err);
      const error = err as AxiosError<HttpResponseError>;
      const message = getSingleErrorMessage(
        error.response?.data,
        "Failed to login user, try again later",
      );
      return rejectWithValue({ message });
    }
  },
);

export const loginSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetLoginState: (state: LoginState) => {
      state.loading = "IDLE";
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(login.pending, (state: LoginState) => {
        state.loading = "IN_PROGRESS";
      })
      .addCase(
        login.fulfilled,
        (state: LoginState, action: PayloadAction<AuthState>) => {
          state.loading = "SUCCESS";
          state.data = action.payload;
        },
      )
      .addCase(login.rejected, (state: LoginState, action: any) => {
        state.loading = "FAILED";
        state.error =
          action.payload.message || "Failed to login user, try again later";
      });
  },
});

export const { resetLoginState } = loginSlice.actions;

export default loginSlice.reducer;
