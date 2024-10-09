import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    fixedBudgetList: [],
    workPlaceListName: [],
    deptDetailCodeName: [],
    accountCodeList: [],
    detailAccountList: [],
    searchAccountBudgetList: [],
};


const budgetSlice = createSlice({
    name: "budget",
    initialState,
    reducers: {
        PeriodListRequest(state) {
            console.warn('회계연도 요청')
        },
        FiexdPeriodList(state, action) { // response.data값이 action 에 들어간다.
            console.log("회계연도제발되게해주세욘");
            state.fixedBudgetList = action.payload
            console.log("스테이트픽스드버젯리시트", state.fixedBudgetList)
        },
        WorkPlaceRequest(state) {
            console.log("사업장명 요청")
        },
        workPlaceList(state, action) {
            console.log("사업장명 데이터값 ")
            state.workPlaceListName = action.payload
            console.log("workPlaceListName", state.workPlaceListName)
        },
        GetDetailDeptListRequest(state){
            console.log("부서명 데이터 요청중")
        },
        GetDetailDeptListSuccess(state,action){
            console.log("state업데이트",action.payload) //이거 undefined 뜬다.
            state.deptDetailCodeName = action.payload
        },
        callParentAccountListRequest(state){
            console.log("계정과목 요청중")
        },
        GetParentAccountList(state,action){
            console.log("state업데이트",action.payload)
            state.accountCodeList = action.payload
        },
        DetailAccountListRequest(state){
            console.log("계정상세선택 요청중")
        },
        GetDetailAccountList(state,action){
            console.log("state업데이트",action.payload)
            state.detailAccountList = action.payload
        },
        BudgetRegisterRequest(state){
            console.log("예산신청 등록중")
        },
        SearchBudgetRequest(state){
            console.log("예산조회 요청중")
        },
        GetSearchAccountBudgetList(state,action){
            console.log("스테이트 업데이트",action.payload)
            state.searchAccountBudgetList = action.payload
            console.log("----- state -----", state)
        }
    }
})

export const budgetActions = budgetSlice.actions
export default budgetSlice.reducer