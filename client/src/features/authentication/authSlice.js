import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./authService";

// Get user from localStorage
const getUser = JSON.parse(localStorage.getItem("myUser"));

const initialState = {
  user: getUser || null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  allUsers: [],
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      return await authService.regUser(data);
    } catch (error) {
      const errorMsg = error.message || "Registration failed";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const userData = await authService.logUser(data);
      localStorage.setItem("myUser", JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Login failed:", error.response); // Add this for logging
      const errorMsg = error.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);


export const getUserData = createAsyncThunk(
  "auth/get-users",
  async (_, thunkAPI) => {
    try {
      return await authService.getUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await authService.logout();
      return true; // Return success to reducer
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("myUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allUsers = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("myUser");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;