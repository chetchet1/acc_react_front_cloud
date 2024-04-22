/* eslint-disable prettier/prettier */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { settlementActions } from '../../reducer/settlement/settlementReducer';
import {
    getAccountPeriodNo,
    getTotalTrialBalance,
    getFinancialPosition,

} from 'store/redux-saga/api/settlement';
import { AxiosResponse } from 'axios';

// 회계기수
function* fetchPeriodList(){
    try{
        const response:AxiosResponse = yield call(getAccountPeriodNo);
        console.warn('회계기수 response', response);
        yield put(settlementActions.AccountPeriodNoSuccess(response.data));
    }catch(error){
        yield put(settlementActions.AccountPeriodNoFailure());
    }
}

// 합계잔액시산표 목록
function* totalTrialBalanceList(action:any){
    const { payload } = action;
    try{
        const response:AxiosResponse = yield call(getTotalTrialBalance, payload);
        console.warn('조회 response', response);

        yield put(settlementActions.TotalTrialBalanceListSuccess(response.data));
    }catch(error){
        yield put(settlementActions.TotalTrialBalanceListFailure(error));
    }
}

function* financialStatementlist(action:any){
    const { payload } = action;
    try{
        const response:AxiosResponse = yield call(getFinancialPosition, payload);
        console.warn('조회 response', response);

        yield put(settlementActions.FinancialPositionListSuccess(response.data));
    }catch(error){
        yield put(settlementActions.FinancialPositionListFailure(error));
    }
}

function* watchFetchSettlement(){
    yield takeLatest(settlementActions.AccountPeriodNoRequest.type, fetchPeriodList);
    yield takeLatest(settlementActions.TotalTrialBalanceListRequest.type, totalTrialBalanceList);
    yield takeLatest(settlementActions.FinancialPositionListRequest.type, financialStatementlist)
}

export function* settlementSagas(){
    yield all([
        watchFetchSettlement(),
    ])
}