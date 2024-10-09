import { all, call, put, takeLatest } from 'redux-saga/effects';
import { operateActions } from '../../reducer/operate/operateReducer';
import {
    getAssetList,
    getFixedAssetList,
    insertFixedAsset,
    getDepreciationList,
    getSelectedDepList,
    getFixedAssetLedgerList,
    getAccountCodeList,
    getCustomerCodeList,
    getFundPlan,
    insertFundPlan,
    updateFundPlan,
    deleteFundPlan,
    getAllNote,
    getDailyTradeStatus,
    getExpectedPrice,
    getFinanceStatus,
    getGeneralFundStatus,
} from 'store/redux-saga/api/operate';
import { AxiosResponse } from 'axios';

//자산유형
function* fetchAssetCode(){
    try{
        const response:AxiosResponse = yield call(getAssetList);
        console.warn('자산유형 response', response);

        yield put(operateActions.FixedAssetCodeSuccess(response.data)); // 이게 액션함수 인듯함
    
    }catch(error){
        yield put(operateActions.FixedAssetCodeFailure());
    }
}

//고정자산목록
function* fixedAssetList(action:any){
    const { payload } = action; // 메인페이지에서 받아온 인숙밧이 payload에 입력된느듯함.
    try{
        const response:AxiosResponse = yield call(getFixedAssetList, payload);
        console.warn('조회 response', response);
        console.log("액션액션",payload)

        yield put(operateActions.FixedAssetListSuccess(response.data));
    }catch(error){
        yield put(operateActions.FixedAssetListFailure());
    }
}

//고정자산 추가
function* addFixedAsset(action:any){
    const { payload } = action;
    try{
        const response:AxiosResponse = yield call(insertFixedAsset, payload);
        console.warn('추가 response', response);

    }catch(error){
        yield put(operateActions.AddFixedAssetFailure());
    }
}

//감가상각현황 전체조회
function* depreciationList(){
    try{
        const response:AxiosResponse = yield call(getDepreciationList);
        console.warn('감가상각현황 조회 response', response);

        yield put(operateActions.DepListSuccess(response.data));
    }catch(error){
        yield put(operateActions.DepListFailure());
    }
}

//감가상각현황 조건조회
function* selectedDepList(action:any){
    const { payload } = action;
    try{
        const response:AxiosResponse = yield call(getSelectedDepList, payload);
        console.warn('조건 조회 response', response);

        yield put(operateActions.SelectedDepListSuccess(response.data)); // 이게 액션함수 인듯함

    }catch(error){
        yield put(operateActions.SelectedDepListFailure());
    }
}

//고정자산 관리대장
function* fixedAssetLedger(){
    try{
        const response:AxiosResponse = yield call(getFixedAssetLedgerList);
        console.warn('관리대장 response', response);

        yield put(operateActions.FixedAssetLedgerSuccess(response.data));
    }catch(error){
        yield put(operateActions.FixedAssetLedgerFailure());
    }
}

//계정코드 전체조회
function* accountCodeList(){
    try{
        const response:AxiosResponse = yield call(getAccountCodeList);
        console.warn('계정코드 조회 response', response);

        yield put(operateActions.FundCodeListSuccess(response.data));
    }catch(error){
        yield put(operateActions.FundCodeListFailure());
    }
}

//계정코드 조건조회
function* selectedAccCode(action:any){
    const { payload } = action;
    try{
        const response:AxiosResponse = yield call(getSelectedDepList, payload);
        console.warn('조건 조회 response', response);

        yield put(operateActions.SelectedFundCodeSuccess(response.data));
    }catch(error){
        yield put(operateActions.SelectedFundCodeFailure());
    }
}

//거래처코드 전체조회
function* customerCodeList(){
    try{
        const response:AxiosResponse = yield call(getCustomerCodeList);
        console.warn('거래처코드 조회 response', response);

        yield put(operateActions.CustomerCodeSuccess(response.data));
    }catch(error){
        yield put(operateActions.CustomerCodeFailure());
    }
}

//일자별자금계획 추가
function* createPlan(action:any){
    const { payload } = action;
    try{
        const response:AxiosResponse = yield call(insertFundPlan, payload);
        console.warn('자금계획 추가 response', response);

    }catch(error){
        yield put(operateActions.CreatePlanFailure());
    }
}

//일자별자금계획 조회
function* selectPlan(action:any){
    const { payload } = action;
    try{
        const response:AxiosResponse = yield call(getFundPlan, payload);
        console.warn('조회 response', response);

        yield put(operateActions.FundPlanDetailSuccess(response.data));
    }catch(error){
        yield put(operateActions.FundPlanDetailFailure());
    }
}

 //일자별자금 계획 수정
