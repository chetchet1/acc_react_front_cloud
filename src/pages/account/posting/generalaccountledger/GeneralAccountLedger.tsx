// project imports
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import { gridSpacing } from 'store/constant';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../../store/slices/posting';
import moment from 'moment';
import * as type from '../../../../store/slices/base';
// import { AgGridReact } from 'ag-grid-react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css'; // 'dist' 디렉토리를 제외하고 스타일 파일 경로를 지정

// material-ui
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { GeneralColumnType } from '../types/types';

const accountColumns: GeneralColumnType[] = [
  { headerName: '계정과목 코드', field: 'accountInnerCode', width: 120 },
  { headerName: '계정과목', field: 'accountName', width: 150 }
];
const accountDetailcolumns: GeneralColumnType[] = [
  { field: 'accountInnerCode', headerName: '계정과목코드', width: 120 },
  { field: 'accountName', headerName: '계정과목명', width: 150 }
];
//일자, 회계계정, 차변,대변, 거래처, 적요

const generalAccountLedgerColumns: GeneralColumnType[] = [
  { field: 'reportingDate', headerName: '일자' },
  { field: 'accountName', headerName: '회계계정' },
  {
    field: 'leftDebtorPrice',
    headerName: '차변',
    valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"'
  },
  {
    field: 'rightCreditsPrice',
    headerName: '대변',
    valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"'
  },
  { field: 'customerName', headerName: '거래처' },
  { field: 'expenseReport', headerName: '적요' }
];

