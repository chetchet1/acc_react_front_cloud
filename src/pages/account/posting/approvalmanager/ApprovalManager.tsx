import React, { useState } from 'react';
// material-ui
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import ApprovalIcon from '@mui/icons-material/Approval';
import RefreshIcon from '@mui/icons-material/Refresh';
import CallMissedIcon from '@mui/icons-material/CallMissed';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
// assets
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../../store/slices/posting';
import moment from 'moment/moment';

import Swal from 'sweetalert2';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';

//Columns
//전표칼럼
const slipColumns = [
  { width: '120', headerName: '기수일련번호', field: 'accountPeriodNo', align: 'center', headerAlign: 'center' },
  { width: '200', headerName: '전표일련번호', field: 'slipNo', align: 'center', headerAlign: 'center'},
  { width: '180', headerName: '작성날짜', field: 'reportingDate', type: 'date', align: 'center', headerAlign: 'center' },
  { width: '180', headerName: '작성자코드', field: 'reportingEmpCode', align: 'center', headerAlign: 'center' },
  { width: '200', headerName: '품의내역', field: 'expenseReport', align: 'center', headerAlign: 'center' }, // editable : 편집가능
  { width: '180', headerName: '승인자', field: 'approvalEmpCode', align: 'center', headerAlign: 'center' },
  { width: '180', headerName: '승인상태', field: 'slipStatus', align: 'center', headerAlign: 'center' }
];
//분개칼럼
const indignationColumns = [
  { width: '250', headerName: '분개일련번호', field: 'journalNo', align: 'center', headerAlign: 'center' },
  { width: '150', headerName: '계정코드', field: 'accountCode', align: 'center', headerAlign: 'center' },
  { width: '180', headerName: '계정명', field: 'accountName', align: 'center', headerAlign: 'center' },
  { width: '180', headerName: '거래처코드', field: 'customerCode', align: 'center', headerAlign: 'center' },
  { width: '180', headerName: '거래처명', field: 'customerName', hide: true, align: 'center', headerAlign: 'center' },
  { width: '180', headerName: '대차구분', field: 'balanceDivision', align: 'center', headerAlign: 'center'},
  { width: '180', headerName: '차변', field: 'leftDebtorPrice', align: 'center', headerAlign: 'center' },
  { width: '180', headerName: '대변', field: 'rightCreditsPrice', align: 'center', headerAlign: 'center' }
];

//분개상세칼럼
const indignationDetailColumns = [
  { headerName: '분개번호', field: 'journalDetailNo', width: 250, align: 'center', headerAlign: 'center' },
  { headerName: '계정관리명', field: 'accountControlName', width: 180, align: 'center', headerAlign: 'center' },
  { headerName: '계정관리타입', field: 'accountControlType', width: 180, align: 'center', headerAlign: 'center' },
  { headerName: '상세내용', field: 'journalDescription', width: 250, align: 'center', headerAlign: 'center' },
  { headerName: '계정코드상세', field: 'accountControlCode', hide: true }
];

// ==============================|| 일반전표 ||============================== //

