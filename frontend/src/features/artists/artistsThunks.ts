import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Artist, ArtistApi } from '../../../types';

export const fetchArtists = createAsyncThunk<Artist[]>('artists/fetchAll', async () => {
  const artistsResponse = await axiosApi.get<Artist[]>('/artists');
  return artistsResponse.data;
});

export const addArtist = createAsyncThunk<void, ArtistApi>('artists/addArtist', async (artist) => {
  const formData = new FormData();

  const keys = Object.keys(artist) as (keyof ArtistApi)[];
  keys.forEach((key) => {
    const value = artist[key];

    if (value !== null) {
      formData.append(key, value);
    }
  });

  await axiosApi.post<ArtistApi>('/artists', formData);
});

export const publishArtist = createAsyncThunk<void, string>('artists/publishArtist', async (id) => {
  await axiosApi.patch('/artists/' + id + '/togglePublished');
});

export const deleteArtist = createAsyncThunk<void, string>('artists/deleteArtist', async (id) => {
  await axiosApi.delete('/artists/' + id);
});
