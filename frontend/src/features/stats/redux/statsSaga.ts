import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchStatsRequest,
  fetchStatsSuccess,
  fetchStatsFailure,
} from './statsSlice';
import apiClient from '../../../api/axiosClient';
import { Stats } from '../types/stats';

function* fetchStatsSaga() {
  try {
    const response = yield call(apiClient.get, '/stats');
    yield put(fetchStatsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchStatsFailure(error.response?.data?.message || 'Failed to fetch stats'));
  }
}

export default function* statsSaga() {
  yield takeLatest(fetchStatsRequest.type, fetchStatsSaga);
}
