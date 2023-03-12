import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/UI/Spinner/Spinner';
import { apiUrl } from '../../constants';
import { Link, useParams } from 'react-router-dom';
import { selectAlbums, selectFetchAllAlbumsLoading } from './albumsSlice';
import { deleteAlbum, fetchAlbums, publishAlbum } from './albumsThunks';
import { selectUser } from '../users/usersSlise';
import { Button } from '@mui/material';

const Albums = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const user = useAppSelector(selectUser);
  const fetchAllAlbumsLoading = useAppSelector(selectFetchAllAlbumsLoading);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchAlbums(params.id));
    }
  }, [dispatch, params.id]);

  const removeAlbum = async (id: string) => {
    await dispatch(deleteAlbum(id));
    if (params.id) {
      await dispatch(fetchAlbums(params.id));
    }
  };

  const publish = async (id: string) => {
    await dispatch(publishAlbum(id));
    await dispatch(fetchAlbums(params.id));
  };

  let artistName = null;

  if (albums.length > 0) {
    artistName = albums[0].artist.name;
  }

  let info = null;

  if (fetchAllAlbumsLoading) {
    info = <Spinner />;
  } else {
    info = (
      <>
        {albums.map((album) => {
          if ((!album.isPublished && user && user.role !== 'admin') || (!album.isPublished && !user)) {
            return;
          }
          return (
            <div
              key={album._id}
              style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', position: 'relative' }}
            >
              <img src={apiUrl + '/' + album.image} style={{ marginRight: '10px', width: '200px' }} alt="image"></img>
              <Link to={user ? '/tracks/' + album._id : '/login'} style={{ marginRight: '10px' }}>
                {album.name}
              </Link>
              <p style={{ marginRight: '10px', marginBottom: '0' }}>{album.year}</p>
              {user && user.role === 'admin' && (
                <Button onClick={() => removeAlbum(album._id)} variant="contained" style={{ marginRight: '10px' }}>
                  Delete
                </Button>
              )}
              {user && user.role === 'admin' && !album.isPublished && (
                <>
                  <div
                    style={{
                      backgroundColor: 'white',
                      width: '185px',
                      height: '25px',
                      position: 'absolute',
                      top: '5%',
                      left: '1%',
                    }}
                  >
                    <p style={{ color: 'red' }}>Неопубликовано</p>
                  </div>
                  <Button onClick={() => publish(album._id)} variant="contained" color="success">
                    Опубликовать
                  </Button>
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
    </div>
  );
};

export default Albums;
