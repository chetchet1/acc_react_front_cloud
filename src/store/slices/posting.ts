import { createAction } from '@reduxjs/toolkit';

//========================================= 2020-09-04 일반전표  조진주 시작 ==============================================
export const ADD_SLIP = 'src/erp/account/Saga/Saga/ADD_SLIP'; // 전표 추가

export const SELECT_SLIP_START = 'src/erp/account/Saga/Saga/SELECT_SLIP'; //전표 조회
export const SELECT_SLIP_SUCCESS = 'src/erp/account/Saga/Saga/SELECT_SLIP_SUCCESS';
export const SELECT_SLIP_FAILURE = 'src/erp/account/Saga/Saga/SELECT_SLIP_FAILURE';

export const DELETE_SLIP_START = 'src/erp/account/Saga/Saga/DELETE_SLIP'; //전표 삭제
export const DELETE_SLIP_SUCCESS = 'src/erp/account/Saga/Saga/DELETE_SLIP_SUCCESS'; //전표 삭제 성공
export const DELETE_SLIP_FAILURE = 'src/erp/account/Saga/Saga/DELETE_SLIP_FAILURE';

export const UPDATE_SLIP_START = 'src/erp/account/Saga/Saga/UPDATE_SLIP'; //전표 UPDATE
export const UPDATE_SLIP_SUCCESS = 'src/erp/account/Saga/Saga/UPDATE_SLIP_SUCCESS';
export const UPDATE_SLIP_FAILURE = 'src/erp/account/Saga/Saga/UPDATE_SLIP_FAILURE';

export const INSERT_SLIP_START = 'src/erp/account/Saga/Saga/INSERT_SLIP'; // 전표 insert
export const INSERT_SLIP_SUCCESS = 'src/erp/account/Saga/Saga/INSERT_SLIP_SUCCESS';
export const INSERT_SLIP_FAILURE = 'src/erp/account/Saga/Saga/INSERT_SLIP_FAILURE';

export const SELECT_JOURNAL_START = 'src/erp/account/Saga/Saga/SELECT_JOURNAL'; //분개 조회
export const SELECT_JOURNAL_SUCCESS = 'src/erp/account/Saga/Saga/SELECT_JOURNAL_SUCCESS';
export const SELECT_JOURNAL_FAILURE = 'src/erp/account/Saga/Saga/SELECT_JOURNAL_FAILURE';

export const INSERT_JOURNAL = 'src/erp/account/Saga/Saga/INSERT_JOURNAL'; //분개 추가
export const INSERT_ACCOUNT = 'src/erp/account/Saga/Saga/INSERT_ACCOUNT'; //계정 추가
export const INSERT_CUSTOMER = 'src/erp/account/Saga/Saga/INSERT_CUSTOMER'; //거래처 추가
export const UPDATE_JOURNAL_PRICE = 'src/erp/account/Saga/Saga/UPDATE_JOURNAL_PRICE'; //분개 금액 추가

export const DELETE_JOURNAL_START = 'src/erp/account/Saga/Saga/DELETE_JOURNAL'; //분개삭제
export const DELETE_JOURAL_FAILURE = 'src/erp/account/Saga/Saga/DELETE_JOURAL_FAILURE';

export const SAVE_JOURNAL_START = 'src/erp/account/Saga/Saga/SAVE_JOURNAL'; //분개저장 INSERT journalDescription
export const SAVE_JOURNAL_FAILURE = 'src/erp/account/Saga/Saga/SAVE_JOURNAL_FAILURE';

export const UPDATE_JOURNAL_START = 'src/erp/account/Saga/Saga/UPDATE_JOURNAL'; //분개저장 UPDATE
export const UPDATE_JOURNAL_SUCCESS = 'src/erp/account/Saga/Saga/UPDATE_JOURNAL_SUCCESS';
export const UPDATE_JOURNAL_FAILURE = 'src/erp/account/Saga/Saga/UPDATE_JOURNAL_FAILURE';

