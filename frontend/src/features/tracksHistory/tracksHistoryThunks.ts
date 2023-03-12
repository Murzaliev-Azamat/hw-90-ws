import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { TrackHistory } from '../../../types';

export const fetchTracksHistory = createAsyncThunk<TrackHistory[], void, { state: RootState }>(
  'tracksHistory/fetchAll',
  async (id, { getState }) => {
    const user = getState().users.user;

    if (user) {
      const tracksHistoryResponse = await axiosApi.get<TrackHistory[]>('/track_history', {
        headers: { Authorization: user.token },
      });
      return tracksHistoryResponse.data;
    } else {
      throw new Error('No user');
    }
  },
);

export const addTrackToHistory = createAsyncThunk<void, string, { state: RootState }>(
  'tracksHistory/addTrackToHistory',
  async (id, { getState }) => {
    const user = getState().users.user;

    if (user) {
      await axiosApi.post('/track_history', { track: id }, { headers: { Authorization: user.token } });
    } else {
      throw new Error('No user');
    }
  },
);
