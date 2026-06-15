import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchStatsRequest,
  fetchStatsSuccess,
  fetchStatsFailure,
} from './statsSlice';
import apiClient from '../../../api/axiosClient';
import type { Stats } from '../types/stats';
import type { AxiosResponse } from 'axios';

interface SagaError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

function* fetchStatsSaga() {
  try {
    const response: AxiosResponse<Stats> = yield call(apiClient.get, '/stats');
    yield put(fetchStatsSuccess(response.data));
  } catch (error) {
    const err = error as SagaError;
    yield put(fetchStatsFailure(err.response?.data?.message || 'Failed to fetch stats'));
  }
}

export default function* statsSaga() {
  yield takeLatest(fetchStatsRequest.type, fetchStatsSaga);
}
