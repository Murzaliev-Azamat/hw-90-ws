import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Album, AlbumApi } from '../../../types';

export const fetchAlbums = createAsyncThunk<Album[], string | undefined>('albums/fetchAll', async (id) => {
  if (id) {
    const albumsResponse = await axiosApi.get<Album[]>('/albums/?artist=' + id);
    return albumsResponse.data;
  }

  const albumsResponse = await axiosApi.get<Album[]>('/albums');
  return albumsResponse.data;
});

export const addAlbum = createAsyncThunk<void, AlbumApi>('albums/addAlbum', async (album) => {
  const formData = new FormData();

  const keys = Object.keys(album) as (keyof AlbumApi)[];
  keys.forEach((key) => {
    const value = album[key];

    if (value !== null) {
      formData.append(key, value);
    }
  });

  await axiosApi.post<AlbumApi>('/albums', formData);
});

export const publishAlbum = createAsyncThunk<void, string>('albums/publishAlbum', async (id) => {
  await axiosApi.patch('/albums/' + id + '/togglePublished');
});

export const deleteAlbum = createAsyncThunk<void, string>('albums/deleteAlbum', async (id) => {
  await axiosApi.delete('/albums/' + id);
});
