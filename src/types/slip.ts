export interface SlipProps {
  error: object | string | null;
  jounalList: object | string | string[];
  slipList: object;
  jounalDetail: object;
  isLoading: boolean;
  isDone: boolean;
  slipDateSuccess: any;
}

export type slipParam = {
  slipNo: any;
};

export type slipSearchParam = {
  startDate: string;
  endDate: string;
  slipStatus: string;
  isLoading?: any;
};

export type journalParam = {
  journalNo: any;
};
