export interface ColumnPropsBudget {
  label: string;
  id: number;
}

export interface ModalPropsBudget {
  headerName:  string;
  field: string;
  width?: number;
}

export interface BudgetColumnDefType {
  headerName: string;
  field: string;
  sort?: any;
  width: number;
  groupId?: string; 
  align?: string;
  textAlign?: string;
};

export interface BudgetGroupingColumnDefType {
  headerName: string;
  field: string;
  sort?: any;
  width: number;
  align?: string;
  textAlign?: string;
  groupId?: string; 
  children?: ColumnField[]
};

export type ColumnField = {
  field: string;
};

export interface ColumnPropsFormulation {
  headerName:string;
  field:string;
  align?:string;
  width?:number;
  textAlign?:string
}

export interface PeriodDef{
  accountPeriodNo : number;
  fiscalYear : number;
  periodEndDate : any;
  periodStartDate : any;
  status : string;
  workplaceCode? : any
}

export interface WorkPlaceDef{
  workplaceCode : string;
  workplaceName : string;
}
export interface DetailDeptDef{
  detailDeptList : []
  workplaceCode: string;
  deptCode:string;
  workplaceName: string;
  deptName:string;
  companyCode:string;
}


export interface MonthBudget{
deptCode?: string;
workplaceCode?: string;
accountPeriodNo?: string;
accountInnerCode?:string;
budgetingCode?: string;
m1Budget?: string;
m2Budget?: string;
m3Budget?: string;
m4Budget?: string;
m5Budget?: string;
m6Budget?: string;
m7Budget?: string;
m8Budget?: string;
m9Budget?: string;
m10Budget?: string;
m11Budget?: string;
m12Budget?: string;
}