const GeneralAccountLedger = () => {
  //총계정원장
  /*총계정 원장은 기업 회계에 관련된 모든 계정의 수입과 지출 등을 수록한 장부입니다. 
    총계정 원장 메뉴에서는 총계정 원장을 작성하여 당해 회계 계정 과목의 차변과 대변 금액, 잔액, 누계액을 확인할 수 있습니다.
    사업장, 계정 과목, 전표일을 지정한 후 검색하면 계정 과목 목록이 표시되며, 각 계정 과목을 클릭하여 금액을 확인할 수 있습니다.
    */
  const theme = useTheme();

  let year = moment(new Date()).format('yyyy');
  let month = moment(new Date()).format('MM');
  //let date = moment(new Date()).format("DD");
  let toDay = moment(new Date()).format('yyyy-MM-DD');
  let monthFirstDay = year + '-' + month + '-01';

  const accountData = useSelector((state: any) => state.base.accountCodeList);
  console.log("accountData", accountData);
  const accountDetailData = useSelector((state: any) => state.base.accountDetailList);
  console.log("accountDetailData", accountDetailData);
  const generalAccountLedger = useSelector((state: any) => state.posting.generalAccountLedgerList);
  console.log("generalAccountLedger", generalAccountLedger);

  const dispatch = useDispatch();
  const [fromDate, setFromDate] = useState(monthFirstDay);
  const [toDate, setToDate] = useState(toDay);
  const [parentAccountDialog, setParentAccountDialog] = useState(false);
  const [parentAccount, setParentAccount] = useState('');
  const [parentAccountCode, setParentAccountCode] = useState('');

  const searchParentAccount = () => {
    console.log('account 찾기');
    dispatch({
      type: type.SEARCH_ACCOUNT_REQUEST
    });
    setParentAccountDialog(true);
  };

  const onRowClicked = (e: any) => {
    setParentAccount(e.id);
    setParentAccountCode(e.row.accountInnerCode);
    setParentAccountDialog(false);
  };
  const searchJournalAccount = () => {
    if(!parentAccount){
      alert('계정 선택 바랍니다')
    }else{
      dispatch({
        type: type.SEARCH_JOURNAL_ACCOUNT_REQUEST,
        params: {
          fromDate: fromDate,
          toDate: toDate,
          parentAccountCode: parentAccountCode
        }
      });
      dispatch({
        type: types.SELECT_GENERAL_ACCOUNT_LEDGER_START,
        params: {
          fromDate: fromDate,
          toDate: toDate,
          accountInnerCode: parentAccountCode
        }
      });
    }
  };
  const searchGeneralAccountLedger = (e: any) => {
    console.log(e.data);
    // console.log(e.row.accountInnerCode);
    dispatch({
      type: types.SELECT_GENERAL_ACCOUNT_LEDGER_START,
      params: {
        fromDate: fromDate,
        toDate: toDate,
        accountInnerCode: e.data.accountInnerCode
      }
    });
  };
  const generalAccountLedgerSum = (generalAccountLedger: any) => {
    let sum_leftDebtorPrice = 0;
    let sum_rightCreditsPrice = 0;
    for (let i = 0; i < generalAccountLedger.length; i++) {
      sum_leftDebtorPrice += parseInt(generalAccountLedger[i].leftDebtorPrice);
      sum_rightCreditsPrice += parseInt(generalAccountLedger[i].rightCreditsPrice);
      console.log(sum_rightCreditsPrice);
    }
    let sum_data: any[] = [];
    sum_data.push({
      reportingDate: '',
      accountName: '합계 금액',
      leftDebtorPrice: sum_leftDebtorPrice,
      rightCreditsPrice: sum_rightCreditsPrice,
      customerName: '',
      expenseReport: ''
    });
    return sum_data;
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <div align="center">
          <Typography variant="h3">[ 검색조건 ]</Typography>
          <div>
            <TextField
              id="fromDate"
              type={'date'}
              defaultValue={fromDate}
              variant={'standard'}
              onChange={(e) => setFromDate(e.target.value)}
              sx={{ mx: 1 }}
            />
            <TextField
              id="toDate"
              type={'date'}
              defaultValue={toDate}
              variant={'standard'}
              onChange={(e) => setToDate(e.target.value)}
              sx={{ mx: 1 }}
            />
            <TextField
              id="account"
              variant={'standard'}
              onClick={searchParentAccount}
              sx={{ mx: 1, mb: '10px' }}
              value={parentAccount}
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
            />
            <Dialog open={parentAccountDialog}>
              <Grid item>
                <MainCard content={false} title="계정">
                  {/* table data grid */}
                  <Box
                    sx={{
                      height: 500,
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
                    <DataGrid rows={accountData} columns={accountColumns} getRowId={(row) => row.accountName} onRowClick={onRowClicked} />
                  </Box>
                </MainCard>
              </Grid>
            </Dialog>
            <Button
              variant={'contained'}
              color="secondary"
              onClick={searchJournalAccount}
              startIcon={<SearchIcon />}
              sx={{ mx: 1, mb: '10px' }}
            >
              조회
            </Button>
          </div>
        </div>

        <div>
          <Grid container spacing={gridSpacing}>
            <Grid item sm={3}>
              <div
                style={{
                  width: '100%'
                }}
              >
                <MainCard
                  content={false}
                  sx={{
                    '&MuiCard-root': { color: theme.palette.text.primary }
                  }}
                >
                  <div
                    style={{
                      height: 500,
                      width: '100%'
                    }}
                    className="ag-theme-balham"
                  >
                    <AgGridReact
                      columnDefs={accountDetailcolumns}
                      rowData={accountDetailData}
                      rowSelection="single"
                      getRowId={(row) => row.data.accountInnerCode}
                      onRowClicked={searchGeneralAccountLedger}
                    />
                  </div>
                </MainCard>
              </div>
            </Grid>
            <Grid item sm={9}>
              <div
                style={{
                  width: '100%'
                }}
              >
                <MainCard
                  content={false}
                  sx={{
                    '&MuiCard-root': { color: theme.palette.text.primary }
                  }}
                >
                  <div
                    style={{
                      height: 500,
                      width: '100%'
                    }}
                    className="ag-theme-balham"
                  >
                    <AgGridReact
                      columnDefs={generalAccountLedgerColumns}
                      rowData={generalAccountLedger}
                      rowSelection="single"
                      pinnedBottomRowData={generalAccountLedgerSum(generalAccountLedger)}
                      getRowStyle={function (param) {
                        console.log(param);
                        if (param.data.accountName == '합계 금액') {
                          return { background: '#a3d4e3' };
                        }
                      }}
                    />
                  </div>
                </MainCard>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

GeneralAccountLedger.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default GeneralAccountLedger;
