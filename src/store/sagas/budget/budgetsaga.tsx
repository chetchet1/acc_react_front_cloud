
import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { getCurrentBudget, getCurrentBudgetInitSuccess } from 'store/slices/budget/budgetStatus';

function* budgetStatusSaga(action:any){
    try{
        const {accountPeriodNo, workplaceCode, deptCode} = action.payload
        const {data} = yield call(getCurrentBudget, accountPeriodNo, workplaceCode, deptCode);

        yield put(getCurrentBudgetInitSuccess({data}))
    }
    catch(error){
        console.log(error)
    }
}

function* watchGetBudgetStatus() {
    yield takeLatest( , );
  }

export default function* budgetsaga() {
    yield all([fork(watchGetBudgetStatus)]);

}