import { call, fork, put, all, takeLatest } from 'redux-saga/effects';

import { getSlipDate, requestSlipDataSuccess, requestSlipDate } from 'store/slices/slip';

function* handleSlipDate(action: any) {
  try {
    const { startDate, endDate, slipStatus } = action.payload;
    const params = { startDate, endDate, slipStatus };
    const { data } = yield call(getSlipDate, params);
    console.log('사가사가', data);
    yield put(requestSlipDataSuccess({ data }));
  } catch (error) {
    console.log(error);
  }
}

function* watchGetSlipDate() {
  yield takeLatest(requestSlipDate, handleSlipDate);
}

export default function* slipSaga() {
  yield all([fork(watchGetSlipDate)]);
}
