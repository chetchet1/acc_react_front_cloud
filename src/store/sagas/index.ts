import { all, fork } from 'redux-saga/effects';
import trialSaga from './posting/postingsaga';
import slipSaga from './posting/slipsaga';
import baseSaga from './base/baseSaga';
import accountSaga from './posting/accountSaga';
import { operateSagas } from 'store/redux-saga/saga/operate/operateSagas';
import { budgetSagas } from 'store/redux-saga/saga/budget/budgetSagas';
import { settlementSagas } from 'store/redux-saga/saga/settlement/settlementSagas';

export default function* rootSaga() {
  yield all([fork(trialSaga), fork(slipSaga), fork(accountSaga), fork(baseSaga), fork(operateSagas),fork(budgetSagas), fork(settlementSagas)]);
}
