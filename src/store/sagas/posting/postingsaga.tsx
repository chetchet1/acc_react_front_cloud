import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { getDetailDate, requestSearchDate, requestSearchDateSuccess } from 'store/slices/detailTrial';

function* handleDetailDate() {
  try {
    const { data } = yield call(getDetailDate);
    console.log('사가사가', data);
    yield put(requestSearchDateSuccess({ data }));
  } catch (error) {
    console.log(error);
  }
}

function* watchGetDetailDate() {
  yield takeLatest(requestSearchDate, handleDetailDate);
}

export default function* trialSaga() {
  yield all([fork(watchGetDetailDate)]);
}
