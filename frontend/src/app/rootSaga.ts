import { all } from 'redux-saga/effects';
import songSaga from '../features/songs/redux/songSaga';
import statsSaga from '../features/stats/redux/statsSaga';

export default function* rootSaga() {
  yield all([songSaga(), statsSaga()]);
}