function* updatePlan(action:any){
    const { payload } = action;
    try{
        const response:AxiosResponse = yield call(updateFundPlan, payload);
        console.warn('수정 response', response);

    }catch(error){
        yield put(operateActions.UpdatePlanFailure());
    }
}

 //일자별자금 계획 삭제
 function* deletePlan(action:any){
    const { payload } = action;
    try{
        const response:AxiosResponse = yield call(deleteFundPlan, payload);
        console.warn('삭제 response', response);

    }catch(error){
        yield put(operateActions.DeletePlanFailure());
    }
}

//어음명세서 조회
function* selectAllNote(action:any){
    const { payload } = action;
    try{
        const response:AxiosResponse = yield call(getAllNote, payload);
        console.warn('어음명세서 조회 response', response);

        yield put(operateActions.SearchAllNoteSuccess(response.data));
    }catch(error){
        yield put(operateActions.SearchAllNoteFailure());
    }
}

//일일거래증감현황 조회
function* dailyTradeStatus(action:any){
    const { payload } = action;
    try{
        const response:AxiosResponse = yield call(getDailyTradeStatus, payload);
        console.warn('일일거래증감현황 조회 response', response);

        yield put(operateActions.SelectTradeStatusSuccess(response.data));
    }catch(error){
        yield put(operateActions.SelectTradeStatusFailure());
    }
}

//입출금예정액 조회
function* inoutExpectedPrice(action:any){
    const { payload } = action;
    try{
        const response:AxiosResponse = yield call(getExpectedPrice, payload);
        console.warn('입출금예정액 조회 response', response);

        yield put(operateActions.SelectInoutPriceSuccess(response.data));
    }catch(error){
        yield put(operateActions.SelectInoutPriceFailure());
    }
}

//예적금현황 조회
function* financeStatus(action:any){
    const { payload } = action;
    try{
        const response:AxiosResponse = yield call(getFinanceStatus, payload);
        console.warn('예적금현황 조회 response', response);

        yield put(operateActions.SelectFinanceStatusSuccess(response.data));
    }catch(error){
        yield put(operateActions.SelectFinanceStatusFailure());
    }
}

//총괄거래현황 조회
function* generalFundStatus(action:any){
    const { payload } = action;
    console.log("payload???", payload);
    try{
        const response:AxiosResponse = yield call(getGeneralFundStatus, payload);
        console.warn('총괄거래현황 조회 response', response);

        yield put(operateActions.SelectGeneralFundSuccess(response.data));
    }catch(error){
        yield put(operateActions.SelectGeneralFundFailure());
    }
}

function* watchFetchOperate(){
    yield takeLatest(operateActions.FixedAssetCodeRequest.type, fetchAssetCode); //들어오는 모든 FixedAssetCodeRequest 액션에대해 fetchAssetCode 실행.
    yield takeLatest(operateActions.FixedAssetListRequest.type, fixedAssetList);
    yield takeLatest(operateActions.AddFixedAssetRequest.type, addFixedAsset);
   
    yield takeLatest(operateActions.DepListRequest.type, depreciationList);
    yield takeLatest(operateActions.SelectedDepListRequest.type, selectedDepList);
   
    yield takeLatest(operateActions.FixedAssetLedgerRequest.type, fixedAssetLedger);
    yield takeLatest(operateActions.FundCodeListRequest.type, accountCodeList);
    yield takeLatest(operateActions.SelectedFundCodeRequest.type, selectedAccCode);
    yield takeLatest(operateActions.CustomerCodeRequest.type, customerCodeList);
   
    yield takeLatest(operateActions.CreatePlanRequest.type, createPlan);
    yield takeLatest(operateActions.FundPlanDetailRequest.type, selectPlan);
    yield takeLatest(operateActions.UpdatePlanRequest.type, updatePlan);
    yield takeLatest(operateActions.DeletePlanRequest.type, deletePlan);

    yield takeLatest(operateActions.SearchAllNoteRequest.type, selectAllNote);
    yield takeLatest(operateActions.SelectTradeStatusRequest.type, dailyTradeStatus);
    yield takeLatest(operateActions.SelectInoutPriceRequest.type, inoutExpectedPrice);
    yield takeLatest(operateActions.SelectFinanceStatusRequest.type, financeStatus);
    yield takeLatest(operateActions.SelectGeneralFundRequest.type, generalFundStatus);
};

export function* operateSagas(){ //promise.all 과 비슷하다 데이터들을 동시에 가져올 수 있게끔 하는? 그런 비동기적 코드인 거 같음
    yield all([
        watchFetchOperate(),
    ]);
}