export const ADD_JOURNAL_DETAIL = 'src/erp/account/Saga/Saga/ADD_JOURNAL_DETAIL'; //분개상세 추가
export const ADD_JOURNAL_DETAIL_SUCCESS = 'src/erp/account/Saga/Saga/ADD_JOURNAL_DETAIL_SUCCESS'; //분개상세 추가성공
export const ADD_JOURNAL_DETAIL_FAILURE = 'src/erp/account/Saga/Saga/ADD_JOURNAL_DETAIL_FAILURE'; //분개상세 추가실패

export const SELECT_JOURNAL_DETAIL_START = 'src/erp/account/Saga/Saga/SELECT_JOURNAL_DETAIL'; //분개상세 조회
export const SELECT_JOURNAL_DETAIL_SUCCESS = 'src/erp/account/Saga/Saga/SELECT_JOURNAL_DETAIL_SUCCESS';
export const SELECT_JOURNAL_DETAIL_FAILURE = 'src/erp/account/Saga/Saga/SELECT_JOURNAL_DETAIL_FAILURE';

export const SAVE_JOURNAL_DETAIL_START = 'src/erp/account/Saga/Saga/SAVE_JOURNAL_DETAIL'; //분개상세 임시 저장
export const SAVE_JOURNAL_DETAIL_SUCCESS = 'src/erp/account/Saga/Saga/SAVE_JOURNAL_DETAIL_SUCCESS'; //분개상세 저장 성공
export const SAVE_JOURNAL_DETAIL_FAILURE = 'src/erp/account/Saga/Saga/SAVE_JOURNAL_DETAIL_FAILURE';

//========================================= 2020-09-04 일반전표  조진주 끝 ==============================================
//인사전표저장
export const ADD_SALARY_SLIP_REQUEST = 'src/erp/account/Saga/Saga/ADD_HRSLIP';
export const ADD_SALARY_SLIP_SUCCESS = 'src/erp/account/Saga/Saga/ADD_HRSLIP_SUCCESS';
export const ADD_SALARY_SLIP_FAILURE = 'src/erp/account/Saga/Saga/ADD_HRSLIP_FAILURE';

//========================= 일반전표 2020-09-04 조편백 시작 ======================//
export const addSlip = createAction(ADD_SLIP); // 전표추가

export const selectSlipStart = createAction(SELECT_SLIP_START); //전표조회
export const selectSlipSuccess = createAction(SELECT_SLIP_SUCCESS);
export const selectSlipFailure = createAction(SELECT_SLIP_FAILURE);

export const insertSalarySlipStart = createAction(ADD_SALARY_SLIP_REQUEST);
export const insertSalarySlipSuccess = createAction(ADD_SALARY_SLIP_SUCCESS);
export const insertSalarySlipFailure = createAction(ADD_SALARY_SLIP_FAILURE);

export const deleteSlip = createAction(DELETE_SLIP_START); //전표삭제
export const deleteSlipSuccess = createAction(DELETE_SLIP_SUCCESS); //전표삭제성공
export const deleteSlipFailure = createAction(DELETE_SLIP_FAILURE);

export const updateSlip = createAction(UPDATE_SLIP_START); //전표 UPDATE
export const updateSlipSuccess = createAction(UPDATE_SLIP_SUCCESS);
export const updateSlipFailure = createAction(UPDATE_SLIP_FAILURE);

export const insertSlip = createAction(INSERT_SLIP_START); //전표 INSERT
export const insertSlipSuccess = createAction(INSERT_SLIP_SUCCESS);
export const insertSlipFailure = createAction(INSERT_SLIP_FAILURE);

export const selectJournalStart = createAction(SELECT_JOURNAL_START); //분개조회
export const selectJournalSuccess = createAction(SELECT_JOURNAL_SUCCESS);
export const selectJournalFailure = createAction(SELECT_JOURNAL_FAILURE);

export const insertJournalRow = createAction(INSERT_JOURNAL); //분개추가

export const deleteJournal = createAction(DELETE_JOURNAL_START); //분개삭제
export const deleteJournalFailure = createAction(DELETE_JOURAL_FAILURE);

export const saveJournal = createAction(SAVE_JOURNAL_START); //분개저장 insert
export const saveJournalFailure = createAction(SAVE_JOURNAL_FAILURE);

export const updateJournal = createAction(UPDATE_JOURNAL_START); //분개저장 update
export const updateJournalSuccess = createAction(UPDATE_JOURNAL_SUCCESS);
export const updateJournalFailure = createAction(UPDATE_JOURNAL_FAILURE);

