//고정자산
export type FixedAssetType = {
    accountCode: string;
    accountName: string;
    assetCode: string;
    assetName: string;
    acqDate: string;
    compStatus: string;
  };

//고정자산 상세
export type FixedAssetDetailType = {
    assetCode: string;
    acqCost: string;
    depMethod: string;
    initAccDepreciation: string;
    prevBookValue: string;
    usefulLife: string;
    depCompYear: string;
    dept: string;
    acqQty: string;
    incDecQty: string;
    remQty: string;
    depRate: string;
    month: string;
    genDepExpense: string;
    currAccDepreciation: string;
    currBookValue: string;
  };
  

export type FixedAssetColumnType = {
    width?: number | string;
    headerName: string;
    field: string;
    editable?: boolean;
    type?: string;
    valueOptions?: string[];
    key?: string;
    align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
    hide?: boolean;
  };

  export type selectType = {
    label: string;
    value: string;
  }

  export type DepreciationColumnType = {
    width?: number | string;
    headerName: string;
    field: string;
    editable?: boolean;
    type?: string;
    valueOptions?: string[];
    key?: string;
    align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
    hide?: boolean; 
  }

  export type DepreciationType = {
    accountCode: string;
    accountName: string;
    incDecExpense: string;
    endBalance: string;
    acqCost: string;
    initAccDepreciation: string;
    depExpense: string;
    resfund: string;
    genDepExpense: string;
    currBookValue: string;
  }

  export type PlanDataType = {
    status: string;
    planNo: string;
    planDate: string;
    fundCode: string;
    fundName: string;
    customerCode: string;
    customerName: string;
    expenseReport: string;
    price: string;
  }

  export type NoteType = {
    noteNo: string;
    journalNo: string;
    noteType: string;
    accountInnerCode: string;
    drawer: string;
    endorser: string;
    drawee: string;
    issuanceDate: string;
    maturityDate: string;
  }