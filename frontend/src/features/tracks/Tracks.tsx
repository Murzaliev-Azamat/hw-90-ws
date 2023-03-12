import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useParams } from 'react-router-dom';
import { selectFetchAllTracksLoading, selectTracks } from './tracksSlice';
import { deleteTrack, fetchTracks, publishTrack } from './tracksThunks';
import { addTrackToHistory } from '../tracksHistory/tracksHistoryThunks';
import YouTube from 'react-youtube';
import YoutubeModal from '../../components/UI/YoutubeModal';
import { Button } from '@mui/material';
import { selectUser } from '../users/usersSlise';

const Tracks = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const fetchAllTracksLoading = useAppSelector(selectFetchAllTracksLoading);
  const user = useAppSelector(selectUser);

  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [linkYoutube, setLinkYoutube] = useState('');

  const cancelYoutubeModal = () => setShowYoutubeModal(false);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchTracks(params.id));
    }
  }, [dispatch, params.id]);

  const removeTrack = async (id: string) => {
    await dispatch(deleteTrack(id));
    if (params.id) {
      await dispatch(fetchTracks(params.id));
    }
  };

  let artistName = null;

  if (tracks.length > 0) {
    artistName = tracks[0].album.artist.name;
  }

  const playTrack = async (id: string, link?: string) => {
    await dispatch(addTrackToHistory(id));

    if (link) {
      setShowYoutubeModal(true);
      setLinkYoutube(link);
    }
  };

  const publish = async (id: string) => {
    await dispatch(publishTrack(id));
    await dispatch(fetchTracks(params.id));
  };

  const opts = {
    height: '200',
    width: '400',
    playerVars: {
      autoplay: 0,
    },
  };

  let info = null;

  if (fetchAllTracksLoading) {
    info = <Spinner />;
  } else {
    info = (
      <>
        {tracks.map((track) => {
          if ((!track.isPublished && user && user.role !== 'admin') || (!track.isPublished && !user)) {
            return;
          }
          return (
            <div key={track._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <p style={{ marginRight: '10px', marginBottom: '0' }}>{track.trackNumber}</p>
              <p style={{ marginRight: '10px', color: 'green', marginBottom: '0' }}>{track.name}</p>
              <p style={{ marginRight: '10px', marginBottom: '0' }}>{track.time + ' minutes'}</p>
              <Button
                style={{ marginRight: '10px' }}
                onClick={() => playTrack(track._id, track.linkToYoutube)}
                variant="contained"
                color="warning"
              >
                Play
              </Button>
              {user && user.role === 'admin' && (
                <Button onClick={() => removeTrack(track._id)} variant="contained" style={{ marginRight: '10px' }}>
                  Delete
                </Button>
              )}
              {user && user.role === 'admin' && !track.isPublished && (
                <>
                  <Button
                    onClick={() => publish(track._id)}
                    variant="contained"
                    color="success"
                    style={{ marginRight: '10px' }}
                  >
                    Опубликовать
                  </Button>
                  <p style={{ color: 'red' }}>Неопубликовано</p>
                </>
              )}
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div>
      <h1>{artistName}</h1>
      {info}
      <YoutubeModal show={showYoutubeModal} title="Расширенный фильтр" onClose={cancelYoutubeModal}>
        <div className="modal-body">
          <YouTube videoId={linkYoutube} opts={opts} />
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={cancelYoutubeModal}>
            Cancel
          </button>
        </div>
      </YoutubeModal>
    </div>
  );
};

export default Tracks;
