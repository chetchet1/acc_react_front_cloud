export type IndignationType = {
  slipCheck?: string;
  journalNo: string;
  accountCode: string;
  accountName: string;
  customerCode: string;
  customerName: string;
  balanceDivision: string;
  leftDebtorPrice: string;
  rightCreditsPrice: string;
};

export type SlipType = {
  slipCheck: any;
  accountPeriodNo: string;
  slipNo: string;
  reportingDate: string;
  reportingEmpCode: string;
  expenseReport: string;
  approvalEmpCode: string;
  slipStatus: string;
  id: any;
};

export type SlipColumnType = {
  width?: number | string;
  headerName: string;
  field: string;
  editable?: boolean;
  type?: string;
  valueOptions?: string[];
  key?: string;
  align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
  hide?: boolean;
  headerAlign?: 'center';
};

export type GeneralColumnType = {
  headerName: string;
  field: string;
  valueFormatter?: string;
  width?: number;
};
