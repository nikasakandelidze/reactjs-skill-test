import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, Client } from "../../model";
import { HttpResponseError, ProgressState } from "../../utils/types";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../utils/constants";
import { getSingleErrorMessage } from "../../utils";

export interface UserState {
  data: Client | null;
  loading: ProgressState;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: "IDLE",
  error: null,
};

export const getUserInfo = createAsyncThunk(
  "user/me",
  async (auth: AuthState, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      const data: Client = response.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      const error = err as AxiosError<HttpResponseError>;
      const message = getSingleErrorMessage(
        error.response?.data,
        "Failed to get user's profile information",
      );
      return rejectWithValue({ message });
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state: UserState) => {
      state.loading = "IDLE";
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getUserInfo.pending, (state: UserState) => {
        state.loading = "IN_PROGRESS";
      })
      .addCase(
        getUserInfo.fulfilled,
        (state: UserState, action: PayloadAction<Client>) => {
          state.loading = "SUCCESS";
          state.data = action.payload;
        },
      )
      .addCase(getUserInfo.rejected, (state: UserState, action: any) => {
        state.loading = "FAILED";
        state.error = action.error.message || "Failed to fetch user data";
      });
  },
});

export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
