import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import messageService from './messageService';

const initialState = {
    user: null,
    allUsers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Get user data
export const getUserData = createAsyncThunk('auth/getUserData', async (id, thunkAPI) => {
    try {
        return await authService.getUserData(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const authSlice = createSlice({
    name: 'msgs',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = messageSlice.actions;
export default messageSlice.reducer;
