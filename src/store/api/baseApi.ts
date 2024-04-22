import accountApi from 'api/accountApi';

//******************************* 2021-03-16 송화준 **************************************

//계정과목조회
export const searchAccountList = (action: any) => accountApi.get('/operate/parentaccountlist', {});

//계정세부과목조회
export const searchDetailAccount = (action: any) =>
  accountApi.get('/operate/detailaccountlist', {
    params: {
      code: action.params.code
    }
  });

export const searchJournalAccountList = (action: any) =>
  accountApi.get('/operate/jouranlaccountlist', {
    params: {
      fromDate: action.params.fromDate,
      toDate: action.params.toDate,
      parentAccountCode: action.params.parentAccountCode
    }
  });

//사업장조회
export const searchWorkPlace = (action: any) => accountApi.get('/operate/deptlist', {});

//회계기수번호 조회(날짜)
export const searchPeriodNo = () => accountApi.get('/settlement/periodNoList', {});
export const searchTPeriodNo = (action: any) =>
  accountApi.get('/settlement/tPeriodNoList', { params: { yearFirst: action.payload.yearFirst, yearLast: action.payload.yearLast } });

//부서조회
export const searchDeptList = (action: any) =>
  accountApi.get('/operate/detaildeptlist', {
    params: {
      workplaceCode: action.params.workplaceCode
    }
  });

//예산신청계정과목조회
export const searchBudget = (action: any) => accountApi.get('/operate/parentbudgetlist', {});

//예산신청세부계정과목조회
export const searchDetailBudget = (action: any) =>
  accountApi.get('/operate/detailbudgetlist', {
    params: {
      code: action.params.code
    }
  });
// 예산편성조회.
export const searchCurrentBudget = (action: any) =>
  accountApi.get('/budget/budget', {
    params: {
      deptCode: action.params.deptCode,
      workplaceCode: action.params.workplaceCode,
      budgetingCode: action.params.budgetingCode,
      accountPeriodNo: action.params.accountPeriodNo,
      accountInnerCode: action.params.accountInnerCode
    }
  });
// 두개 api주소 테스트용으로 바꿈.
export const searchPreBudget = (action: any) =>
  accountApi.get('budget/currentbudget', {
    params: {
      deptCode: action.params.deptCode,
      workplaceCode: action.params.workplaceCode,
      budgetingCode: action.params.budgetingCode,
      accountPeriodNo: action.params.accountPeriodNo,
      accountInnerCode: action.params.accountInnerCode
    }
  });

export const insertBudget = (action: any) =>
  accountApi.post('/budget/budgetlist', {
    deptCode: action.params.deptCode,
    workplaceCode: action.params.workplaceCode,
    accountPeriodNo: action.params.accountPeriodNo,
    accountInnerCode: action.params.accountInnerCode,
    budgetingCode: action.params.budgetingCode,
    m1Budget: action.params.m1Budget,
    m2Budget: action.params.m2Budget,
    m3Budget: action.params.m3Budget,
    m4Budget: action.params.m4Budget,
    m5Budget: action.params.m5Budget,
    m6Budget: action.params.m6Budget,
    m7Budget: action.params.m7Budget,
    m8Budget: action.params.m8Budget,
    m9Budget: action.params.m9Budget,
    m10Budget: action.params.m10Budget,
    m11Budget: action.params.m11Budget,
    m12Budget: action.params.m12Budget
  });

export const serachBudgetList = (action: any) =>
  accountApi.get('/budget/budgetlist', {
    budgetlist: {
      deptCode: action.params.deptCode,
      workplaceCode: action.params.workplaceCode,
      accountPeriodNo: action.params.accountPeriodNo,
      accountInnerCode: action.params.accountInnerCode,
      budgetingCode: '1',
      m1Budget: action.params.m1Budget,
      m2Budget: action.params.m2Budget,
      m3Budget: action.params.m3Budget,
      m4Budget: action.params.m4Budget,
      m5Budget: action.params.m5Budget,
      m6Budget: action.params.m6Budget,
      m7Budget: action.params.m7Budget,
      m8Budget: action.params.m8Budget,
      m9Budget: action.params.m9Budget,
      m10Budget: action.params.m10Budget,
      m11Budget: action.params.m11Budget,
      m12Budget: action.params.m12Budget
    }
  } as any);

export const searchCustomer = (action: any) => accountApi.get('/operate/customers', {});

export const searchCreditCard = (action: any) => accountApi.get('/operate/creditCard', {});

export const searchCode = (action: any) => accountApi.get('/base/detailcodelist', { params: action.params });
