import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TrackHistory } from '../../../types';
import { addTrackToHistory, fetchTracksHistory } from './tracksHistoryThunks';

interface TracksHistoryState {
  tracksHistory: TrackHistory[] | [];
  addTracksHistoryLoading: boolean;
  fetchAllTracksHistoryLoading: boolean;
}

const initialState: TracksHistoryState = {
  tracksHistory: [],
  addTracksHistoryLoading: false,
  fetchAllTracksHistoryLoading: false,
};

export const TracksHistorySlice = createSlice({
  name: 'tracksHistory',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracksHistory.pending, (state) => {
      state.fetchAllTracksHistoryLoading = true;
    });
    builder.addCase(fetchTracksHistory.fulfilled, (state, action) => {
      state.fetchAllTracksHistoryLoading = false;
      state.tracksHistory = action.payload;
    });
    builder.addCase(fetchTracksHistory.rejected, (state) => {
      state.fetchAllTracksHistoryLoading = false;
    });
    builder.addCase(addTrackToHistory.pending, (state) => {
      state.addTracksHistoryLoading = true;
    });
    builder.addCase(addTrackToHistory.fulfilled, (state) => {
      state.addTracksHistoryLoading = false;
    });
    builder.addCase(addTrackToHistory.rejected, (state) => {
      state.addTracksHistoryLoading = false;
    });
  },
});

export const tracksHistoryReducer = TracksHistorySlice.reducer;
export const selectTracksHistory = (state: RootState) => state.tracksHistory.tracksHistory;

export const selectFetchAllTracksHistoryLoading = (state: RootState) =>
  state.tracksHistory.fetchAllTracksHistoryLoading;
