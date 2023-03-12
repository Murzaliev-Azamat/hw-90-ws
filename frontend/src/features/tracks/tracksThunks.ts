import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Track, TrackApi } from '../../../types';

export const fetchTracks = createAsyncThunk<Track[], string | undefined>('tracks/fetchAll', async (id) => {
  if (id) {
    const tracksResponse = await axiosApi.get<Track[]>('/tracks/?album=' + id);
    return tracksResponse.data;
  }

  const tracksResponse = await axiosApi.get<Track[]>('/tracks');
  return tracksResponse.data;
});

export const addTrack = createAsyncThunk<void, TrackApi>('tracks/addTrack', async (track) => {
  await axiosApi.post<TrackApi>('/tracks', track);
});

export const publishTrack = createAsyncThunk<void, string>('tracks/publishTrack', async (id) => {
  await axiosApi.patch('/tracks/' + id + '/togglePublished');
});

export const deleteTrack = createAsyncThunk<void, string>('tracks/deleteTrack', async (id) => {
  await axiosApi.delete('/tracks/' + id);
});
