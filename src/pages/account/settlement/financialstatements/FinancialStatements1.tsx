/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import Page from 'ui-component/Page';
import { Button, Grid, Paper, Divider, InputBase, IconButton, Box, Modal } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import accountApi from 'api/accountApi';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import { yearColumns, IncomeStatementGroupColumns, IncomeStatementColumns } from './FinancialStatementsColumns';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectDate, getTrialDate, requestSearchDate } from 'store/slices/detailTrial';
import { values } from 'lodash';
import { settlementActions } from 'store/redux-saga/reducer/settlement/settlementReducer';
/**
 * 추가사항
  
*/

  const FinancialStatements = () => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const [year, setYear] = useState();
  const [yearModal, setYearModal] = useState(false);
  const [periodNoList, setPeriodNoList]: any = useState();
  const [accountPeriodNo, setAccountPeriodNo] = useState();

  const [financialStatementlist, setFinancialStatementList]: any = useState('');

  

  // 회계연도 검색 클릭
  const accountPeriodList = () => {
    console.log('날짜 모달 ON');
    setYearModal(true);
    dispatch(requestSearchDate() as any);
  };

  // 회계기수데이터
	const accountPeriodNoData = useSelector((state:any) => {
		console.log("----- state -----", state);
		return state.detailTrial.detailDate.periodNoList
	})


  // 날짜모달 row 클릭시 발생 이벤트
  const clickYearData = (e: any) => {
    console.log('[clickYearData]', e.row);
    setYearModal(false);
    console.log('----- e.row.fiscalYear -----', e.row.fiscalYear);
    setYear(e.row.fiscalYear);
    console.log('----- year -----', year);
    setAccountPeriodNo(e.row.accountPeriodNo);
  }

  useEffect(()=>{
    searchFinancialStatementList({ accountPeriodNo: accountPeriodNo });
    console.log("----- accountPeriodNo -----", accountPeriodNo)
  }, [accountPeriodNo])


  // 조회 클릭
  const searchFinancialStatementList = async (params: any) => {
    console.log('조회 클릭')
    let callResult = 'SEARCH'
    await accountApi.get('/settlement/financialposition', {
      params: {accountPeriodNo: accountPeriodNo, callResult: callResult}
    })
      .then(res => {
        console.log('재무상태표', res.data.financialPositionList.financialPosition);
        setFinancialStatementList(res.data.financialPositionList.financialPosition);
      })
      .catch(e => console.error(e));
  };

  //
  // const searchFinancialStatementList = (params: any) => {
  //   console.log('----- accountPeriodNo -----', accountPeriodNo);
  //   let callResult = 'SEARCH'
  //   const selectedData: any = { accountPeriodNo : params.accountPeriodNo, callResult: callResult }
  //   console.log("----- selectedData -----", selectedData)
  //   if(selectedData){
  //     dispatch(settlementActions.FinancialPositionListRequest(selectedData))
  //   }

  // }


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
                  <Modal open={yearModal} >
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
                          onRowClick={clickYearData} //년도의 행 선택했을때 실행
                        />
                      </Box>
                    </div>
                  </Modal>
                </Grid>
                <Grid item>
                  <Button
                    sx={{ ml: 1, flex: 1 }} variant="contained" color="secondary" size="large" onClick={searchFinancialStatementList}
                  >조회</Button>
                  <Button variant="contained" sx={{ ml: 1, flex: 1 }} size="large" color="secondary" >
                    출력
                   </Button>
                </Grid>
              </Grid>
            }
          />
          <MainCard>
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
                rows={financialStatementlist}
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