import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FileInput from '../../components/UI/FileInput/FileInput';
import { ArtistApi } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { addArtist, fetchArtists } from './artistsThunks';
import { selectAddArtistLoading } from './artistsSlice';

const FormForArtists = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const addArtistLoading = useAppSelector(selectAddArtistLoading);

  const [state, setState] = useState<ArtistApi>({
    name: '',
    info: '',
    image: null,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      addArtist({
        name: state.name,
        info: state.info,
        image: state.image,
      }),
    );
    setState({ name: '', info: '', image: null });
    await dispatch(fetchArtists());
    navigate('/');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  if (addArtistLoading) {
    disabled = true;
  }

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
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
            id="info"
            label="Info"
            value={state.info}
            onChange={inputChangeHandler}
            name="info"
          />
        </Grid>

        <Grid item xs>
          <FileInput onChange={fileInputChangeHandler} name="image" label="Image" />
        </Grid>
      </Grid>

      <Button disabled={disabled} type="submit" color="primary" variant="contained">
        Add artist
      </Button>
    </form>
  );
};

export default FormForArtists;
