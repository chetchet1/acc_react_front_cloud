/* eslint-disable prettier/prettier */

// 합계잔액시산표 
export interface ColumnPropsTotalTrialBalance {
    lev: number;
    accountName: string;
    accountInnerCode: string;
    debitsSumBalance: number;
    debitsSum: number;
    creditsSum: number;
    creditsSumBalance: number;
    code: string;
  }

  // 합계잔액시산표 그리드
  export interface ColumnProps {
    headerName: string,
    field: string,
    valueFormatter?: string,
    width?: number
  }

  // 회계기수
  export interface AccountPeriodNoProps{
      fiscalYear: string;
      accountPeriodNo: number;
      periodStartDate: string
      periodEndDate?: string;
  }

  