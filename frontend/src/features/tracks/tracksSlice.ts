import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Track } from '../../../types';
import { addTrack, fetchTracks } from './tracksThunks';

interface TracksState {
  tracks: Track[] | [];
  fetchAllTracksLoading: boolean;
  addTrackLoading: boolean;
}

const initialState: TracksState = {
  tracks: [],
  fetchAllTracksLoading: false,
  addTrackLoading: false,
};

export const TracksSlice = createSlice({
  name: 'tracks',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.fetchAllTracksLoading = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, action) => {
      state.fetchAllTracksLoading = false;
      state.tracks = action.payload;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.fetchAllTracksLoading = false;
    });
    builder.addCase(addTrack.pending, (state) => {
      state.addTrackLoading = true;
    });
    builder.addCase(addTrack.fulfilled, (state) => {
      state.addTrackLoading = false;
    });
    builder.addCase(addTrack.rejected, (state) => {
      state.addTrackLoading = false;
    });
  },
});

export const tracksReducer = TracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.tracks;

export const selectFetchAllTracksLoading = (state: RootState) => state.tracks.fetchAllTracksLoading;
export const selectAddTrackLoading = (state: RootState) => state.tracks.addTrackLoading;
