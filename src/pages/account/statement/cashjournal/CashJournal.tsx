import React, { useState } from 'react';

// material-ui
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';
// import { useDispatch, useSelector } from 'react-redux';

// project imports
import { gridSpacing } from 'store/constant';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import accountApi from 'api/accountApi';
import Page from 'ui-component/Page';
import { CashJournalDataType } from 'pages/account/types/types';
import CashJournalTableCell from './CashJournalTableCell';
// import * as types from '../reducer/StatementReducer';

const CashJournal = () => {
  let year: string = moment(new Date()).format('yyyy');
  let month: string = moment(new Date()).format('MM');
  let toDay: string = moment(new Date()).format('yyyy-MM-DD');
  let monthFirstDay: string = year + '-' + month + '-01'; // 월의 첫일은 yyyy-mm-01

  const [fromDate, setFromDate] = useState(monthFirstDay); // 시작일의 초기값을 1일로 설정
  const [toDate, setToDate] = useState(toDay);

  // useState를 사용하여 axios로 cashJournalList가져오기
  const [data, setData] = useState<CashJournalDataType[]>([]);
  const searchData = async () => {
    let params = { fromDate: moment(fromDate).format('yyyy-MM-DD'), toDate: moment(toDate).format('yyyy-MM-DD') };

    const res = await accountApi.get('/posting/cashjournal', {
      params: params
    });
    console.log(res.data.cashJournalList);
    setData(res.data.cashJournalList);

    // axios
    //   .get('http://localhost:9103/posting/cashjournal', {
    //     params: params
    //   })
    //   .then((res) => {
    //     console.log(res.data.cashJournalList);
    //     setData(res.data.cashJournalList);
    //   });
  };

// 사가 적용해서 비동기로 데이터 가져오기(진행중)
//   const dispatch = useDispatch();
//   const data = useSelector((state: any) => state.rootReducers.AccReducer.StatementReducer.cashJournalList);
//   const searchData = () => {
//     dispatch({
//         type: types.SEARCH_CASHJOURNAL_REQUEST,
//         params: {
//             fromDate: fromDate,
//             toDate: toDate
//         }
//     });
//     console.log("CashJournal", data)
// };

  const CashJournalColumnDefs = [
    { label: '해당월', id: 'monthReportingDate', width: 75 },
    { label: '일자', id: 'reportingDate', width: 150 },
    { label: '적요', id: 'expenseReport', width: 170 },
    { label: '거래처명', id: 'customerName', width: 80 },
    {
      label: '입금',
      id: 'deposit',
      valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"', //JavaScript 표현식으로, 숫자 데이터를 원화(한국 돈) 형식에 맞게 표시하는 역할
      width: 150
    },
    {
      label: '출금',
      id: 'withdrawal',
      valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
      width: 150
    },
    {
        label: '잔액',
        id: 'balance',
        valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
        width: 150
      },
  ];

//   const journalSumForm = (): CashJournalDataType => {
//     let sum_leftDebtorPrice = 0;
//     let sum_rightCreditsPrice = 0;
//     for (let i = 0; i < data.length; i++) {
//       sum_leftDebtorPrice += parseInt(data[i].leftDebtorPrice);
//       sum_rightCreditsPrice += parseInt(data[i].rightCreditsPrice);
//     }
//     let sum_data: CashJournalDataType = {
//       balanceDivision: '합계',
//       leftDebtorPrice: sum_leftDebtorPrice.toString(),
//       rightCreditsPrice: sum_rightCreditsPrice.toString(),
//       monthReportingDate: '',
//       reportingDate: '',
//       expenseReport: '',
//       customerName: '',
//       deposit: '',
//       withdrawal: '',
//       balance: '',
//     };
//     return sum_data;
//   };

  return (
    <Page title="Basic Table">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} textAlign={'center'}>

            {/* 헤더 */}
          <Typography sx={{paddingBottom: 2}} variant="h3">검색조건</Typography>
          <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField sx={{paddingRight: 2, paddingBottom: 2}} {...props} helperText="" />}
                  label="시작일"
                  value={fromDate}
                  onChange={(e: any) => {
                    setFromDate(e);
                  }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField sx={{paddingRight: 1, paddingBottom: 2}} {...props} helperText="" />}
                  label="종료일"
                  value={toDate}
                  onChange={(e: any) => {
                    setToDate(e);
                  }}
                />
              </LocalizationProvider>
              
            {/* 구식 날짜구하기 -> 현재 템플릿에 있는 컴포넌트로 변경
            <TextField
              id="startDate"
              type={'date'}
              defaultValue={fromDate}
              variant={'standard'}
              onChange={(e) => {
                setFromDate(e.target.value);
              }}
              sx={{ mx: 1 }}
            />
            <TextField
              id="endDate"
              type={'date'}
              defaultValue={toDate}
              variant={'standard'}
              onChange={(e) => setToDate(e.target.value)}
              sx={{ mx: 1 }}
            /> */}

            <Button variant="contained" color="secondary" onClick={searchData} startIcon={<SearchIcon />} sx={{ mx: 1, height: 50, fontSize: 18}}>
              조회
            </Button>
          </div>

              {/* 테이블 */}
          <TableContainer>
            <Table sx={{ minWidth: 350, backgroundColor: 'white', width: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow style={{ whiteSpace: 'nowrap' }}>
                  {CashJournalColumnDefs.map((column) => {
                    return (
                      <TableCell key={column.id} align="right" sx={{ width: '100px' }}>
                        {column.label}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row: any) => (
                  <TableRow hover key={row.customerName} style={{ whiteSpace: 'nowrap' }}>
                    <CashJournalTableCell row={row} />
                  </TableRow>
                ))}
                <TableRow sx={{ background: 'grey', color: 'white' }}>
                  {/* <CashJournalTableCell row={journalSumForm()} /> */}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Page>
  );
};

CashJournal.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CashJournal;