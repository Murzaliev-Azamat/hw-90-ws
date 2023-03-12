import React from 'react';
import { Button, Container, Grid } from '@mui/material';
import { NavLink, Route, Routes } from 'react-router-dom';
import Artists from './features/artists/Artists';
import Albums from './features/albums/Albums';
import Tracks from './features/tracks/Tracks';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import TracksHistory from './features/tracksHistory/TracksHistory';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlise';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import FormForArtists from './features/artists/FormForArtists';
import FormForAlbums from './features/albums/FormForAlbums';
import FormForTracks from './features/tracks/FormForTracks';

function App() {
  const user = useAppSelector(selectUser);

  return (
    <div className="App">
      <AppToolBar />
      <Container maxWidth="md" sx={{ mt: 2 }}>
        {user && (
          <Grid container sx={{ mb: 2 }}>
            <Grid item xs={2}>
              <Button
                component={NavLink}
                variant="contained"
                size="small"
                disableElevation
                style={{ color: 'white' }}
                to={'/add-artist'}
              >
                Add artist
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                component={NavLink}
                variant="contained"
                size="small"
                disableElevation
                style={{ color: 'white' }}
                to={'/add-album'}
              >
                Add album
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                component={NavLink}
                variant="contained"
                size="small"
                disableElevation
                style={{ color: 'white' }}
                to={'/add-track'}
              >
                Add track
              </Button>
            </Grid>
          </Grid>
        )}
        <Routes>
          <Route path="/" element={<Artists />} />
          <Route
            path="/add-artist"
            element={
              <ProtectedRoute isAllowed={(user && user.role === 'admin') || (user && user.role === 'user')}>
                <FormForArtists />
              </ProtectedRoute>
            }
          />
          <Route path="/albums/:id" element={<Albums />} />
          <Route path="/add-album" element={<FormForAlbums />} />
          <Route path="/tracks/:id" element={<Tracks />} />
          <Route path="/add-track" element={<FormForTracks />} />
          <Route path="/tracks_history" element={<TracksHistory />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<span>Такой страницы не существует</span>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
