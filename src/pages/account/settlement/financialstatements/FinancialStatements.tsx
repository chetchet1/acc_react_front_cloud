/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react'
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import Page from 'ui-component/Page';
import { Button, Grid, Paper, Divider, InputBase, IconButton, Box, Modal } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import 'ag-grid-community/styles/ag-grid.css';
import { yearColumns, IncomeStatementGroupColumns, IncomeStatementColumns } from './FinancialStatementsColumns';
import { useDispatch, useSelector } from 'react-redux';
import { settlementActions } from 'store/redux-saga/reducer/settlement/settlementReducer';
import { useReactToPrint } from 'react-to-print';

  const FinancialStatements = () => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const [year, setYear] = useState();

  const [periodListModal, setPeriodListModal] = useState(false);
  const [accountPeriodNo, setAccountPeriodNo] = useState();
  const componentRef = useRef<HTMLDivElement>(null);

  

  // 회계연도 검색 클릭
  const accountPeriodList = () => {
    console.log('날짜 모달 ON');
    setPeriodListModal(true);
    dispatch(settlementActions.AccountPeriodNoRequest());
    };

  // 회계기수데이터
	const accountPeriodNoData = useSelector((state:any) => {
		console.log("----- state -----", state);
		return state.settlement.periodNoList
	})


  // 날짜모달 row 클릭시 발생 이벤트
  const clickAccountPeriodNo = (e: any) => {
    console.log('[clickYearData]', e.row);
    setPeriodListModal(false);
    console.log('----- e.row.fiscalYear -----', e.row.fiscalYear);
    setYear(e.row.fiscalYear);
    setAccountPeriodNo(e.row.accountPeriodNo);
    console.log('----- accountPeriodNo -----', accountPeriodNo);
  }

  // 조회 클릭
  const searchFinancialStatementList = () => {
    console.log('----- SEARCH : accountPeriodNo -----', accountPeriodNo);
    let callResult = 'SEARCH'
    const selectedData: any = { accountPeriodNo : accountPeriodNo, callResult: callResult }
    console.log("----- selectedData -----", selectedData)
    if(selectedData !== undefined){
      dispatch(settlementActions.FinancialPositionListRequest(selectedData))
    }
  }

  // 재무상태표
  const financialStatementDataList = useSelector((state:any) => {
		console.log("----- state -----", state);
		return state.settlement.financialStatementlist
	})

  // pdf 다운로드
  const pdfDownload = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: "@Page { size: 210mm 297mm }",
    documentTitle: ' 재무상태표 '
  })


  return (
    <Page title="재무상태표">
      <Grid container spacing={gridSpacing}>
        {/* === 메뉴 =========================================================================================================================================== */}
        <Grid item sm={12}>
          <MainCard
            content={false}
            title=" "
            sx={{
              '&MuiCard-root': { color: theme.palette.text.primary }
            }}
            secondary={
              <Grid container spacing={1}>
                <Grid item> 
                  <Paper
                    id="startDate"
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 130 }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="회계연도"
                      inputProps={{ 'aria-label': 'search google maps' }}
                      value={year}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={accountPeriodList}>
                      <SearchIcon />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  </Paper>
                  <Modal open={periodListModal} >
                    <div
                      style={{
                        height: 400,
                        width: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          height: 400,
                          width: '40%',
                          background: 'white',

                        }}
                      >
                        <DataGrid
                          rows={accountPeriodNoData}
                          columns={yearColumns}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                          getRowId={(row) => row.accountPeriodNo}
                          onRowClick={clickAccountPeriodNo} //년도의 행 선택했을때 실행
                        />
                      </Box>
                    </div>
                  </Modal>
                </Grid>
                <Grid item>
                  <Button
                    sx={{ ml: 1, flex: 1 }} variant="contained" color="secondary" size="large" onClick={searchFinancialStatementList}
                  >조회</Button>
                  <Button variant="contained" sx={{ ml: 1, flex: 1 }} size="large" color="secondary" onClick={pdfDownload}>
                    출력
                   </Button>
                </Grid>
              </Grid>
            }
          />
          <MainCard ref={componentRef}>
            <Box
              sx={{
                height: 700,
                width: '100%',
                '& .MuiDataGrid-root': {
                  border: 'none',
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
                experimentalFeatures={{ columnGrouping: true }}
                rows={financialStatementDataList}
                columns={IncomeStatementColumns}
                getRowId={(row: any) => row.accountName}
                columnGroupingModel={IncomeStatementGroupColumns}
              />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </Page>
  )
}

FinancialStatements.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default FinancialStatements;