import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} from './songSlice';
import apiClient from '../../../api/axiosClient';
import type { Song } from '../types/song';
import type { AxiosResponse } from 'axios';

interface SagaError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

function* fetchSongsSaga(action: ReturnType<typeof fetchSongsRequest>) {
  try {
    const params = action.payload ? { genre: action.payload } : {};
    const response: AxiosResponse<Song[]> = yield call(apiClient.get, '/songs', { params });
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    const err = error as SagaError;
    yield put(fetchSongsFailure(err.response?.data?.message || 'Failed to fetch songs'));
  }
}

function* createSongSaga(action: ReturnType<typeof createSongRequest>) {
  try {
    const response: AxiosResponse<Song> = yield call(apiClient.post, '/songs', action.payload);
    yield put(createSongSuccess(response.data));
  } catch (error) {
    const err = error as SagaError;
    yield put(createSongFailure(err.response?.data?.message || 'Failed to create song'));
  }
}

function* updateSongSaga(action: ReturnType<typeof updateSongRequest>) {
  try {
    const response: AxiosResponse<Song> = yield call(
      apiClient.put,
      `/songs/${action.payload.id}`,
      action.payload.data
    );
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    const err = error as SagaError;
    yield put(updateSongFailure(err.response?.data?.message || 'Failed to update song'));
  }
}

function* deleteSongSaga(action: ReturnType<typeof deleteSongRequest>) {
  try {
    yield call(apiClient.delete, `/songs/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    const err = error as SagaError;
    yield put(deleteSongFailure(err.response?.data?.message || 'Failed to delete song'));
  }
}

export default function* songSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);
  yield takeLatest(createSongRequest.type, createSongSaga);
  yield takeLatest(updateSongRequest.type, updateSongSaga);
  yield takeLatest(deleteSongRequest.type, deleteSongSaga);
}
