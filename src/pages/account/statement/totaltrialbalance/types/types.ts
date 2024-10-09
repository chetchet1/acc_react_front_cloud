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

  export interface ColumnProps {
    headerName: string,
    field: string,
    valueFormatter?: string,
    width?: number
  }