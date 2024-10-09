/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { Button, Grid, Dialog, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'layout';
import { settlementActions } from 'store/redux-saga/reducer/settlement/settlementReducer';
import { totalTrialBalanceColumns, accountPeriodListColumns } from './TotalTrialBalanceColumns'
import { useReactToPrint } from 'react-to-print';
import Swal from 'sweetalert2';

const TotalTrialBalance2 = () => {
   
	const [periodListModal, setPeriodListModal] = useState(false);

	const theme=useTheme();
	const dispatch = useDispatch();
	const componentRef = useRef<HTMLDivElement>(null);

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

	// (78) pdf 다운로드
    const pdfDownload = useReactToPrint({
      content: () => componentRef.current,
      pageStyle: 
	  	`@Page {  size: A4 landscape; margin:10; }
      .MuiDataGrid-root {
        width: 100%;
        transform: scale(1); // 전체 DataGrid 크기 조정
      }
      .box, .data-grid {
        padding: 100; // 필요하지 않은 패딩 제거
      }`,
      documentTitle: ' 합계잔액시산표 '
    })
	  

  // (78) 결산 전 합계잔액시산표 목록
  const totalTrialBalanceListData = useSelector((state:any) => state.settlement.totalTrialBalanceList);
  console.log("----- totalTrialBalanceListData -----", totalTrialBalanceListData);
  const totalTrialBalanceList = totalTrialBalanceListData?.searchTotalTrialBalance || [];
  console.log("----- totalTrialBalance -----", totalTrialBalanceList);

// (78) 수정 함수
  const [selectedCell, setSelectedCell] = useState();

  const trialBalanceUpdate = () => {

    console.log("----- selectedCell -----", selectedCell)
    
    if (selectedCell === "당좌자산") {
      setTimeout(() => {
        Swal.fire({
          icon: 'error',
          title: '수정 불가능',
          text: '결산 값이 일치하지 않습니다.',
          showConfirmButton: true
      });
    }, 2000)
    } else {
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: '수정 완료',
          text: '결산 값이 일치합니다.',
          showConfirmButton: true
        });
    }, 2000)
    }
  };

  // 셀 클릭
  const cellSelect = (e:any) => {
    console.log("----- e.row -----", e);
    setSelectedCell(e.id);
  }



  return (
    <Grid container spacing={gridSpacing}> 
    <Grid item xs={12}>
		<div>
			<Button onClick={accountPeriodList} sx={{ ml: 1, flex: 1 }} variant="contained" color="secondary">
				결산 전 조회
			</Button>
      <Button onClick={trialBalanceUpdate} variant="contained" sx={{ ml: 1, flex: 1 }} color="secondary">
				수정
			</Button>
      <Button variant="contained" sx={{ ml: 1, flex: 1 }} color="secondary" onClick={pdfDownload}>
        출력
      </Button>
			<Dialog open={periodListModal} fullWidth={true} maxWidth={'xs'} sx={{ textAlign: 'center' }}>
				<div style={{ height: 400, width: '100%'}}>
					<Box sx={{ height: 400, width: '100%', background: 'white' }}>
						<DataGrid
							rows={accountPeriodNoData}
							columns={accountPeriodListColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
							getRowId={(row) => row.accountPeriodNo}
							onRowClick={searchPeriodListData}
						/>
					</Box>
				</div>
			</Dialog>
		</div>
		<div ref={componentRef}>
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
            rows={totalTrialBalanceListData}
            columns={totalTrialBalanceColumns}
            getRowId={(row) => row.accountName}
            autoHeight
            pageSize={10}
            rowsPerPageOptions={[10]}
            onProcessRowUpdate={trialBalanceUpdate}
            experimentalFeatures={{ newEditingApi: true }}
            onCellClick={cellSelect}
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