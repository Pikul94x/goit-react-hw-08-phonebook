import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk('auth/register', async userData => {
  try {
    const { data } = await axios.post('/users/signup', userData);
    token.set(data.token);
    return data;
  } catch (error) {
    if (
      error.response?.status === 400 &&
      error.response?.data?.code === 11000 &&
      error.response?.data?.keyPattern.email
    ) {
      Notiflix.Notify.failure(
        'This email is already in use, try using different email or login into an existing account.'
      );
    } else {
      Notiflix.Notify.failure(error.response?.data?.message || error.message);
    }

    throw error;
  }
});

const logIn = createAsyncThunk('auth/login', async userData => {
  try {
    const { data } = await axios.post('/users/login', userData);
    token.set(data.token);
    return data;
  } catch (error) {
    if (error.response?.status === 400) {
      Notiflix.Notify.failure('Invalid credentials, try again.');
    } else {
      Notiflix.Notify.failure(error.message);
    }
    throw error;
  }
});

const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (error) {
    return Notiflix.Notify.failure(error.message);
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return Notiflix.Notify.failure(error.message);
    }
  }
);

const operations = {
  register,
  logIn,
  logOut,
  fetchCurrentUser,
};

export default operations;
