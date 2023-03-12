import { createSlice } from '@reduxjs/toolkit';
import { Artist } from '../../../types';
import { RootState } from '../../app/store';
import { addArtist, fetchArtists } from './artistsThunks';

interface ArtistsState {
  artists: Artist[] | [];
  fetchAllArtistsLoading: boolean;
  addArtistLoading: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  fetchAllArtistsLoading: false,
  addArtistLoading: false,
};

export const ArtistsSlice = createSlice({
  name: 'artists',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.fetchAllArtistsLoading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.fetchAllArtistsLoading = false;
      state.artists = action.payload;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.fetchAllArtistsLoading = false;
    });
    builder.addCase(addArtist.pending, (state) => {
      state.addArtistLoading = true;
    });
    builder.addCase(addArtist.fulfilled, (state) => {
      state.addArtistLoading = false;
    });
    builder.addCase(addArtist.rejected, (state) => {
      state.addArtistLoading = false;
    });
  },
});

export const artistsReducer = ArtistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.artists;

export const selectFetchAllArtistsLoading = (state: RootState) => state.artists.fetchAllArtistsLoading;
export const selectAddArtistLoading = (state: RootState) => state.artists.addArtistLoading;