export const searchJournalDetailStart = createAction(SELECT_JOURNAL_DETAIL_START); //분개상세조회
export const searchJournalDetailSuccess = createAction(SELECT_JOURNAL_DETAIL_SUCCESS);
export const searchJournalDetailFailure = createAction(SELECT_JOURNAL_DETAIL_FAILURE);
export const addJournalDetail = createAction(ADD_JOURNAL_DETAIL);

export const saveJournalDetailStart = createAction(SAVE_JOURNAL_DETAIL_START); //분개상세임시 저장
export const saveJournalDetailSuccess = createAction(SAVE_JOURNAL_DETAIL_SUCCESS); //분개상세저장 성공
export const saveJournalDetailFailure = createAction(SAVE_JOURNAL_DETAIL_FAILURE); //분개상세저장 실패

//========================= 일반전표 2020-09-04 조편백 끝 ======================//

//*****************************전표승인*****************************/
//전표승인요청
export const APPROVAL_SLIP_REQUEST = 'src/erp/account/Saga/Saga/APPROVAL_SLIP_REQUEST';
export const APPROVAL_SLIP_SUCCESS = 'src/erp/account/Saga/Saga/APPROVAL_SLIP_SUCCESS';
export const APPROVAL_SLIP_FAILURE = 'src/erp/account/Saga/Saga/APPROVAL_SLIP_FAILURE';
//전표승인조회(전표)
export const SEARCH_AM_SLIP_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_AM_SLIP';
export const SEARCH_AM_SLIP_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_AM_SLIP_SUCCESS';
export const SEARCH_AM_SLIP_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_AM_SLIP_FAILURE';
//전표승인조회(분개)
export const SEARCH_AM_JOURNAL_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_AM_JOURNAL';
export const SEARCH_AM_JOURNAL_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_AM_JOURNAL_SUCCESS';
export const SEARCH_AM_JOURNAL_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_AM_JOURNAL_FAILURE';
//승인저장
export const UPDATE_AM_SLIP_REQUEST = 'src/erp/account/Saga/Saga/UPDATE_AM_SLIP';
export const UPDATE_AM_SLIP_SUCCESS = 'src/erp/account/Saga/Saga/UPDATE_AM_SLIP_SUCCESS';
export const UPDATE_AM_SLIP_FAILURE = 'src/erp/account/Saga/Saga/UPDATE_AM_SLIP_FAILURE';

export const approvalSlipRequest = createAction(APPROVAL_SLIP_REQUEST);
export const approvalSlipSuccess = createAction(APPROVAL_SLIP_SUCCESS);
export const approvalSlipFailute = createAction(APPROVAL_SLIP_FAILURE);

export const searchAmSlipStart = createAction(SEARCH_AM_SLIP_REQUEST);
export const searchAmSlipSuccess = createAction(SEARCH_AM_SLIP_SUCCESS);
export const searchAmSlipFailure = createAction(SEARCH_AM_SLIP_FAILURE);

export const searchAmJournalStart = createAction(SEARCH_AM_JOURNAL_REQUEST);
export const searchAmJournalSuccess = createAction(SEARCH_AM_JOURNAL_SUCCESS);
export const searchAmJournalFailure = createAction(SEARCH_AM_JOURNAL_FAILURE);

export const updateAmSlipStart = createAction(UPDATE_AM_SLIP_REQUEST);
export const updateAmSlipSuccess = createAction(UPDATE_AM_SLIP_SUCCESS);
export const updateAmSlipFailure = createAction(UPDATE_AM_SLIP_FAILURE);

//***************** 2020-08-28 정대현 추가 *****************
export const SET_JOURNAL_NO_REQUEST = 'src/erp/account/Saga/Saga/SET_JOURNAL_NO';
export const SET_JOURNAL_NO_SUCCESS = 'src/erp/account/Saga/Saga/SET_JOURNAL_NO_SUCCESS';
export const SET_JOURNAL_NO_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_PERIOD_NO_FAILURE';
//***************** 2020-08-28 정대현 추가 여기까지*****************
// 총계정원장
export const SELECT_GENERAL_ACCOUNT_LEDGER_START = 'src/erp/account/Saga/Saga/SELECT_GENERAL_ACCOUNT_LEDGER';
export const SELECT_GENERAL_ACCOUNT_LEDGER_SUCCESS = 'src/erp/account/Saga/Saga/SELECT_GENERAL_ACCOUNT_LEDGER_SUCCESS';
export const SELECT_GENERAL_ACCOUNT_LEDGER_FAILURE = 'src/erp/account/Saga/Saga/SELECT_GENERAL_ACCOUNT_LEDGER_FAILURE';

