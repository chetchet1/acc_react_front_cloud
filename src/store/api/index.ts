import accountApi from './accountApi';

// ================================전표================================
//전표 조회

export const selectSlip = (action: any) => accountApi.get('/posting/rangedsliplist', { params: action.payload });
//전표 삭제
export const deleteSlip = (action: any) => accountApi.delete('/posting/deleteSlip', { params: { slipNo: action.payload } });

//전표 수정
export const updateSlip = (action: any) => accountApi.put('/posting/updateSlip', action.payload);
//전표 등록
export const registerslip = (action: any) => accountApi.post('/posting/registerslip', action.payload);
// ================================분개================================
//분개 조회
export const searchJournal = (action: any) => accountApi.get('/posting/singlejournallist', { params: { slipNo: action.payload } });
//분개 삭제

export const deleteJournal = (action: any) => accountApi.delete('/posting/journalremoval', { params: { jourNo: action.payload } });
//분개 저장
export const saveJournal = (action: any) => accountApi.post('/posting/modifyJournal', action.payload);

//분개 수정
export const updateJournal = (action: any) => accountApi.put('/posting/updateJournalList', action.payload);

// ================================분개 상세================================
//분개 상세 추가
export const addJournalDetail = (action: any) => accountApi.get('/posting/journaldetailAdd', { params: { accountCode: action.payload } });
//분개 상세 조회
export const searchJournalDetail = (action: any) =>
  accountApi.get('/posting/journaldetaillist', {
    params: { journalNo: action.payload }
  });
//분개 상세 임시 저장
// ================================전표 승인================================
//전표 승인 요청
export const approvalSlipRequest = (action: any) => accountApi.patch('/posting/approvalSlipRequest', action.payload);
//승인요청 전표 조회
export const amSlipRequest = (action: any) => accountApi.get('/posting/approvalsliplist', { params: action.payload });
//승인요청 전표 분개 조회
export const amJournalRequest = (action: any) => accountApi.get('/posting/approvalJournalList', { params: { slipNo: action.payload } });
//전표 승인
export const updateAmSlip = (action: any) => accountApi.patch('/posting/approvalslip', action.payload);

export const hrAddSlip = (action: any) =>
  accountApi.post('/account/hrAddSlip', { slipData: action.payload.slipData }, { headers: { 'Content-Type': 'application/json' } });

export const getJournalNo = (action: any) =>
  accountApi.get('/account/getJournalDetailList', {
    params: {
      journalNo: action.params.journalNo
    }
  });

export const selectGeneralAccountLedger = (action: any) =>
  accountApi.get('/posting/generalLedgers', {
    params: {
      fromDate: action.params.fromDate,
      toDate: action.params.toDate,
      accountInnerCode: action.params.accountInnerCode
    }
  });

export const searchJournalDouble = (action: any) => accountApi.get('/posting/rangedjournallist', { params: action.payload });

export const selectNonCurrent = (action: any) =>
  accountApi.get('/posting/findCurrentAssetList', {
    params: {
      accountCode: action.params.accountCode,
      accountName: action.params.accountName
    }
  });

export const saveNonCurrent = (action: any) =>
  accountApi.post('/CurrentAsset/insertCurrentAsset', {
    params: action.params
  });

export const deleteNonCurrent = (action: any) =>
  accountApi.get('/CurrentAsset/deleteCurrentAsset', {
    params: { assetCode: action.param.assetCode }
  });

//자산 관리 리스트
export const searchCurrent = (action: any) => accountApi.get('/posting/assetlist', {});

//세부자산관리 리스트
export const searchAssetList = (action: any) =>
  accountApi.get('/posting/assetitemlist', {
    params: {
      parentsCode: action.params.parentsCode
    }
  });

export const searchAssetDta = (action: any) =>
  accountApi.get('/posting/assetDta', {
    params: {
      parentsCode: action.params.parentsCode
    }
  });

export const searchDept = (action: any) => accountApi.get('/operate/deptlist', {});
