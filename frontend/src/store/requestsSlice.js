import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = '/api';

export const fetchConnectionRequests = createAsyncThunk(
  'requests/fetchConnectionRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/user/requests/received`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch requests');
    }
  }
);

export const sendConnectionRequest = createAsyncThunk(
  'requests/sendConnectionRequest',
  async ({ toUserId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE}/request/send/${status}/${toUserId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to send request');
    }
  }
);

export const reviewConnectionRequest = createAsyncThunk(
  'requests/reviewConnectionRequest',
  async ({ requestId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE}/request/review/${status}/${requestId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to review request');
    }
  }
);

const initialState = {
  received: [],
  isLoading: false,
  error: null,
  actionLoading: false,
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch requests
    builder
      .addCase(fetchConnectionRequests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchConnectionRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.received = action.payload;
      })
      .addCase(fetchConnectionRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Send request
    builder
      .addCase(sendConnectionRequest.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(sendConnectionRequest.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(sendConnectionRequest.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });

    // Review request
    builder
      .addCase(reviewConnectionRequest.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(reviewConnectionRequest.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.received = state.received.filter(
          (req) => req._id !== action.payload.connectionRequest._id
        );
      })
      .addCase(reviewConnectionRequest.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = requestsSlice.actions;
export default requestsSlice.reducer;