//분개장 복식부기 조회
export const SEARCH_JOURNAL_DOUBLE_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_JOURNAL_DOUBLE';
export const SEARCH_JOURNAL_DOUBLE_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_JOURNAL_DOUBLE_SUCCESS';
export const SEARCH_JOURNAL_DOUBLE_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_JOURNAL_DOUBLE_FAILURE';

export const setJournalNoStart = createAction(SET_JOURNAL_NO_REQUEST);
export const setJournalNoSuccess = createAction(SET_JOURNAL_NO_SUCCESS);
export const setJournalNoFailure = createAction(SET_JOURNAL_NO_FAILURE);

export const selectGeneralAccountLedgerStart = createAction(SELECT_GENERAL_ACCOUNT_LEDGER_START);
export const selectGeneralAccountLedgerSuccess = createAction(SELECT_GENERAL_ACCOUNT_LEDGER_SUCCESS);
export const selectGeneralAccountLedgerFailure = createAction(SELECT_GENERAL_ACCOUNT_LEDGER_FAILURE);

export const searchJournalDoubleStart = createAction(SEARCH_JOURNAL_DOUBLE_REQUEST);
export const searchJournalDoubleSuccess = createAction(SEARCH_JOURNAL_DOUBLE_SUCCESS);
export const searchJournalDoubleFailure = createAction(SEARCH_JOURNAL_DOUBLE_FAILURE);

//고정자산리스트 조회  삭제 수정 박민호 ==================================
export const SEARCH_NON_CURRENT_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_NON_CURRENT';
export const SEARCH_NON_CURRENT_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_NON_CURRENT_SUCCESS';
export const SEARCH_NON_CURRENT_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_NON_CURRENT_FAILURE';
export const SAVE_NON_CURRENT_START = 'src/erp/account/Saga/Saga/SAVE_NON_CURRENT';
export const SAVE_NON_CURRENT_FAILURE = 'src/erp/account/Saga/Saga/SAVE_NON_CURRENT_FAILURE';
export const DELETE_NON_CURRENT_START = 'src/erp/account/Saga/Saga/DELETEH_NON_CURRENT';
export const DELETE_NON_CURRENT_SUCCESS = 'src/erp/account/Saga/Saga/DELETEH_NON_CURRENT_SUCCES';
export const DELETE_NON_CURRENT_FAILURE = 'src/erp/account/Saga/Saga/DELETEH_NON_CURRENT_FAILURE';
//=================자산리스트 조회 저장 삭제 수정 박민호=========================
export const SEARCH_CURRENT_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_CURRENT';
export const SEARCH_CURRENT_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_CURRENT_SUCCESS';
export const SEARCH_CURRENT_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_CURRENT_FAILURE';

//=================세부자산관리 리스트 조회 저장 삭제 수정 ===========================
export const SEARCH_ASSET_LIST_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_ASSET_LIST';
export const SEARCH_ASSET_LIST_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_ASSET_LIST_SUCCESS';
export const SEARCH_ASSET_LIST_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_ASSET_LIST_FAILURE';

export const SEARCH_ASSET_DTA_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_ASSET_DTA';
export const SEARCH_ASSET_DTA_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_ASSET_DTA_SUCCESS';
export const SEARCH_ASSET_DTA_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_ASSET_DTA_FAILURE';

//*************************** 부서정보 리스트 *******************************
export const SEARCH_DEPT_LIST_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_DEPT_LIST';
export const SEARCH_DEPT_LIST_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_DEPT_LIST_SUCCESS';
export const SEARCH_DEPT_LIST_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_DEPT_LIST_FAILURE';

