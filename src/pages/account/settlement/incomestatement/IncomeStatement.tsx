import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
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
import { yearColumns, IncomeStatementGroupColumns, IncomeStatementColumns } from './IncomeStatementColumns'
import { settlementActions } from 'store/redux-saga/reducer/settlement/settlementReducer';
import { useReactToPrint } from 'react-to-print';

/**
 * 추가사항
 * 1. 출력하긴 했는데 칼럼 속성인 valueFormatter가 올바르지 않은 것 같음. 
 *  - 주석처리하니까 정상 출력됨.
 *  
 */

const IncomeStatement = () => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const [year, setYear] = useState('');
	const [periodListModal, setPeriodListModal] = useState(false);
  const [periodNoList, setPeriodNoList]: any = useState('');
  const [accountPeriodNo, setAccountPeriodNo] = useState('');

  const [list, setList]: any = useState('');
  const componentRef = useRef<HTMLDivElement>(null);


  // 회계기수 검색
  const accountPeriodList = () => {
		setPeriodListModal(true); //년도 모달을 띄움
		dispatch(settlementActions.AccountPeriodNoRequest());
	  };

  // 회계기수 데이터
  const accountPeriodNoData = useSelector((state:any) => {
		console.log("----- state -----", state);
		return state.settlement.periodNoList
	})


  // 날짜모달 row 클릭시 발생 이벤트
  const clickYearData = (e: any) => {
    const yearset = e.row.periodStartDate.substring(0, 4);
    console.log('[clickYearData]', e.row);
    setPeriodListModal(false);
    setYear(yearset);
    setAccountPeriodNo(e.row.accountPeriodNo);
  }

  // 조회 클릭
  const searchList = async (params: any) => {
    console.log('조회 클릭')
    let callResult = 'SEARCH'
    await accountApi.get('/settlement/incomestatement', {
      params: {accountPeriodNo: accountPeriodNo, callResult: callResult}
    })
      .then(res => {
        console.log('손익계산서', res.data);
        setList(res.data.incomeList.incomeStatement);
      })
      .catch(e => console.error(e));
  };

    // pdf 다운로드
    const pdfDownload = useReactToPrint({
      content: () => componentRef.current,
      pageStyle: "@Page { size: 210mm 297mm }",
      documentTitle: ' FinancialStatement '
    })
  

  return (
    <Page title="손익계산서">
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
                          onRowClick={clickYearData} //년도의 행 선택했을때 실행
                        />
                        <Button onClick={() => setPeriodListModal(false)}>닫기</Button>
                      </Box>
                    </div>
                  </Modal>
                </Grid>
                <Grid item>
                  <Button
                    sx={{ ml: 1, flex: 1 }} variant="contained" color="secondary" size="large" onClick={searchList}
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
                rows={list}
                columns={IncomeStatementColumns}
                getRowId={(row: any) => row.accountName}
                columnGroupingModel={IncomeStatementGroupColumns}
              // onRowClick={}
              />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </Page>
  )
}


IncomeStatement.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default IncomeStatement