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
import { Song } from '../types/song';

function* fetchSongsSaga(action: ReturnType<typeof fetchSongsRequest>) {
  try {
    const params = action.payload ? { genre: action.payload } : {};
    const response = yield call(apiClient.get, '/songs', { params });
    yield put(fetchSongsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.response?.data?.message || 'Failed to fetch songs'));
  }
}

function* createSongSaga(action: ReturnType<typeof createSongRequest>) {
  try {
    const response = yield call(apiClient.post, '/songs', action.payload);
    yield put(createSongSuccess(response.data));
  } catch (error: any) {
    yield put(createSongFailure(error.response?.data?.message || 'Failed to create song'));
  }
}

function* updateSongSaga(action: ReturnType<typeof updateSongRequest>) {
  try {
    const response = yield call(
      apiClient.put,
      `/songs/${action.payload.id}`,
      action.payload.data
    );
    yield put(updateSongSuccess(response.data));
  } catch (error: any) {
    yield put(updateSongFailure(error.response?.data?.message || 'Failed to update song'));
  }
}

function* deleteSongSaga(action: ReturnType<typeof deleteSongRequest>) {
  try {
    yield call(apiClient.delete, `/songs/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteSongFailure(error.response?.data?.message || 'Failed to delete song'));
  }
}

export default function* songSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);
  yield takeLatest(createSongRequest.type, createSongSaga);
  yield takeLatest(updateSongRequest.type, updateSongSaga);
  yield takeLatest(deleteSongRequest.type, deleteSongSaga);
}
