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
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
/**
 * 추가사항
 */

  const FinancialStatements = () => {

  const theme = useTheme();

  const [year, setYear] = useState('');
  const [yearModal, setYearModal] = useState(false);
  const [periodNoList, setPeriodNoList]: any = useState('');
  const [accountPeriodNo, setAccountPeriodNo] = useState('');

  const [financialStatementlist, setFinancialStatementList]: any = useState('');

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

  // // 부모 재무상태 칼럼
  // const FInancialStatementGroupColumns = [
  //   {
  //     headerName: " ", groupId: 'account', width: 100,
  //     children: [{ field: "accountName" }],
  //   },
  //   {
  //     headerName: '당기', groupId: 'thisYear',
  //     children: [{ field: 'balanceDetail', }, { field: 'preBalanceDetailSummary', }]
  //   },
  //   // {
  //     // headerName: '전기', groupId: 'lastYear',
  //     // children: [{ field: 'preBalanceDetail' }, { field: 'preBalanceDetailSummary' }]
  //   // }
  // ];

  // // 자식 재무상태 컬럼
  //   const FinancialStatementColumns: any = [
  //     {
  //       headerName: '과목', field: 'accountName', width: 300
  //     },
  //     {
  //       headerName: '세부금액', field: 'balanceDetail', width: 200,
  //       // valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
  //     },
  //     {
  //       headerName: '합계금액', field: 'preBalanceDetailSummary', width: 200,
  //       // valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
  //     },
  //     {
  //       // headerName: '세부금액', field: 'preBalanceDetail', width: 200,
  //       // valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
  //     },
  //     {
  //       // headerName: '합계금액',
  //       // field: 'preBalanceDetailSummary', width: 200,
  //       // valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
  //     },
  //   ];

  const FinancialStatementColumns = [
    {
        headerName: '과목',
        field: 'accountName',
        colId: '과목명',
        cellStyle: {
            textAlign: 'left',
            borderRight: '0.1mm ridge #c2c2c2'
        },
        width: 150
    },
    {
        headerName: '당기',
        headerClass: 'participant-group',
        marryChildren: true,
        width: 200,
        children: [
            {
                headerName: '세부금액',
                field: 'balanceDetail',
                colId: '당기',
                cellStyle: { textAlign: 'right' },
                width: 225,
                valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
            },
            {
                headerName: '합계금액',
                field: 'preBalanceDetailSummary',
                colId: '당기',
                cellStyle: { textAlign: 'right' },
                width: 225,
                valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
            }
        ]
    },
    {
        headerName: '전기',
        headerClass: 'participant-group',
        marryChildren: true,
        width: 200,
        children: [
            {
                headerName: '세부금액',
                field: 'preBalanceDetail',
                colId: '전기',
                cellStyle: {
                    textAlign: 'right',
                    borderLeft: '0.1mm ridge #c2c2c2'
                },
                width: 225,
                valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
            },
            {
                headerName: '합계금액',
                field: 'preBalanceDetailSummary',
                colId: '전기',
                cellStyle: { textAlign: 'right' },
                width: 225,
                valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
            }
        ]
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
    await accountApi.get('/settlement/financialposition', {
      params: {accountPeriodNo: accountPeriodNo, callResult: callResult}
    })
      .then(res => {
        console.log('재무상태표', res.data.financialPositionList.financialPosition);
        setFinancialStatementList(res.data.financialPositionList.financialPosition);
      })
      .catch(e => console.error(e));
  };

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
{/*}            <Box
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
            > */}
{/*              <DataGrid
                experimentalFeatures={{ columnGrouping: true }}
                rows={financialStatementlist}
                columns={FinancialStatementColumns}
                getRowId={(row: any) => row.accountName}
                columnGroupingModel={FInancialStatementGroupColumns}
            /> */}
              <div
                className="ag-theme-balham"
                style={{
                  width: '100%'
                }}
              >
                <AgGridReact
                  columnDefs={FinancialStatementColumns}
                  rowData={financialStatementlist}
                  rowSelection="single"
                  getRowStyle={function (param): any {
                    //가운데
                    if (param.node.rowPinned) {
                      return { 'font-weight': 'bold', background: '#dddddd' };
                    }
                    return { textAlign: 'center' };
                  }}
                  onGridReady={(event) => {
                    event.api.sizeColumnsToFit();
                  }}
                  domLayout={'autoHeight'}
                  style={{ height: '100%', width: '100%' }}
                />
              </div>
            {/*</Box>*/}
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
