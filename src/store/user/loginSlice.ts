import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, Client } from "../../model";
import { ProgressState } from "../../utils/types";
import { API_URL } from "../../utils/constants";
import axios from "axios";

export interface LoginState {
  data: AuthState | null;
  loading: ProgressState;
  error: string | null;
}

const initialState: LoginState = {
  data: null,
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
      const response = await axios.post(`${API_URL}/api/login`, { login });
      const data: AuthState = response.data;
      console.log(data.token);
      return data;
    } catch (err) {
      console.log(err);
      //   rejectWithValue()
    }
  },
);

export const loginSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
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
          action.error.message || "Failed to login user, try again later";
      });
  },
});

export default loginSlice.reducer;
