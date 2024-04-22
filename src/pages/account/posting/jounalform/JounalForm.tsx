import React, { useState } from 'react';
// material-ui
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';
// project imports
import { gridSpacing } from 'store/constant';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import axios from 'axios';
import Page from 'ui-component/Page';
import { JounalDataType, JournalFoamColumnDefsType } from 'pages/account/types/types';
import Tableccccc from './Tableccccc';
// import JournalFormGrid from './JournalFormGrid';

const JournalFoamColumnDefs: JournalFoamColumnDefsType[] = [
  { label: '거래처', id: 'customerCode', width: 75 },
  { label: '전표일', id: 'reportingDate', width: 150 },
  { label: '전표 번호', id: 'slipNo', width: 170 },
  { label: '계정코드', id: 'accountCode', width: 80 },
  { label: '계정명', id: 'accountName', width: 100 },
  { label: '적요', id: 'expenseReport', width: 200 },
  { label: '계정구분', id: 'balanceDivision', width: 80 },
  {
    label: '차변금액',
    id: 'leftDebtorPrice',
    valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
    width: 150
  },
  {
    label: '대변금액',
    id: 'rightCreditsPrice',
    valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
    width: 150
  }
  // {
  //   label: '분개번호',
  //   id: 'journalNo',
  //   hide: true
  // }
];
const JournalForm = () => {
  //분개장
  //거래가 발생하여 분개한 내역을 사업장별로 확인할 수 있습니다.
  let year = moment(new Date()).format('yyyy');
  let month = moment(new Date()).format('MM');
  //let date = moment(new Date()).format("DD");
  let toDay = moment(new Date()).format('yyyy-MM-DD');
  let monthFirstDay = year + '-' + month + '-01';
  // const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(monthFirstDay);
  const [endDate, setEndDate] = useState(toDay);
  const [data, setData] = useState<JounalDataType[]>([]);
  const searchData = () => {
    let params = { startDate: moment(startDate).format('yyyy-MM-DD'), endDate: moment(endDate).format('yyyy-MM-DD') };
    axios
      .get('http://localhost:9103/posting/rangedjournallist', {
        params: params
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };
  // console.log(data.journalNo);

  const journalSumForm = (): JounalDataType => {
    let sum_leftDebtorPrice = 0;
    let sum_rightCreditsPrice = 0;
    for (let i = 0; i < data.length; i++) {
      sum_leftDebtorPrice += parseInt(data[i].leftDebtorPrice);
      sum_rightCreditsPrice += parseInt(data[i].rightCreditsPrice);
    }
    let sum_data: JounalDataType = {
      customerCode: '',
      reportingDate: '',
      slipNo: '',
      accountCode: '',
      accountName: '',
      expenseReport: '',
      balanceDivision: '합계',
      leftDebtorPrice: sum_leftDebtorPrice.toString(),
      rightCreditsPrice: sum_rightCreditsPrice.toString()
    };
    return sum_data;
  };

  return (
    <Page title="Basic Table">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} textAlign={'center'}>
          <Typography variant="h3">[ 검색조건 ]</Typography>
          <div>
            <TextField
              id="startDate"
              type={'date'}
              defaultValue={startDate}
              variant={'standard'}
              onChange={(e) => {
                setStartDate(e.target.value);
                console.log(startDate);
              }}
              sx={{ mx: 1 }}
            />
            <TextField
              id="endDate"
              type={'date'}
              defaultValue={endDate}
              variant={'standard'}
              onChange={(e) => setEndDate(e.target.value)}
              sx={{ mx: 1 }}
            />
            <Button variant="contained" color="secondary" onClick={searchData} startIcon={<SearchIcon />} sx={{ mx: 1, mb: '10px' }}>
              조회
            </Button>
          </div>

          <TableContainer sx={{ overflowX: 'auto', maxHeight: 510, border: '2px solid black' }}>
            <Table sx={{ minWidth: 350, backgroundColor: 'white', width: '100%' }} aria-label="simple table">
              <TableHead
                sx={{
                  position: 'sticky',
                  top: 0,
                  background: 'lightgray'
                }}
              >
                <TableRow style={{ whiteSpace: 'nowrap' }}>
                  {JournalFoamColumnDefs.map((column) => {
                    return (
                      <TableCell key={column.id} align="right" style={{ width: '100px' }}>
                        {column.label}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow hover key={row.customerCode} style={{ whiteSpace: 'nowrap' }}>
                    <Tableccccc row={row} />
                  </TableRow>
                ))}
                <TableRow sx={{ background: 'cyan', position: 'sticky', bottom: 0 }}>
                  <Tableccccc row={journalSumForm()} />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Page>
  );
};

JournalForm.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default JournalForm;
