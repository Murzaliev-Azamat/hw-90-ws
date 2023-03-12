import { createSlice } from '@reduxjs/toolkit';
import { Album } from '../../../types';
import { RootState } from '../../app/store';
import { addAlbum, fetchAlbums } from './albumsThunks';

interface AlbumsState {
  albums: Album[] | [];
  fetchAllAlbumsLoading: boolean;
  addAlbumLoading: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  fetchAllAlbumsLoading: false,
  addAlbumLoading: false,
};

export const AlbumsSlice = createSlice({
  name: 'albums',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.fetchAllAlbumsLoading = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.fetchAllAlbumsLoading = false;
      state.albums = action.payload;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.fetchAllAlbumsLoading = false;
    });
    builder.addCase(addAlbum.pending, (state) => {
      state.addAlbumLoading = true;
    });
    builder.addCase(addAlbum.fulfilled, (state) => {
      state.addAlbumLoading = false;
    });
    builder.addCase(addAlbum.rejected, (state) => {
      state.addAlbumLoading = false;
    });
  },
});

export const albumsReducer = AlbumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;

export const selectFetchAllAlbumsLoading = (state: RootState) => state.albums.fetchAllAlbumsLoading;
export const selectAddAlbumLoading = (state: RootState) => state.albums.addAlbumLoading;
