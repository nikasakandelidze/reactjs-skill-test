import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, Client } from "../../model";
import { ProgressState } from "../../utils/types";
import axios from "axios";
import { API_URL } from "../../utils/constants";

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
      //   rejectWithValue()
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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

export default userSlice.reducer;
