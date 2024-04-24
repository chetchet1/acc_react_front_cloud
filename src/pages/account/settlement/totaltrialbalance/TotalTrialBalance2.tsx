/* eslint-disable prettier/prettier */
import React, { useCallback, useState, useEffect, useRef } from 'react';
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
import { dispatch } from 'store';
import { getSelectDate, getTrialDate, requestSearchDate } from 'store/slices/detailTrial';
import Layout from 'layout';
import { settlementActions } from 'store/redux-saga/reducer/settlement/settlementReducer';
import { getTotalTrialBalance } from 'store/redux-saga/api/settlement';
import { totalTrialBalanceColumns, accountPeriodListColumns } from './TotalTrialBalanceColumns'

const TotalTrialBalance2 = () => {
   
	const [periodListModal, setPeriodListModal] = useState(false);
	const callResult = "SEARCH";

	const theme=useTheme();
	const dispatch = useDispatch();

	// (78) 결산 전 조회 버튼
	const accountPeriodList = () => {
		setPeriodListModal(true); //년도 모달을 띄움
		dispatch(settlementActions.AccountPeriodNoRequest());
	  };

	// (78) 회계기수데이터
	const accountPeriodNoData = useSelector((state:any) => {
		console.log("----- state -----", state);
		return state.settlement.periodNoList
	})

	// (78) 회계기수 데이터 받은 후 모달
	const searchPeriodListData = (e:any) => {
		setPeriodListModal(false); // 모달 종료

		console.log("----- e.row.accountPeriodNo -----", e.row.accountPeriodNo)
		const selectedData:any = { periodNoList : e.row.accountPeriodNo }

		console.log("----- selectedData -----",selectedData);
		console.log("----- settlementActions.TotalTrialBalanceListRequest -----",settlementActions.TotalTrialBalanceListRequest(selectedData));
		if(selectedData !== undefined){
			dispatch(settlementActions.TotalTrialBalanceListRequest(selectedData))
	}
}
	  

  // (78) 합계잔액시산표 목록
  const totalTrialBalanceListData = useSelector((state:any) => state.settlement.totalTrialBalanceList);
  console.log("----- totalTrialBalanceListData -----", totalTrialBalanceListData);
  const totalTrialBalanceList = totalTrialBalanceListData?.searchTotalTrialBalance || [];
  console.log("----- totalTrialBalance -----", totalTrialBalanceList);




  const excuteStatement = () => {
    // 결산 실행 함수
  };

  const cancelStatement = () => {
    // 결산 취소 함수
  };



  return (
    <Grid container spacing={gridSpacing}> 
    <Grid item xs={12}>
		<div>
			<Button onClick={accountPeriodList} variant="contained" color="secondary">
				결산 전 조회
			</Button>
			<Dialog open={periodListModal} fullWidth={true} maxWidth={'xs'} sx={{ textAlign: 'center' }}>
				<div style={{ height: 400, width: '100%'}}>
					<Box sx={{ height: 400, width: '100%', background: 'white' }}>
						<DataGrid
							rows={accountPeriodNoData}
							columns={accountPeriodListColumns}
							pageSize={5}
							//rowsPerPageOptions={{5}}
							getRowId={(row) => row.accountPeriodNo}
							onRowClick={searchPeriodListData}
						/>
					</Box>
				</div>
			</Dialog>
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
		<div>
			<Button onClick={accountPeriodList} variant="contained" color="secondary">
				결산
			</Button>
			<Dialog open={periodListModal} fullWidth={true} maxWidth={'xs'} sx={{ textAlign: 'center' }}>
				<div style={{ height: 400, width: '100%'}}>
					<Box sx={{ height: 400, width: '100%', background: 'white' }}>
						<DataGrid
							rows={accountPeriodNoData}
							columns={accountPeriodListColumns}
							pageSize={5}
							//rowsPerPageOptions={{5}}
							getRowId={(row) => row.accountPeriodNo}
							onRowClick={searchPeriodListData}
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

TotalTrialBalance2.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
  };

export default TotalTrialBalance2;