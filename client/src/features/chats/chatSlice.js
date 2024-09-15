import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chatService } from './chatService';

const initialState = {
  chats: [], // Array to store chat messages
  chatLoading: false,
  chatSuccess: false,
  chatError: false,
  chatMessage: ''
};

// Async thunk to add chat data
export const addChatData = createAsyncThunk('chats/add-chat', async (data, thunkAPI) => {
  try {
    return await chatService.addChat(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async thunk to add chat messages
export const addChatMessage = createAsyncThunk('chats/add-message', async (data, thunkAPI) => {
  try {
    return await chatService.addMessage(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    reset: (state) => {
      state.chatError = false;
      state.chatSuccess = false;
      state.chatLoading = false;
      state.chatMessage = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addChatData.pending, (state) => {
        state.chatLoading = true;
      })
      .addCase(addChatData.rejected, (state, action) => {
        state.chatLoading = false;
        state.chatError = true;
        state.chatMessage = action.payload;
      })
      .addCase(addChatData.fulfilled, (state, action) => {
        state.chatLoading = false;
        state.chatSuccess = true;
        state.chats = action.payload; // This assumes `action.payload` is the initial chat data
      })
      .addCase(addChatMessage.pending, (state) => {
        state.chatLoading = true;
      })
      .addCase(addChatMessage.rejected, (state, action) => {
        state.chatLoading = false;
        state.chatError = true;
        state.chatMessage = action.payload;
      })
      .addCase(addChatMessage.fulfilled, (state, action) => {
        state.chatLoading = false;
        state.chatSuccess = true;
        state.chats.push(action.payload); // Add the new message to the existing chats array
      });
  }
});

export const { reset } = chatSlice.actions;
export default chatSlice.reducer;