const ApprovalManager = () => {
  const slipData = useSelector((state: any) => state.posting.approvalSlipList);
  const journalData = useSelector((state: any) => state.posting.approvalJournalList);
  const journalDetailData = useSelector((state: any) => state.posting.journalDetailList);
  console.log("slipData???",slipData );
  console.log("journalData???",journalData );
  console.log("journalData???",journalData );

  let year = moment(new Date()).format('yyyy');
  let month = moment(new Date()).format('MM');
  //let date = moment(new Date()).format("DD");
  let toDay = moment(new Date()).format('yyyy-MM-DD');
  let monthFirstDay = year + '-' + month + '-01';
  const yearFirst = year + '-01-01';
  const yearLast = year + '-12-31';

  const theme = useTheme();
  const dispatch = useDispatch(); // useDispatch()는 리덕스 내장 함순데 밖에서 사용하기 위해서 dispatch변수 적어준다.
  const [slipStatus, setSlipStatus] = useState('승인');
  const [startDate, setStartDate] = useState(monthFirstDay); //시작 날짜
  const [endDate, setEndDate] = useState(toDay);
  const [selecSlip, setSelecSlip] = useState('');

  //==========================전표CRUD=================================
  //조회
  const approvalSearchData = () => {
    let params = { startDate: startDate, endDate: endDate, slipStatus: slipStatus };
    dispatch(types.searchAmSlipStart(params));
  };
  //전표 승인 Swal.fire는 SweetAlert2(Sweetalert 2) 라이브러리의 함수입니다. SweetAlert2는 사용자에게 더 예쁘고 인터랙티브한 경고창 및 모달 대화 상자를 생성하기 위한 JavaScript 라이브러리입니다. Swal.fire 함수는 SweetAlert2를 사용하여 경고창을 생성하고 표시하는 데 사용됩니다.
  const approvalReturnBtn = (e: any) => {
    if (selecSlip === '') {
      return Swal.fire({
        icon: 'warning', // 아이콘 종류 (예: success, error, warning 등)
        title: '전표를 선택해 주세요', // 제목 텍스트
        showConfirmButton: true // 확인 버튼 표시 여부
      });
    } else if (e.target.innerText === '전표승인') {
      const approvalReturnData = { slipNo: selecSlip.slipNo, slipStatus: '승인', approvalDate: toDay, approvalEmpCode: 'EMP-20' };
      dispatch(types.updateAmSlipStart(approvalReturnData));
      return Swal.fire({
        icon: 'success',
        title: '승인 완료 되었습니다',
        showConfirmButton: true
      });
    } else if (e.target.innerText === '반려') {
      const approvalReturnData = { slipNo: selecSlip.slipNo, slipStatus: '반려' };
      console.log(approvalReturnData);
      dispatch(types.updateAmSlipStart(approvalReturnData));
      return Swal.fire({
        icon: 'error',
        title: '반려 처리 되었습니다',
        showConfirmButton: true
      });
    } else if (e.target.innerText === '승인 취소') {
      const approvalReturnData = { slipNo: selecSlip.slipNo, slipStatus: '취소' };
      dispatch(types.updateAmSlipStart(approvalReturnData));
      return Swal.fire({
        icon: 'error',
        title: '취소 처리 되었습니다',
        showConfirmButton: true
      });
    }
  };

  //==========================분개=================================
  // 분개 조회
  const searchJour = (e: any) => {
    console.log('분개e가뭘까요', e);
    setSelecSlip(e.row);
    console.log(e.row.slipNo);
    dispatch(types.searchAmJournalStart(e.row.slipNo));
  };
  //==========================분개상세=================================
  // 분개 상세 조회
  const searchDetail = (e: any) => {
    dispatch(types.searchJournalDetailStart(e.row.journalNo));
  };
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <div align="center">
          <Typography variant="h3">[ 검색조건 ]</Typography>
          <div>
            <TextField
              id="startDate"
              type={'date'}
              variant={'standard'}
              sx={{ mx: 1 }}
              value={startDate}
              defaultValue={monthFirstDay}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
            <TextField
              id="endDate"
              type={'date'}
              variant={'standard'}
              sx={{ mx: 1 }}
              value={endDate}
              defaultValue={toDay}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
            <FormControl variant="standard" sx={{ mx: 1, mb: '10px', minWidth: 120 }}>
              <Select
                value={slipStatus}
                defaultValue={slipStatus}
                onChange={(e) => {
                  setSlipStatus(e.target.value);
                }}
              >
                {/* <MenuItem value="승인요청">요청</MenuItem>
                <MenuItem value="승인완료">완료</MenuItem> */}
                <MenuItem value="미결">미결</MenuItem>
                <MenuItem value="승인">승인</MenuItem>
                <MenuItem value="반려">반려</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<CalendarMonthIcon />}
              sx={{ mx: 1, mb: '10px' }}
              onClick={() => {
                setStartDate(yearFirst);
                setEndDate(yearLast);
              }}
            >
              올해
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SearchIcon />}
              sx={{ mx: 1, mb: '10px' }}
              onClick={approvalSearchData}
            >
              조회
            </Button>
          </div>
        </div>
        {/* =================================전표데이터그리드================================= */}
        <MainCard
          content={false}
          title="전표"
          sx={{
            '&MuiCard-root': { color: theme.palette.text.primary }
          }}
          secondary={
            <Grid container spacing={1}>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={approvalReturnBtn} startIcon={<ApprovalIcon />}>
                  전표승인
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={approvalReturnBtn} startIcon={<CallMissedIcon />}>
                  반려
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={approvalReturnBtn} startIcon={<RefreshIcon />}>
                  승인 취소
                </Button>
              </Grid>
            </Grid>
          }
        >
          {/* table data grid */}
          <Box
            sx={{
              height: 300,
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
              rows={slipData}
              columns={slipColumns}
              checkboxSelection
              hideFooter
              getRowId={(row) => row.slipNo}
              onRowClick={searchJour}
            />
          </Box>
        </MainCard>
        {/* =================================분개데이터그리드================================= */}
        <MainCard content={false} title="분개">
          {/* table data grid */}
          <Box
            sx={{
              height: 300,
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
              hideFooter
              checkboxSelection
              rows={journalData}
              columns={indignationColumns}
              getRowId={(row) => row.journalNo}
              onCellClick={searchDetail}
            />
          </Box>
        </MainCard>
        <MainCard content={false} title="분개상세">
          {/* table data grid */}
          <Box
            sx={{
              height: 300,
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
              rows={journalDetailData}
              columns={indignationDetailColumns}
              hideFooter
              checkboxSelection
              getRowId={(row) => row.accountControlCode}
            />
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
};

ApprovalManager.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ApprovalManager;
