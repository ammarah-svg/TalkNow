import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./authService";

// Existing code...

const getUser = JSON.parse(localStorage.getItem("myUser"));

const initialState = {
  user: getUser ? getUser : null,
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
      const errorMsg = error.response?.data?.message || "Registration failed";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      return await authService.logUser(data);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed";
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
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);



// Logout user thunk (optional if you want async handling)
export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await authService.logout(); // Remove user data from storage in authService
    return true; // Return success to reducer
  } catch (error) {
    return thunkAPI.rejectWithValue("Logout failed");
  }
});

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

    // Logout reducer
    logout: (state) => {
      state.user = null; // Clear user from state
      localStorage.removeItem("myUser"); // Remove user from localStorage
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
        state.user = null; // Reset user on error
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

      // Handle logout thunk
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null; // Clear user from state after logout
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Export the logout action to be used in components
export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
