import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../users/usersSlise';
import { fetchTracksHistory } from './tracksHistoryThunks';
import { selectFetchAllTracksHistoryLoading, selectTracksHistory } from './tracksHistorySlice';
import dayjs from 'dayjs';

const Albums = () => {
  const dispatch = useAppDispatch();
  const tracksHistory = useAppSelector(selectTracksHistory);
  const user = useAppSelector(selectUser);
  const fetchAllTracksHistoryLoading = useAppSelector(selectFetchAllTracksHistoryLoading);

  useEffect(() => {
    dispatch(fetchTracksHistory());
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  let info = null;

  if (fetchAllTracksHistoryLoading) {
    info = <Spinner />;
  } else {
    info = (
      <>
        {tracksHistory.map((track) => (
          <div key={track._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <p style={{ marginRight: '10px', color: 'blue' }}>{track.track.album.artist.name}</p>
            <p style={{ marginRight: '10px', color: 'green' }}>{track.track.name}</p>
            <p style={{ marginRight: '10px' }}>{dayjs(track.datetime).format('DD.MM.YYYY HH:mm:ss')}</p>
          </div>
        ))}
      </>
    );
  }

  return <div>{info}</div>;
};

export default Albums;
