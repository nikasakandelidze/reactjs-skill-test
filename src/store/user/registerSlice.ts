import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Client } from "../../model";
import { ProgressState } from "../../utils/types";
import axios from "axios";
import { API_URL } from "../../utils/constants";

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
}

export const register = createAsyncThunk(
  "auth/register",
  async (register: RegisterData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        register,
      });
      const data: Client = response.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      //   rejectWithValue()
    }
  },
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
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
          action.error.message || "Failed to register user, try again later";
      });
  },
});

export default registerSlice.reducer;