//-----------박미노 고정자산리스트 조회 저장 삭제 수정---------------------------
export const selectNonCurrentAssetStart = createAction(SEARCH_NON_CURRENT_REQUEST);
export const selectNonCurrentAssetSuccess = createAction(SEARCH_NON_CURRENT_SUCCESS);
export const selectNonCurrentAssetFailure = createAction(SEARCH_NON_CURRENT_FAILURE);
export const saveNonCurrentAssetStart = createAction(SAVE_NON_CURRENT_START);
export const saveNonCurrentAssetFailure = createAction(SAVE_NON_CURRENT_FAILURE);
export const deleteNonCurrentAssetStart = createAction(DELETE_NON_CURRENT_START);
export const deleteNonCurrentAssetSuccess = createAction(DELETE_NON_CURRENT_SUCCESS);
export const deleteNonCurrentAssetFailure = createAction(DELETE_NON_CURRENT_FAILURE);

const initialState = {
  slipFormList: [], //==== 2020-09-05 조편백 추가 =======
  journalList: [],
  journalDetailList: [],
  accountList: [],
  approvalSlipList: [],
  error: '',
  approvalJournalList: [],
  slipNo: '',
  isLoading: false,
  generalAccountLedgerList: [],
  journalDoubleList: [],
  nonCurrentAsset: [],
  nonCurrentAsset1: [],
  assetList: [],
  detailAssetList: [],
  assetDta: [],
  deptList: [],
  tmpJournalDetailList: ''
};
const initialslipFormList = {
  accountPeriodNo: '',
  approvalDate: '',
  approvalEmpCode: '',
  authorizationStatus: null,
  balanceDivision: null,
  deptCode: '',
  deptName: null,
  expenseReport: '',
  id: '',
  positionCode: null,
  reportingDate: '',
  reportingEmpCode: 'admin',
  reportingEmpName: '',
  slipNo: 'new',
  slipStatus: '',
  slipType: '',
  status: '작성중'
};

const initialJournalList = {
  accountCode: '',
  accountName: '',
  accountPeriodNo: '',
  balanceDivision: '',
  customerCode: '',
  customerName: null,
  deptCode: null,
  id: '',
  journalDetailList: [],
  journalNo: '',
  leftDebtorPrice: '',
  price: null,
  rightCreditsPrice: '',
  slipNo: '',
  status: ''
};

// const initialJournalDetailList = {
//   journalDetailNo: '',
//   accountControlName: '',
//   accountControlType: '',
//   journalDescription: ''
// };

