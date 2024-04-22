/* eslint-disable prettier/prettier */
import React, { useCallback, useState, useEffect } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { Button, Grid, Modal, Typography, Table, TableBody, TableCell, TableContainer, TableHead
    , TableRow, Dialog, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid, GridRowParams, GridColDef } from '@mui/x-data-grid';
// import { Box } from '@mui/system';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
// import AutoComplete from 'pages/forms/components/autocomplete';
import Page from 'ui-component/Page';
import { ColumnProps } from './types/types';
import { dispatch } from 'store';
import { getSelectDate, getTrialDate, requestSearchDate } from 'store/slices/detailTrial';
import Layout from 'layout';
import { settlementActions } from 'store/redux-saga/reducer/settlement/settlementReducer';
import { getTotalTrialBalance } from 'store/redux-saga/api/settlement';
import axios from 'axios';

const TotalTrialBalance1 = () => {
   
	const [yearOpen, yearSetOpen] = useState(false);
	const [data, setData] = useState([])
	//const [year, setYear] = useState('');

	const theme=useTheme();
	const dispatch = useDispatch();

	// 회계기수데이터
	const accountPeriodNoData = useSelector((state:any) => {
		console.log("----- state -----", state);
		return state.detailTrial.detailDate.periodNoList
	})
	  
	// PDF 다운로드
	// const pdfDownload = async () => {
	// 	if (!html2pdf) html2pdf = await import("html2pdf.js");
	
	// 	html2pdf.default(content.value);
	// };



  // 결산 전 조회 버튼
  const accountPeriodList = () => {
    yearSetOpen(true); //년도 모달을 띄움
    dispatch(requestSearchDate() as any);
  };

	// 회계기수 데이터 받은 후 모달
	const searchYearData = (e: any) => {
		yearSetOpen(false); // 모달 종료

		console.log("----- e.row.accountPeriodNo -----", e.row.periodNoList)
		const selectedData:any = { periodNoList : e.row.periodNoList }

		console.log("----- selectedData -----",selectedData);
		console.log("----- settlementActions.TotalTrialBalanceListRequest -----",settlementActions.TotalTrialBalanceListRequest(selectedData));
		if(e.row.periodNoList !== undefined){
			dispatch(settlementActions.TotalTrialBalanceListRequest(selectedData))
	}
}

  // 합계잔액시산표 목록
  const totalTrialBalanceListData = useSelector((state:any) => state.settlement.totalTrialBalanceList);
  console.log("----- totalTrialBalanceListData -----", totalTrialBalanceListData);
  const totalTrialBalanceList = totalTrialBalanceListData?.searchTotalTrialBalance || [];
  console.log("----- totalTrialBalance -----", totalTrialBalanceList);
//  type TotalTrialBalanceColumnType = GridColDef<any, any>; // <any, any> ? <string, string> ??



  const excuteStatement = () => {
    // 결산 실행 함수
  };

  const cancelStatement = () => {
    // 결산 취소 함수
  };

  // 회계기수 모달 세팅
  const accountPeriodListColumns: ColumnProps[] = [
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

  // 합계잔액시산표 그리드 세팅
  const totalTrialBalanceColumns = [
	{ width: 250, headerName: '계정 과목', field: 'accountName', align: 'center', headerAlign: 'center' },
	{ width: 250, headerName: '차변 합계', field: 'debitsSum', valueFormatter: (params: any)=> Math.floor(params.value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원", align: 'center', headerAlign: 'center' },
	{ width: 250, headerName: '차변 잔액', field: 'debitsSumBalance', valueFormatter: (params: any)=>  Math.floor(params.value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원", align: 'center', headerAlign: 'center' },
	{ width: 250, headerName: '대변 합계', field: 'creditsSum', valueFormatter: (params: any)=> Math.floor(params.value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원", align: 'center', headerAlign: 'center' },
	{ width: 250, headerName: '대변 잔액', field: 'creditsSumBalance', valueFormatter: (params: any)=>Math.floor(params.value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원", align: 'center', headerAlign: 'center' },
]

return (
  <Grid container spacing={gridSpacing}> 
  <Grid item xs={12}>
  <div>
    <Button onClick={accountPeriodList} variant="contained" color="secondary">
      결산 전 조회
    </Button>
    <Dialog open={yearOpen} fullWidth={true} maxWidth={'xs'} sx={{ textAlign: 'center' }}>
      <div style={{ height: 400, width: '100%'}}>
        <Box sx={{ height: 400, width: '100%', background: 'white' }}>
          <DataGrid
            rows={accountPeriodNoData}
            columns={accountPeriodListColumns}
            pageSize={5}
            //rowsPerPageOptions={{5}}
            getRowId={(row) => row.accountPeriodNo}
            onRowClick={searchYearData}
          />
        </Box>
      </div>
    </Dialog>
    <Button variant="contained" color="secondary" >
      출력
    </Button>
  </div>
  <div>
  <Box
        sx={{
          height:'100%',
          width:'100%',
          marginTop:'10px',
          '& .MuiDataGrid-root': {
            border: '1px solid grey',
            borderRadius: '10px',
            padding: '10px',
            '& .MuiDataGrid-cell': {
              borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
            },
            '& .MuiDataGrid-columnsContainer': {
              color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
              borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
            },
            '& .MuiDataGrid-columnSeparator': {
              color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
            }
          }
        }}
      >
        <DataGrid
          rows={totalTrialBalanceList}
          columns={totalTrialBalanceColumns}
          getRowId={(row) => row.totalTrialBalance}
          autoHeight
        />
      </Box>
  </div>
  <div>
    <Button onClick={accountPeriodList} variant="contained" color="secondary">
      결산
    </Button>
    <Dialog open={yearOpen} fullWidth={true} maxWidth={'xs'} sx={{ textAlign: 'center' }}>
      <div style={{ height: 400, width: '100%'}}>
        <Box sx={{ height: 400, width: '100%', background: 'white' }}>
          <DataGrid
            rows={accountPeriodNoData}
            columns={accountPeriodListColumns}
            pageSize={5}
            //rowsPerPageOptions={{5}}
            getRowId={(row) => row.accountPeriodNo}
            onRowClick={searchYearData}
          />
        </Box>
      </div>
    </Dialog>
    <Button variant="contained" color="secondary">
      결산 취소
    </Button>
    <Button variant="contained" color="secondary">
      출력
    </Button>
  </div>
  <div>
  <Box
        sx={{
          height:'100%',
          width:'100%',
          marginTop:'10px',
          '& .MuiDataGrid-root': {
            border: '1px solid grey',
            borderRadius: '10px',
            padding: '10px',
            '& .MuiDataGrid-cell': {
              borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
            },
            '& .MuiDataGrid-columnsContainer': {
              color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
              borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
            },
            '& .MuiDataGrid-columnSeparator': {
              color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
            }
          }
        }}
      >
        <DataGrid
          rows={totalTrialBalanceList}
          columns={totalTrialBalanceColumns}
          getRowId={(row) => row.totalTrialBalance}
          autoHeight
        />
      </Box>
  </div>
  </Grid>
</Grid>
);
};

TotalTrialBalance1.getLayout = function getLayout(page: ReactElement) {
return <Layout>{page}</Layout>;
};

export default TotalTrialBalance1;