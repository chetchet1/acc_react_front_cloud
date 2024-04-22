import { createAction } from "@reduxjs/toolkit";

export const SEARCH_TEST_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_TEST';
export const SEARCH_TEST_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_TEST_SUCCESS';
export const SEARCH_TEST_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_TEST_FAILURE';

export const REMOVE_TEST_REQUEST='src/erp/account/Saga/Saga/REMOVE_TEST';
export const REMOVE_TEST_FAILURE='src/erp/account/Saga/Saga/REMOVE_TEST_FAILURE';

export const ADD_TEST_REQUEST='src/erp/account/Saga/Saga/ADD_TEST_REQUEST';

export const SEARCH_PERIOD_NO_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_PERIOD_NO';
export const SEARCH_PERIOD_NO_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_PERIOD_NO_SUCCESS';
export const SEARCH_PERIOD_NO_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_PERIOD_NO_FAILURE';

export const SEARCH_WORKPLACE_CODE_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_WORKPLACE_CODE';
export const SEARCH_WORKPLACE_CODE_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_WORKPLACE_CODE_SUCCESS';
export const SEARCH_WORKPLACE_CODE_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_WORKPLACE_CODE_FAILURE';

export const SEARCH_DEPT_CODE_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_DEPT_CODE';
export const SEARCH_DEPT_CODE_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_DEPT_CODE_SUCCESS';
export const SEARCH_DEPT_CODE_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_DEPT_CODE_FAILURE';

export const SEARCH_BUDGET_STATUS_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_BUDGET_STATUS';
export const SEARCH_BUDGET_STATUS_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_BUDGET_STATUS_SUCCESS';
export const SEARCH_BUDGET_STATUS_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_BUDGET_STATUS_FAILURE';

export const SEARCH_COMPARISON_BUDGET_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_COMPARISON_BUDGET';
export const SEARCH_COMPARISON_BUDGET_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_COMPARISON_BUDGET_SUCCESS';
export const SEARCH_COMPARISON_BUDGET_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_COMPARISON_BUDGET_FAILURE';

export const setDeptCodeAction = createAction(SEARCH_DEPT_CODE_REQUEST);

const initialState = {
    error: '',
    periodNoList:[],
    testList:[],
    deptList:[],
    detailDeptList:[],
    parentBudget:[],
    comparisonBudget:[],
};


const BudgetReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SEARCH_TEST_SUCCESS:
            console.log("찍히니? ^^.....");
            console.log(action.payload);
            return {
                ...state,
                testList: action.payload
            };

        case SEARCH_TEST_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case REMOVE_TEST_REQUEST:
            console.log("리무브 할때 리덕스:")
            console.log(action.params);
            let deleteTest: any=[];
            const deletedata = JSON.parse(action.params.deleteData);
            console.log(deletedata);
            for(let i=0; i<deletedata.length; i++){
                deleteTest.push(deletedata[i].id);
            }
            console.log("할당됨???")
            console.log(deleteTest);
            console.log()
            return {
                ...state,
                testList:state.testList.filter(list=>!deleteTest.includes(list.id))
            };

        case REMOVE_TEST_FAILURE:
            return {
                ...state,
                error: action.error
            }

        case ADD_TEST_REQUEST:
            return {
                ...state,
                testList: action.params.newRow.concat(state.testList)
            }

        case SEARCH_PERIOD_NO_SUCCESS:
            return {
                ...state,
                periodNoList: action.payload.periodNoList
            };
        case SEARCH_PERIOD_NO_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case SEARCH_WORKPLACE_CODE_SUCCESS:
            console.log("제발ㄹㄹㄹㄹㄹ");
            console.log(action.payload);
            return {
                ...state,
                deptList: action.payload
            };

        case SEARCH_WORKPLACE_CODE_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case SEARCH_DEPT_CODE_SUCCESS:
            console.log("부서부서부서부서");
            console.log(action.payload);
            return {
                ...state,
                detailDeptList: action.payload.detailDeptList
            };

        case SEARCH_DEPT_CODE_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case SEARCH_BUDGET_STATUS_SUCCESS:
            console.log("예산조회 날려지나욥!!");
            console.log(action.payload);
            return {
                ...state,
                parentBudget: action.payload,
                comparisonBudget:[] //하위그리드 초기화
            };

        case SEARCH_BUDGET_STATUS_FAILURE:
            return {
                ...state,
                error: action.error
            };


        case SEARCH_COMPARISON_BUDGET_SUCCESS:
            console.log("예산대비 실적조회 상세");
            console.log(action.payload.RESULT);
            return {
                ...state,
                comparisonBudget: action.payload.RESULT,
            };


        case SEARCH_COMPARISON_BUDGET_FAILURE:
            return {
                ...state,
                error: action.error
            };



        default:
            return state;
    }
};

export default BudgetReducer;