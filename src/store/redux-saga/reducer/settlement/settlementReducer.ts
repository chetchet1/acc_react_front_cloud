/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    periodNoList:[],
    totalTrialBalanceList: [],
    financialStatementlist: [],
    
}

const settlementSlice = createSlice({
    name: "settlement",
    initialState,
    reducers: {
        AccountPeriodNoRequest(state){
            console.warn('회계기수 데이터 요청 중');
        },
        AccountPeriodNoSuccess(state, action){
            console.warn('state 업데이트', action.payload);
            state.periodNoList = action.payload;
        },
        AccountPeriodNoFailure(state){
            console.warn('error');
        },
        TotalTrialBalanceListRequest(state){
            console.warn('합계잔액시산표 목록 요청 중')
        },
        TotalTrialBalanceListSuccess(state, action){
            console.warn('state 업데이트', action.payload);
            state.totalTrialBalanceList = action.payload;
            console.log("----- action.payload -----", action.payload);
        },
        TotalTrialBalanceListFailure(state, action){
            console.warn('error')
        },
        FinancialPositionListRequest(state){
            console.warn('재무상태표 데이터 요청 중');
        },
        FinancialPositionListSuccess(state, action){
            console.warn('state 업데이트', action.payload.financialPositionList);
            state.financialStatementlist = action.payload.financialPositionList.financialPosition;
        },
        FinancialPositionListFailure(state, action){
            console.warn('error');
        },
    }
})


export const settlementActions = settlementSlice.actions;
export default settlementSlice.reducer;