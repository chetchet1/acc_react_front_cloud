export interface DetailTrialProps {
  detailTB: DetailTrialBalance[] | object;
  detailDate: detailDateType;
  error: object | string | null;
  choicedate: object;
  tailDate: object;
  dateParam: object | string;
  isLoading?: any;
  isDone?: any;
  detailDateSuccess?: any;
}

export type detailDateType = {
  periodNoList: [];
};
export type DetailTrialBalance = {
  accountInnerCode: any;
  accountName: any;
  cashCredits: any;
  cashDebits: any;
  creditsSum: any;
  creditsSumBalance: any;
  debitsSum: any;
  debitsSumBalance: any;
  exceptCashCredits: any;
  exceptCashDebits: any;
  lev: any;
  detailTrialBalanceList?: any;
};

export type DetailTrialBalanceDate = {
  accountPeriodNo?: any;
  month?: any;
  monthStartDate?: any;
  monthEndDate?: any;
  fiscalYear?: any;
  periodStartDate?: any;
  periodEndDate?: any;
};

export type ChoiceDate = {
  fiscalYear?: any;
  status?: any;
  month?: any;
  monthStartDate?: any;
  monthEndDate?: any;
};
export type dateParam = {
  fromDate?: any;
  toDate?: any;
};
