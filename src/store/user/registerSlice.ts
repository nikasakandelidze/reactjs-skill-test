import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Client } from "../../model";
import { HttpResponseError, ProgressState } from "../../utils/types";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../utils/constants";
import { getSingleErrorMessage } from "../../utils";

export interface RegisterState {
  data: Client | null;
  loading: ProgressState;
  error: string | null;
}

const initialState: RegisterState = {
  data: null,
  loading: "IDLE",
  error: null,
};

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  photos?: any[];
}

export const register = createAsyncThunk(
  "auth/register",
  async (register: RegisterData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        ...register,
      });
      const data: Client = response.data;
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

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegisterState: (state: RegisterState) => {
      state.loading = "IDLE";
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(register.pending, (state: RegisterState) => {
        state.loading = "IN_PROGRESS";
      })
      .addCase(
        register.fulfilled,
        (state: RegisterState, action: PayloadAction<Client>) => {
          state.loading = "SUCCESS";
          state.data = action.payload;
        },
      )
      .addCase(register.rejected, (state: RegisterState, action: any) => {
        state.loading = "FAILED";
        state.error =
          action.payload.message || "Failed to register user, try again later";
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;

export default registerSlice.reducer;
