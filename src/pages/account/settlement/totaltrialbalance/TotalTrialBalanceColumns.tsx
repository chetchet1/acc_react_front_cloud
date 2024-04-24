import { GridColDef } from '@mui/x-data-grid';
import { ColumnProps } from './types/types';

type TotalTrialBalanceColumnType = GridColDef<any, any>; // <any, any> ? <string, string> ??

// 합계잔액시산표 그리드 세팅
 export const totalTrialBalanceColumns: TotalTrialBalanceColumnType[] = [
	{ width: 250, headerName: '계정 과목', field: 'accountName', align: 'center', headerAlign: 'center' },
	{ width: 250, headerName: '차변 합계', field: 'debitsSum', valueFormatter: (params: any)=> Math.floor(params.value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원", align: 'center', headerAlign: 'center' },
	{ width: 250, headerName: '차변 잔액', field: 'debitsSumBalance', valueFormatter: (params: any)=>  Math.floor(params.value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원", align: 'center', headerAlign: 'center' },
	{ width: 250, headerName: '대변 합계', field: 'creditsSum', valueFormatter: (params: any)=> Math.floor(params.value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원", align: 'center', headerAlign: 'center' },
	{ width: 250, headerName: '대변 잔액', field: 'creditsSumBalance', valueFormatter: (params: any)=>Math.floor(params.value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원", align: 'center', headerAlign: 'center' },
]

  // 회계기수 모달 세팅
 export const accountPeriodListColumns: ColumnProps[] = [
	{
	  headerName: '회계 년도',
	  field: 'fiscalYear'
	},
	{
	  headerName: '회계 시작일',
	  field: 'periodStartDate',
	  width: 150
	},
	{ headerName: '회계 종료일', field: 'periodEndDate', width: 150 }
  ];