const AccountReducer = (state = initialState, action: any) => {
  // 위에서 만든 액션을 넣어 준다.
  switch (action.type) {
    //========================================= 2020-09-05 일반전표 조편백 ================================
    //====================전표====================
    case ADD_SLIP:
      console.log(action.payload);
      return {
        ...state,
        slipFormList: [
          {
            ...initialslipFormList,
            accountPeriodNo: action.payload.accountPeriodNo,
            reportingDate: action.payload.reportingDate
          }
        ].concat(state.slipFormList),
        journalList: [
          {
            ...initialJournalList,
            journalNo: 'new 차변',
            balanceDivision: '차변',
            leftDebtorPrice: '0',
            slipNo: 'new'
          },
          {
            ...initialJournalList,
            journalNo: 'new 대변',
            balanceDivision: '대변',
            rightCreditsPrice: '0',
            slipNo: 'new'
          }
        ]
      };
    case SELECT_SLIP_START:
      console.log('날짜 조회 성공', action);
      console.log(action.payload);
      return {
        ...state,
        slipFormList: [], //전표그리드 초기화
        journalList: [],
        journalDetailList: []
      };
    case SELECT_SLIP_SUCCESS: //전표조회성공
      console.log('SELECT_SLIP_SUCCESS');
      console.log(action);
      return {
        ...state,
        slipFormList: action.payload,
        journalList: [], //분개 값비움
        journalDetailList: [], //분개상세 값비움
        accountList: [] //코드 다이알로그 값비움
      };
    case SELECT_SLIP_FAILURE: //전표조회 실패
      return {
        ...state,
        error: action.payload
      };
    case DELETE_SLIP_SUCCESS: //전표삭제 성공
      console.log('delete slip');
      return {
        ...state,
        slipFormList: [],
        journalList: [], //분개 그리드 초기화
        journalDetailList: [] //분개상세 그리드 초기화
      };
    case DELETE_SLIP_FAILURE: //전표삭제 실패
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_SLIP_SUCCESS: //전표 UPdate
      return {
        ...state,
        slipFormList: [],
        journalList: [],
        journalDetailList: []
      };
    case UPDATE_SLIP_FAILURE: //전표 UPdate
      return {
        ...state,
        error: action.payload
      };
    case INSERT_SLIP_START:
      console.log(action.payload);
      return {
        ...state
      };
    case INSERT_SLIP_SUCCESS:
      return {
        ...state,
        slipFormList: [],
        journalList: [], //분개 그리드 초기화
        journalDetailList: [] //분개상세 그리드 초기화
      };
    case INSERT_SLIP_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    //==================분개====================
    case SELECT_JOURNAL_SUCCESS: //분개조회 성공
      console.log(action.payload);
      return {
        ...state,
        journalList: action.payload,
        journalDetailList: [] //분개상세 값비움
      };

    case SELECT_JOURNAL_FAILURE: //분개조회실패
      return {
        ...state,
        error: action.payload
      };
    case INSERT_JOURNAL: // 분개 추가
      return {
        ...state,
        journalList: [
          {
            ...initialJournalList,
            journalNo: action.payload
          }
        ].concat(state.journalList)
      };
    case INSERT_ACCOUNT: //분개 계정 추가
      console.log(state.journalList);
      console.log(action.params.selecJour); //  넘어오는 데이터 -- object타입
      return {
        ...state,
        journalList: [
          {
            ...action.params.selecJour,
            accountCode: action.params.accountCode,
            accountName: action.params.accountName
          }
        ].concat(action.params.journalData)
      };
    case INSERT_CUSTOMER:
      console.log(action.params.customerCode);
      console.log(action.params.customerName);
      return {
        ...state,
        journalList: [
          {
            ...action.params.selecJour,
            customerCode: action.params.customerCode,
            customerName: action.params.customerName
          }
        ].concat(action.params.journalData)
      };
    case UPDATE_JOURNAL_PRICE:
      return {
        ...state,
        journalList: [action.params.selecJour].concat(action.params.journalData)
      };
    case DELETE_JOURNAL_START:
      console.log('delete journal');
      console.log(state);
      return {
        ...state,
        journalList: [],
        journalDetailList: []
      };
    case DELETE_JOURAL_FAILURE: //분개삭제실패
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_JOURNAL_START:
      console.log(action.payload);
      return {
        ...state
      };
    case UPDATE_JOURNAL_SUCCESS: //분개 UPDATE 성공
      return {
        ...state,
        journalList: [], //분개 초기화
        journalDetailList: [] //분개상세 초기화
      };
    case UPDATE_JOURNAL_FAILURE: //분개저장 UPDATE 실패
      return {
        ...state,
        error: action.payload
      };
    case SAVE_JOURNAL_START:
      console.log(action.payload);
      return {
        ...state
      };
    case SAVE_JOURNAL_FAILURE: //분개저장 INSERT 실패
      return {
        ...state,
        error: action.payload
      };
    //==================분개상세====================
    case ADD_JOURNAL_DETAIL_SUCCESS: //분개상세 추가 성공
      return {
        ...state,
        journalDetailList: action.payload
      };
    case ADD_JOURNAL_DETAIL_FAILURE: //분개상세 추가 실패
      return {
        ...state,
        error: action.payload
      };
    case SELECT_JOURNAL_DETAIL_SUCCESS: //분개상세 조회 성공
      return {
        ...state,
        journalDetailList: action.payload
      };
    case SELECT_JOURNAL_DETAIL_FAILURE: //분개상세 조회 실패
      return {
        ...state,
        error: action.payload
      };
    case SAVE_JOURNAL_DETAIL_START:
      console.log(action.params.selecJour);
      console.log(action.params.journalDetailList);
      return {
        ...state,
        journalList: [
          {
            ...action.params.selecJour,
            journalDetailList: action.params.journalDetailList
          }
        ].concat(action.params.journalData),
        journalDetailList: action.params.journalDetailList
      };

    case ADD_SALARY_SLIP_SUCCESS:
      return {
        ...state,
        slipNo: action.data.slipNo
      };

    //==================전표승인====================
    //전표 승인 요청
    case APPROVAL_SLIP_REQUEST:
      return {
        ...state,
        slipFormList: [],
        journalList: [], //분개 그리드 초기화
        journalDetailList: [] //분개상세 그리드 초기화
      };
    case APPROVAL_SLIP_FAILURE:
      return {
        ...state,
        error: action.error
      };
    //전표승인 전표조회
    case SEARCH_AM_SLIP_SUCCESS:
      return {
        ...state,
        approvalSlipList: action.payload
      };
    case SEARCH_AM_SLIP_FAILURE:
      return {
        ...state,
        error: action.error
      };
    //전표승인 분개조회
    case SEARCH_AM_JOURNAL_SUCCESS:
      console.log('또뭐가문젠데');
      console.log(action.payload);
      return {
        ...state,
        approvalJournalList: action.payload
      };
    case SEARCH_AM_JOURNAL_FAILURE:
      return {
        ...state,
        error: action.error
      };
    //전표 승인 (성공)
    case UPDATE_AM_SLIP_SUCCESS:
      return {
        ...state,
        approvalSlipList: [],
        approvalJournalList: []
      };
    // 전표승인  (실패)
    case UPDATE_SLIP_FAILURE:
      return {
        ...state,
        error: action.error
      };

    // 기수번호 조회
    case SET_JOURNAL_NO_SUCCESS:
      console.log('SET_JOURNAL_NO_SUCCESS');
      console.log(action);
      return {
        ...state,
        journalDetailList: action.payload
      };
    case SET_JOURNAL_NO_FAILURE:
      return {
        ...state,
        journalDetailList: action.payload
      };
    //========총계정원장===============
    // case SELECT_GENERAL_ACCOUNT_LEDGER_START:
    //     console.log(action.params.fromDate);
    //     console.log(action.params.toDate);
    //     console.log(action.params.accountInnerCode);
    //     return {
    //         ...state,
    //         isLoading: true
    //     };
    case SELECT_GENERAL_ACCOUNT_LEDGER_START:
      console.log('이것도 잡히나?');
      return {
        ...state,
        generalAccountLedgerList: []
      };
    case SELECT_GENERAL_ACCOUNT_LEDGER_SUCCESS: //총계정원장 조회 성공
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        generalAccountLedgerList: action.payload
      };
    case SELECT_GENERAL_ACCOUNT_LEDGER_FAILURE: //전표조회 실패
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    // 분개장 복식부기 조회
    case SEARCH_JOURNAL_DOUBLE_SUCCESS:
      console.log('왜또');
      console.log(action.payload);
      return {
        ...state,
        journalList: action.payload
      };
    case SEARCH_JOURNAL_DOUBLE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    // 고정자산 리스트 조회 저장 박민호
    case SEARCH_NON_CURRENT_SUCCESS:
      console.log('>?>>>', action.payload);
      return {
        ...state,
        findCurrentAssetList: action.payload.findCurrentAssetList
      };
    case SEARCH_NON_CURRENT_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case SAVE_NON_CURRENT_START:
      return {
        ...state,
        nonCurrentAsset1: action.payload
      };
    case SAVE_NON_CURRENT_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case DELETE_NON_CURRENT_SUCCESS:
      return {
        ...state,
        nonCurrentAsset: []
      };
    case DELETE_NON_CURRENT_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case SEARCH_CURRENT_SUCCESS:
      return {
        ...state,
        assetList: action.payload
      };
    case SEARCH_CURRENT_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case SEARCH_ASSET_LIST_SUCCESS:
      return {
        ...state,
        detailAssetList: action.payload
      };
    case SEARCH_ASSET_LIST_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case SEARCH_ASSET_DTA_SUCCESS:
      return {
        ...state,
        assetDta: action.payload
      };
    case SEARCH_ASSET_DTA_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case SEARCH_DEPT_LIST_SUCCESS:
      return {
        ...state,
        deptList: action.payload
      };
    case SEARCH_DEPT_LIST_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
export default AccountReducer;
//********************************** 2021-02-24 이은기 **********************************
