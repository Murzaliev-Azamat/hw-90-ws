import React, { useEffect, useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TrackApi } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { selectAlbums } from '../albums/albumsSlice';
import { addTrack, fetchTracks } from './tracksThunks';
import { selectAddTrackLoading } from './tracksSlice';
import { fetchAlbums } from '../albums/albumsThunks';

const FormForTracks = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const addTrackLoading = useAppSelector(selectAddTrackLoading);

  const [state, setState] = useState<TrackApi>({
    album: '',
    name: '',
    time: '',
    trackNumber: '',
  });

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  console.log(albums);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      addTrack({
        album: state.album,
        name: state.name,
        time: state.time,
        trackNumber: state.trackNumber,
      }),
    );
    setState({ album: '', name: '', time: '', trackNumber: '' });
    await dispatch(fetchTracks(state.album));
    navigate('/tracks/' + state.album);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const selectChangeHandler = (e: SelectChangeEvent) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  let disabled = false;

  if (addTrackLoading) {
    disabled = true;
  }

  return (
    <>
      <FormControl component="form" onSubmit={submitFormHandler} fullWidth>
        <Grid item container justifyContent="space-between" alignItems="center" xs sx={{ mb: 1 }}>
          <InputLabel id="album">Album</InputLabel>
          <Select
            labelId="album"
            sx={{ width: '100%' }}
            id="album"
            label="Album"
            value={state.album}
            onChange={selectChangeHandler}
            name="album"
            required
          >
            {albums.map((album) => (
              <MenuItem value={album._id} key={album._id}>
                {album.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item container justifyContent="space-between" alignItems="center" xs sx={{ mb: 1 }}>
          <TextField
            sx={{ width: '100%' }}
            id="name"
            label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            required
          />
        </Grid>

        <Grid container direction="column" spacing={2} sx={{ mb: 1 }}>
          <Grid item xs>
            <TextField
              sx={{ width: 1 }}
              multiline
              rows={3}
              id="time"
              label="Time"
              value={state.time}
              onChange={inputChangeHandler}
              name="time"
              required
            />
          </Grid>

          <Grid item xs>
            <TextField
              sx={{ width: 1 }}
              multiline
              rows={3}
              id="trackNumber"
              label="Track Number"
              value={state.trackNumber}
              onChange={inputChangeHandler}
              name="trackNumber"
              required
            />
          </Grid>
        </Grid>

        <Button disabled={disabled} type="submit" color="primary" variant="contained">
          Add track
        </Button>
      </FormControl>
    </>
  );
};

export default FormForTracks;
