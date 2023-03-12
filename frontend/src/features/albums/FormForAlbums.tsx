import React, { useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FileInput from '../../components/UI/FileInput/FileInput';
import { AlbumApi } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { addAlbum, fetchAlbums } from './albumsThunks';
import { selectAddAlbumLoading } from './albumsSlice';
import { selectArtists } from '../artists/artistsSlice';

const FormForAlbums = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const addAlbumLoading = useAppSelector(selectAddAlbumLoading);

  const [state, setState] = useState<AlbumApi>({
    artist: '',
    name: '',
    year: '',
    image: null,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      addAlbum({
        artist: state.artist,
        name: state.name,
        year: state.year,
        image: state.image,
      }),
    );
    setState({ artist: '', name: '', year: '', image: null });
    await dispatch(fetchAlbums(state.artist));
    navigate('/albums/' + state.artist);
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

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: null,
      }));
    }
  };

  let disabled = false;

  if (addAlbumLoading) {
    disabled = true;
  }

  return (
    <>
      <FormControl component="form" onSubmit={submitFormHandler} fullWidth>
        <Grid item container justifyContent="space-between" alignItems="center" xs sx={{ mb: 1 }}>
          <InputLabel id="artist">Artist</InputLabel>
          <Select
            labelId="artist"
            sx={{ width: '100%' }}
            id="artist"
            label="Artist"
            value={state.artist}
            onChange={selectChangeHandler}
            name="artist"
            required
          >
            {artists.map((artist) => (
              <MenuItem value={artist._id} key={artist._id}>
                {artist.name}
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
              id="year"
              label="Year"
              value={state.year}
              onChange={inputChangeHandler}
              name="year"
              required
            />
          </Grid>

          <Grid item xs>
            <FileInput onChange={fileInputChangeHandler} name="image" label="Image" />
          </Grid>
        </Grid>

        <Button disabled={disabled} type="submit" color="primary" variant="contained">
          Add album
        </Button>
      </FormControl>
    </>
  );
};

export default FormForAlbums;
