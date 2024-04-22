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


const MonthIncomeStatement = () => {

  const theme = useTheme();

  const [year, setYear] = useState('');
  const [yearModal, setYearModal] = useState(false);
  const [periodNoList, setPeriodNoList]: any = useState('');
  const [monthIncomeStatementlist, setMonthIncomeStatementlist]: any = useState('');

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

  const currencyFormatter = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  });

  const wonPrice = {
    type: 'number',
    valueFormatter: (params) => {
      if (params.value === null || isNaN(params.value)) {
        return ''; // Handle null or NaN values gracefully
      }
      return currencyFormatter.format(params.value);
    }
  };

  const MonthIncomeStatementColumns = [
    {
      headerName: '연도',
      field: 'year',
      hide: true,
      width: '150'
    },
    {
      headerName: '월',
      field: 'month',
      sortable: true, //컬럼눌러서 정렬가능하게하기
      cellClass: 'grid-cell-centered',
      width: 50
    },
    {
      headerName: '매출액',
      field: 'salesSummary',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '매출원가',
      field: 'salesCostSummary',
      background: 'red',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '매출총액',
      field: 'grossMargin',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '판관비',
      field: 'salesManageCostSummary',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '영업이익',
      field: 'operatingProfit',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '영업외수익',
      field: 'nonOperatingProfitSummary',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '영업외비용',
      field: 'nonOperatingCostSummary',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '법인세차감전이익',
      field: 'ordinaryProfit',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '법인세',
      field: 'corporateTaxSummary',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '당기순이익',
      field: 'netIncome',
      ...wonPrice,
      width: 150
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
  }

  // 조회 클릭
  const searchList = async (params: any) => {
    console.log('조회 클릭')
    await accountApi.get('/settlement/monthIncomeStatements', {
      params: { searchDate: year }
    })
      .then(res => {
        console.log('월별손익계산서', res.data);
        setMonthIncomeStatementlist(res.data.monthIncomeList.RESULT
        );

      })
      .catch(e => console.error(e));
  };

    return (
      <Page title="월별손익계산서">
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
                    >조회
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
                  rows={monthIncomeStatementlist}
                  columns={MonthIncomeStatementColumns}
                  getRowId={(row: any) => row.month}
                // onRowClick={}
                />
              </Box>
            </MainCard>
          </Grid>
        </Grid>
      </Page>
    )
  }

  MonthIncomeStatement.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default MonthIncomeStatement;