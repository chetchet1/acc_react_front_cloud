import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { budgetActions } from "store/redux-saga/reducer/budget/budgetReducer";
import axios, { AxiosResponse } from "axios";
import {
    getPeriodList,
    getWorkCompnayList,
    getDetailDeptList,
    getParentAccountList,
    getDetailAccountList,
    insertBudgetAccount,
    searchBudgetList
} from "store/redux-saga/api/budget";
import { searchBudget } from "store/api/baseApi";


//회계연도 API
function* yearList() {
    try {
        const response: AxiosResponse = yield call(getPeriodList); //response는 db에서 받은 데이터값.
        console.log('자산유형 response', response);
        yield put(budgetActions.FiexdPeriodList(response.data))
    } catch (error) {
        console.log("기기")
    }
}
// 사업장명 API
function* workPlace() {
    try {
        const response: AxiosResponse = yield call(getWorkCompnayList)
        console.log("사업장명 response ", response)

        yield put(budgetActions.workPlaceList(response.data))
    } catch (error) {
        console.log("ee")
    }
}
//부서명 API 여기서 선언한 함수에 aciton:any를 사용하면 payload에 앞 페이지에서 보낸 매개변수 값이 넘어온다.
function* getDeptList(action:any) {
    const {payload} = action;
    console.log(payload,"부서명 페이로드입니다.")
    try {
        const response: AxiosResponse = yield call(getDetailDeptList,payload)
        
        console.log("부서명 response ", response.data.detailDeptList)

        yield put(budgetActions.GetDetailDeptListSuccess(response.data.detailDeptList))
    } catch (error) {
        console.log("ee")
    }
}

//계정과목 request, API호출하기
function* ParentAccountList(){
    try{
        const response : AxiosResponse = yield call(getParentAccountList)

        console.log("계정과목 response", response.data)

        yield put(budgetActions.GetParentAccountList(response.data.accountCodeList))
    }catch(error){
        console.log(error)
    }
}

function* DetailAccountList(action : any){
        console.log("상세계정과목매개변수 넘긴값",action.payload)
    try{
        const response : AxiosResponse = yield call(getDetailAccountList,action.payload)

        console.log("계정과목 response", response.data)

       yield put(budgetActions.GetDetailAccountList(response.data))
    }catch(error){
        console.log(error)
    }
}

function* BudgetRegister(action : any){
    console.log("예산신청 등록 값들",action.payload)
try{
    const response : AxiosResponse = yield call(insertBudgetAccount,action.payload)
    console.log("계정과목 response", response)
}catch(error){
    console.log(error)
}
}

function* SearchBudget(action : any){
    console.log("예산조회 세팅 값들",action.payload)
try{
    const response : AxiosResponse = yield call(searchBudgetList,action.payload)
    console.log("예산조회 response", response)
    yield put(budgetActions.GetSearchAccountBudgetList(response.data))
}catch(error){
    console.log(error)
}
}



function* watchFetchBudget() {
    yield takeLatest(budgetActions.PeriodListRequest.type, yearList)
    yield takeLatest(budgetActions.WorkPlaceRequest.type, workPlace)
    yield takeLatest(budgetActions.GetDetailDeptListRequest.type, getDeptList)
    yield takeLatest(budgetActions.callParentAccountListRequest.type, ParentAccountList)
    yield takeLatest(budgetActions.DetailAccountListRequest.type, DetailAccountList)
    yield takeLatest(budgetActions.BudgetRegisterRequest.type, BudgetRegister)
    yield takeLatest(budgetActions.SearchBudgetRequest.type, SearchBudget)
    
}


export function* budgetSagas() { //promise.all 과 비슷하다 데이터들을 동시에 가져올 수 있게끔 하는? 그런 비동기적 코드인 거 같음
    yield all([
        watchFetchBudget(),
    ]);
}

