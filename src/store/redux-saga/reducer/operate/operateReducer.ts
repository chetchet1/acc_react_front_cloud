/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    fixedAssetCode:[],
    fixedAssetList:[],
    data:[],
    fixedAssetDetailBean:[],
    depreciationList:[],
    selectedDepList:[],
    fixedAssetLedger:[],
    accountCodeList:[],
    selectedAccCode:[],
    customerCodeList:[],
    expectedPlanList:[],
    updatedPlanList:[],
    deletedPlanList:[],
    noteList:[],
    dailyTradeList:[],
    expectedPriceList:[],
    financeStatusList:[],
    generalFundList:[],
};

const operateSlice = createSlice({
    name: "operate",
    initialState,
    reducers:{
        FixedAssetCodeRequest(state){
            console.warn('자산유형 요청중');
        },
        FixedAssetCodeSuccess(state,action){
            console.warn('state 업데이트', action.payload);
            state.fixedAssetCode = action.payload; //이 payload에 데이터 값이 들어오는 듯함. state는 타입.
            console.log("state.fixedAssetCode?????????????", state.fixedAssetCode);
        },
        FixedAssetCodeFailure(state){
            console.warn('error');
        },
        FixedAssetListRequest(state){
            console.warn('고정자산목록 요청중',state);
        },
        FixedAssetListSuccess(state, action){
            console.warn('state 업데이트', action.payload);
            state.fixedAssetList = action.payload;
        },
        FixedAssetListFailure(state){
            console.warn('error');
        },
        AddFixedAssetRequest(state){
            console.warn('고정자산 추가 요청중');
        },
        AddFixedAssetFailure(state){
            console.warn('error');
        }, 
        DepListRequest(state){
            console.warn('감가상각현황 전체 조회 요청중');
        },
        DepListSuccess(state,action){
            console.warn('state 업데이트', action.payload);
            state.depreciationList = action.payload;
        },
        DepListFailure(state){
            console.warn('error');
        },
        SelectedDepListRequest(state){
            console.warn('감가상각현황 조건 조회 요청중');
        },
        SelectedDepListSuccess(state,action){
            console.warn('state 업데이트', action.payload);
            state.selectedDepList = action.payload;
        },
        SelectedDepListFailure(state){
            console.warn('error');
        },
        FixedAssetLedgerRequest(state){
            console.warn('고정자산 관리 대장 요청중');
        },
        FixedAssetLedgerSuccess(state,action){
            console.warn('state 업데이트', action.payload);
            state.fixedAssetLedger = action.payload;
        },
        FixedAssetLedgerFailure(state){
            console.warn('error');
        },
        FundCodeListRequest(state){
            console.warn('계정코드 전체조회 요청중');
        },
        FundCodeListSuccess(state,action){
            console.warn('state 업데이트', action.payload);
            state.accountCodeList = action.payload;
        },
        FundCodeListFailure(state){
            console.warn('error');
        },
        SelectedFundCodeRequest(state){
            console.warn('계정코드 조건조회 요청중');
        },
        SelectedFundCodeSuccess(state,action){
            console.warn('state 업데이트', action.payload);
            state.selectedAccCode = action.payload;
        },
        SelectedFundCodeFailure(state){
            console.warn('error');
        },
        CustomerCodeRequest(state){
            console.warn('거래처코드 조회 요청중');
        },
        CustomerCodeSuccess(state,action){
            console.warn('state 업데이트', action.payload);
            state.customerCodeList = action.payload;
        },
        CustomerCodeFailure(state){
            console.warn('error');
        },
        CreatePlanRequest(state){
            console.warn('일자별자금 계획 추가 요청중');
        },
        CreatePlanFailure(state){
            console.warn('error');
        },
        FundPlanDetailRequest(state){
            console.warn('일자별자금 계획 조회 요청중');
        },
        FundPlanDetailSuccess(state, action){
            console.warn('state 업데이트', action.payload);
            state.expectedPlanList = action.payload;
        },
        FundPlanDetailFailure(state){
            console.warn('error');
        },
        UpdatePlanRequest(state){
            console.warn('일자별자금 계획 수정 요청중');
        },
        UpdatePlanFailure(state){
            console.warn('error');
        },
        DeletePlanRequest(state){
            console.warn('일자별자금 계획 삭제 요청중');
        },
        DeletePlanFailure(state){
            console.warn('error');
        },
        SearchAllNoteRequest(state){
            console.warn('어음명세서 조회 요청중');
        },
        SearchAllNoteSuccess(state, action){
            console.warn('state 업데이트', action.payload);
            state.noteList = action.payload;
        },
        SearchAllNoteFailure(state){
            console.warn('error');
        },
        SelectTradeStatusRequest(state){
            console.warn('일일거래증감현황 조회 요청중');
        },
        SelectTradeStatusSuccess(state, action){
            console.warn('state 업데이트', action.payload);
            state.dailyTradeList = action.payload;
        },
        SelectTradeStatusFailure(state){
            console.warn('error');
        },
        SelectInoutPriceRequest(state){
            console.warn('입출금예정액 조회 요청중');
        },
        SelectInoutPriceSuccess(state, action){
            console.warn('state 업데이트', action.payload);
            state.expectedPriceList = action.payload;
        },
        SelectInoutPriceFailure(state){
            console.warn('error');
        },
        SelectFinanceStatusRequest(state){
            console.warn('예적금현황 조회 요청중');
        },
        SelectFinanceStatusSuccess(state, action){
            console.warn('state 업데이트', action.payload);
            state.financeStatusList = action.payload;
        },
        SelectFinanceStatusFailure(state){
            console.warn('error');
        },
        SelectGeneralFundRequest(state){
            console.warn('총괄거래현황 조회 요청중');
        },
        SelectGeneralFundSuccess(state, action){
            console.warn('state 업데이트', action.payload);
            state.generalFundList = action.payload;
        },
        SelectGeneralFundFailure(state){
            console.warn('error');
        },
    }
});

export const operateActions = operateSlice.actions;
export default operateSlice.reducer;