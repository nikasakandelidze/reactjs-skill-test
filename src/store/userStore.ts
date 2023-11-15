import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../model";

export interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

interface LoginData {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "user/login",
  async (login: LoginData, thunkAPI) => {
    console.log(login);
    const response = await fetch(`https://api.example.com/users`);
    const data = await response.json();
    return data; // Specify the type of the returned data
  },
);

export const register = createAsyncThunk("user/register", async (type) => {
  const response = await axios.get(`/api/${type}`);
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Your reducers here
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(login.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state: any, action: PayloadAction<User>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user data";
      });
  },
});

export default userSlice.reducer;
