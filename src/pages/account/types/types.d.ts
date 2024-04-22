export interface ColumnProps {
  id: string;
  label: string;
  minWidth?: any;
  align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
  format?: (value: Date | number) => string | boolean;
}

type JounalDataType = {
  customerCode: string;
  reportingDate: string;
  slipNo: string;
  accountCode: string;
  accountName: string;
  expenseReport: string;
  balanceDivision: string;
  leftDebtorPrice: string;
  rightCreditsPrice: string;
};

type JournalFoamColumnDefsType = {
  label?: string;
  id?: string;
  width?: number;
  valueFormatter?: string;
};

interface DetailTrialBalanceData {
  lev: number;
  accountInnerCode: string;
  debitsSum: number;
  exceptCashDebits: number;
  cashDebits: number;
  accountName: string;
  cashCredits: number;
  exceptCashCredits: number;
  creditsSum: number;
  valueFormatter?: any;
}

// 현금출납장에서 추가
type CashJournalDataType = {
  monthReportingDate: string;
  reportingDate: string;
  expenseReport: string;
  customerName: string;
  deposit: string;
  withdrawal: string;
  balance: string;
};
