import React, { useState } from 'react'
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

/**
 * 추가사항
 * 1. 출력하긴 했는데 칼럼 속성인 valueFormatter가 올바르지 않은 것 같음. 
 *  - 주석처리하니까 정상 출력됨.
 *  
 */

const IncomeStatement = () => {

  const theme = useTheme();

  const [year, setYear] = useState('');
  const [yearModal, setYearModal] = useState(false);
  const [periodNoList, setPeriodNoList]: any = useState('');
  const [accountPeriodNo, setAccountPeriodNo] = useState('');

  const [list, setList]: any = useState('');

  // 날짜 모달 컬럼
  const yearColumns = [
    {
      headerName: '회계 기수',
      field: 'accountPeriodNo',
      width: 250
    },
    {
      headerName: '회계 시작일',
      field: 'periodStartDate',
      width: 250
    },
    { headerName: '회계 종료일', field: 'periodEndDate', width: 250 }
  ];

  // 부모 손익 칼럼
  const IncomeStatementGroupColumns = [
    {
      headerName: " ", groupId: 'account', width: 100,
      children: [{ field: "accountName" }],
    },
    {
      headerName: '당기', groupId: 'thisYear',
      children: [{ field: 'income', }, { field: 'incomeSummary', }]
    },
    {
      headerName: '전기', groupId: 'lastYear',
      children: [{ field: 'earlyIncome' }, { field: 'earlyIncomeSummary' }]
    }
  ];

  // 자식 손익 컬럼
  const IncomeStatementColumns: any = [
    {
      headerName: '과목', field: 'accountName',
      width: 300
    },
    {
      headerName: '금액',
      field: 'income',
      colId: '당기',
      width: 200,
      // valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
    },
    {
      headerName: '잔액',
      field: 'incomeSummary',
      colId: '당기',
      width: 200,
      // valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
    },
    {
      headerName: '금액',
      field: 'earlyIncome',
      colId: '전기',
      width: 200,
      // valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
    },
    {
      headerName: '잔액',
      field: 'earlyIncomeSummary',
      colId: '전기',
      width: 200,
      // valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
    }
  ];

  // 회계연도 검색 클릭
  const onYearBtn = () => {
    console.log('날짜 모달 ON');
    setYearModal(true);
    getYearApi();
  };

  const getYearApi = async () => {
    await accountApi.get('/settlement/periodNoList', {})
      .then(res => {
        setPeriodNoList(res.data.periodNoList)
        console.log('[periodNoList]', res.data.periodNoList)
      }).catch(e => console.error((e)));
  }

  // 날짜모달 row 클릭시 발생 이벤트
  const clickYearData = (e: any) => {
    const yearset = e.row.periodStartDate.substring(0, 4);
    console.log('[clickYearData]', e.row);
    setYearModal(false);
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
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onYearBtn}>
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
                          rows={periodNoList}
                          columns={yearColumns}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                          getRowId={(row) => row.accountPeriodNo}
                          onRowClick={clickYearData} //년도의 행 선택했을때 실행
                        />
                        <Button onClick={() => setYearModal(false)}>닫기</Button>
                      </Box>
                    </div>
                  </Modal>
                </Grid>
                <Grid item>
                  <Button
                    sx={{ ml: 1, flex: 1 }} variant="contained" color="secondary" size="large" onClick={searchList}
                  >조회</Button>
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