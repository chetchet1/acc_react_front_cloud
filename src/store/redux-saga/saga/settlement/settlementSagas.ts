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
        yield put(settlementActions.AccountPeriodNoSuccess(response.data.periodNoList));
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

        yield put(settlementActions.TotalTrialBalanceListSuccess(response.data.totalTrialBalanceResult));
    }catch(error){
        yield put(settlementActions.TotalTrialBalanceListFailure(error));
    }
}

function* financialStatementlist(action:any){
    const { payload } = action;
    try{
        const response:AxiosResponse = yield call(getFinancialPosition, payload);
        // response 는 call 효과가 반환하는 값을 저장하기 위한 변수로, AxiosResponse는 Axios 라이브러리의 응답 객체를 나타내는 타입임
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
    // 들어오는 모든 액션에 대해 지정한 사가 함수 실행
}

export function* settlementSagas(){
    yield all([
        watchFetchSettlement(),
    ])
}