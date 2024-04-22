import React, { useEffect, useState } from 'react';

// import { DateTime } from 'luxon';

// material-ui
import { Grid, Stack, TextField, Button, Typography, FormControl, Select, MenuItem, Modal } from '@mui/material';

// project imports
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import TaskIcon from '@mui/icons-material/Task';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// material-ui
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';
import Swal from 'sweetalert2';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import CodeDialog from 'pages/account/base/dialog/CodeDialog';
import DeleteCheckDialog from 'pages/account/base/dialog/DeleteCheckDialog';
import * as types from '../../../../store/slices/posting';
import * as type from '../../../../store/slices/base';
import AccountFormDialog from 'pages/account/base/dialog/AccountFormDialog';
import CustomerDialog from 'pages/account/base/dialog/CustomerDialog';
import { SlipColumnType } from '../types/types';

//전표 그리드 세팅
const slipColumns: SlipColumnType[] = [
  { width: '30', headerName: '', field: '', align: 'center', headerAlign: 'center' },
  { width: '100', headerName: '기수일련번호', field: 'accountPeriodNo', align: 'center', headerAlign: 'center' },
  { width: '180', headerName: '전표일련번호', field: 'slipNo', align: 'center', headerAlign: 'center' },
  { width: '150', headerName: '작성날짜', field: 'reportingDate', type: 'date', align: 'center', headerAlign: 'center' },
  { width: '150', headerName: '작성자코드', field: 'reportingEmpCode',editable: true, align: 'center', headerAlign: 'center' },
  { width: '200', headerName: '품의내역', field: 'expenseReport', editable: true, align: 'center', headerAlign: 'center'}, // editable : 편집가능
  {  width: '180', headerName: '승인자', field: 'approvalEmpCode', align: 'center', headerAlign: 'center' },
  {  width: '180', headerName: '승인상태', field: 'slipStatus', align: 'center', headerAlign: 'center' }
];

//분개 칼럼
const indignationColumns: SlipColumnType[] = [
  { width: '250', headerName: '분개일련번호', field: 'journalNo', align: 'center', headerAlign: 'center' },
  { width: '180', headerName: '계정코드', field: 'accountCode', editable: true, align: 'center', headerAlign: 'center' },
  { width: '180', headerName: '계정명', field: 'accountName', editable: true, align: 'center', headerAlign: 'center' },
  { width: '180', headerName: '거래처코드', field: 'customerCode', editable: true, align: 'center', headerAlign: 'center' },
  // { headerName: '거래처명', field: 'customerName', hide: true, editable: true },
  {
    width: '180',
    headerName: '대차구분',
    field: 'balanceDivision',
    editable: true,
    type: 'singleSelect',
    valueOptions: ['대변', '차변'],
    align: 'center', headerAlign: 'center'
  },
  {
    width: '180',
    headerName: '차변',
    field: 'leftDebtorPrice',
    editable: true,
    align: 'center', headerAlign: 'center'
  },
  {
    width: '180',
    headerName: '대변',
    field: 'rightCreditsPrice',
    editable: true,
    align: 'center', headerAlign: 'center'
  }
];

//분개상세칼럼
const indignationDetailColumns: SlipColumnType[] = [
  { headerName: '분개번호', field: 'journalDetailNo', width: 250, align: 'center', headerAlign: 'center' },
  { headerName: '계정관리명', field: 'accountControlName', width: 150, align: 'center', headerAlign: 'center' },
  { headerName: '계정관리타입', field: 'accountControlType', width: 150, align: 'center', headerAlign: 'center' },
  {
    headerName: '상세내용',
    field: 'journalDescription',
    editable: true,
    width: 250,
    align: 'center', headerAlign: 'center'
  },
  { headerName: '계정코드상세', field: 'accountControlCode', hide: true, align: 'center', headerAlign: 'center' }
];

function SlipForm() {
  let year = moment(new Date()).format('yyyy');
  let month = moment(new Date()).format('MM');
  //let date = moment(new Date()).format("DD");
  let toDay = moment(new Date()).format('yyyy-MM-DD');
  let monthFirstDay = year + '-' + month + '-01';
  // const monthFirst = year + '-' + month + '-01';
  const yearFirst = year + '-' + '01' + '-01';
  const yearLast = year + '-' + '12' + '-31';
  // const yearData = useSelector((state) => state.RootReducers.AccReducer.BaseReducer.periodNoList);
  const periodNo = useSelector((state: any) => state.base.periodNo);
 
  useEffect(() => {
    let date: {yearFirst: string, yearLast: string} = { yearFirst: yearFirst, yearLast: yearLast };
    dispatch(type.searchTPeriodNo(date));
  }, []);
 
  // const dispatch = useDispatch();
  const [slipStatus, setSlipStatus] = useState('전체'); //조회하는 status를 지정해준다.
  const [startDate, setStartDate] = useState(monthFirstDay); //당월 1일
  const [endDate, setEndDate] = useState(toDay); //오늘 날짜
  const [delButton, setDelButton] = useState(''); //delButton의 상태로 slip/journal 삭제 버튼 선택

  const [selecSlip, setSelecSlip] = useState(''); //선택된 slip을 useState로 지정
  const [slipNo, setSlipNo] = useState(''); //
  const [status, setStatus] = useState('');

  const [jourCount, setJourCount] = useState('1');
  const [jourNo, setJourNo] = useState('');

  const [selecJourDetail, setSelecJourDetail] = useState('');
  const [detailList, setDetailList] = useState([]);
  const [codeDialog, setCodeDialog] = useState(false);
  const [codeName, setCodeName] = useState('');
  const [divisionCode, setDivisionCode] = useState('');
  const [accountCode, setAccountCode] = useState(''); //계정선택
  const [accountName, setAccountName] = useState('');
  const [selecJour, setSelecJour] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  
  const handleClose = () => {
    setOpenDialog(false);
  };
  const theme = useTheme();
  const dispatch = useDispatch();
  const deleteCheck = (e: any) => {
    setOpenDialog(true);
    setDelButton(e.target.id);
  };
  //계정선택 dialog
  const [accountSelectDialog, setAccountSelectDialog] = useState(false);
  //거래처코드 선택 dialog
  const [customerCodeDialog, setCustomerCodeDialog] = useState(false);
  const [customerCode, setCustomerCode] = useState('');
  const [customerName, setCustomerName] = useState('');

  const slipData = useSelector((state: any) => state.posting.slipFormList);
  const journalData = useSelector((state: any) => state.posting.journalList);
  const journalDetailData = useSelector((state: any) => state.posting.journalDetailList);
  console.log("journalDetailData??????????", journalDetailData);
  const codeData = useSelector((state: any) => state.base.detailCodeList);
  console.log('코드데이타', codeData);
  
  const cellRender = (e: any) => {
    if (e.field === 'leftDebtorPrice' || e.field === 'rightCreditsPrice') {
      dispatch({
        type: types.UPDATE_JOURNAL_PRICE,
        params: { selecJour: selecJour, journalData: journalData.filter((data: any) => data.journalNo !== jourNo) }
      });
    } else if (e.field === 'journalDescription') {
      if (detailList.length < journalDetailData.length) {
        setDetailList([selecJourDetail, ...detailList]);
      } else {
        const filterList = detailList.filter((data) => data.accountControlCode !== selecJourDetail.accountControlCode);
        setDetailList([selecJourDetail, ...filterList]);
      }
    }
  };
  const inputValue = (e: any) => {
    console.log("e",e);
    if (e.field === 'expenseReport') {
      setSelecSlip({
        ...selecSlip,
        expenseReport: e.props.value
      });
    } else if (e.field === 'leftDebtorPrice') {
      setSelecJour({ ...selecJour, leftDebtorPrice: e.props.value });
    } else if (e.field === 'rightCreditsPrice') {
      setSelecJour({ ...selecJour, rightCreditsPrice: e.props.value });
    } else if (e.field === 'journalDescription') {
      setSelecJourDetail({
        ...journalDetailData.filter((row: any) => row.accountControlCode === e.id)[0],
        journalDescription: e.props.value
      });
    }
  };

  //==========================전표CRUD=================================
  //조회
  const searchSlip = () => {
    let params: any = {
      startDate: moment(startDate).format('yyyy-MM-DD'),
      endDate: moment(endDate).format('yyyy-MM-DD'),
      slipStatus: slipStatus
    };
    dispatch(types.selectSlipStart(params));
  };
  //전표 추가
  const addSlip = () => {
    if (status == '작성중') {
      return Swal.fire({
        icon: 'warning',
        title: '작성을 마무리해 주십시오',
        showConfirmButton: true
      });
    } else {
      console.log(periodNo);
      let params: any = { 
        accountPeriodNo: periodNo.accountPeriodNo, 
        reportingDate: moment().format('yyyy-MM-DD') };
      dispatch(types.addSlip(params));
      setStatus('작성중');
    }
  };
  //전표 삭제
  const deleteData = () => {
    handleClose();
    if (delButton === 'slipDelete' && selecSlip.slipStatus === '승인완료') {
      return Swal.fire({
        icon: 'warning',
        title: '삭제 할 수 없습니다',
        showConfirmButton: true // 수정된 부분
      });
    } else {
      if (delButton === 'slipDelete') {
        console.log('여기', slipNo);
        dispatch(types.deleteSlip(slipNo));
      } else {
        dispatch(types.deleteJournal(jourNo));
      }
      setStatus('작성완료');

      return Swal.fire({
        icon: 'success',
        title: '삭제되었습니다',
        showConfirmButton: true // 수정된 부분
      });
    }
  };

  //전표 저장 및 업데이트
  const insertSlip = () => {
    if (selecSlip === '') {
      return Swal.fire({
        icon: 'warning',
        title: '전표를 선택해 주십시오',
        showConfirmButton: true
      });
    } else if (slipNo !== 'new' && selecSlip.slipStatus == '승인완료') {
      return Swal.fire({
        icon: 'error',
        title: '승인된 항목은 수정할 수 없습니다.',
        showConfirmButton: true
      });
    } else if (slipNo === 'new') {
      const SlipBean = {
        ...selecSlip,
        journalBean: journalData,
        slipStatus: '미결'
      };
      dispatch(types.insertSlip(SlipBean));
      setSlipStatus('전체');
      setStatus('작성완료');
      return Swal.fire({
        icon: 'success',
        title: '저장되었습니다',
        showConfirmButton: true
      });
    } else if (slipNo !== 'new' || slipStatus !== '승인완료') {
      const SlipBean = { ...selecSlip, journalBean: journalData };
      dispatch(types.updateSlip(SlipBean));
      return Swal.fire({
        icon: 'success',
        title: '수정되었습니다',
        showConfirmButton: true
      });
    }
  };
  // 전표 승인 요청
  const approvalRequest = () => {
    if (selecSlip === '') {
      return Swal.fire({
        icon: 'info',
        title: '전표를 선택해 주십시오',
        showConfirmButton: true
      });
    } else if (status == '작성중') {
      return Swal.fire({
        icon: 'warning',
        title: '작성을 마무리해 주십시오',
        showConfirmButton: true
      });
    } else if (selecSlip.slipStatus == '승인') {
      return Swal.fire({
        icon: 'info',
        title: '이미 완료된 건입니다',
        showConfirmButton: true
      });
    } else {
      const approvalRequestData = { slipNo: selecSlip.slipNo, slipStatus: '승인' };
      dispatch(types.approvalSlipRequest(approvalRequestData));
      return Swal.fire({
        icon: 'success',
        title: '승인요청 되었습니다',
        showConfirmButton: true
      });
    }
  };
  //==========================분개=================================
  //분개 조회
  const searchJour = (e: any) => {
    setSelecSlip(e.row);
    console.log('이게아님?', selecSlip);
    if (e.row.slipNo != 'new') {
      dispatch(types.selectJournalStart(e.row.slipNo));
    }
    setSlipNo(e.id);
  };

  //분개 로우 추가
  const addJour = () => {
    if (slipNo == '') {
      Swal.fire({
        icon: 'error',
        title: '전표부터 입력해 주시기 바랍니다',
        showConfirmButton: true
      });
    } else {
      let journalNo = 'JOURNAL' + jourCount;
      dispatch(types.insertJournalRow(journalNo));
      setJourCount(parseInt(jourCount) + 1);
    }
  };
  //분개 - 계정과목명 더블 클릭 --> 계정 선택 다이알로그
  //거래처 선택도 추가
  const accountSelec = (e: any) => {
    setSelecJour(e.row);
    setJourNo(e.row.journalNo);
    if (e.field == 'accountCode') {
      return Swal.fire({
        icon: 'error',
        title: '계정명을 눌러 주세요',
        showConfirmButton: true
      });
    } else if (e.field == 'accountName') {
      setAccountSelectDialog(true);
    } else if (e.field == 'customerCode') {
      setCustomerCodeDialog(true);
    }
  };
  //분개 계정 선택
  const setAccountDetail = () => {
    setAccountSelectDialog(false);
    dispatch({
      type: types.INSERT_ACCOUNT,
      params: {
        accountCode: accountCode,
        accountName: accountName,
        selecJour: selecJour,
        journalData: journalData.filter((data: any) => data.journalNo !== jourNo)
      }
    });
  };
  const setCustomerDetail = () => {
    setCustomerCodeDialog(false);
    dispatch({
      type: types.INSERT_CUSTOMER,
      params: {
        customerCode: customerCode,
        customerName: customerName,
        selecJour: selecJour,
        journalData: journalData.filter((data: any) => data.journalNo !== jourNo)
      }
    });
  };

  //분개 저장 - 하나씩 ======> 전표와 분개 한번에 저장으로 구현
  // 지금은 업데이트 연습용으로 사용
  const insertJour = () => {
    let jourData = { slipNo: slipNo, journalObj: selecJour };
    if (selecJour.slipNo !== 'new') {
      dispatch(types.updateJournal(jourNo));
      return Swal.fire({
        icon: 'info',
        title: '수정되었습니다',
        showConfirmButton: true
      });
    } else {
      dispatch(types.saveJournal(jourData));
      return Swal.fire({
        icon: 'success',
        title: '저장되었습니다',
        showConfirmButton: true
      });
    }
  };

  //==========================분개상세=================================
  //분개상세 조회 및 추가
  const searchDetail = (e: any) => {
    setJourNo(e.row.journalNo);
    if (e.row.journalNo === 'new 차변' || e.row.journalNo === 'new 대변') {
      if (e.row.accountCode !== '' && detailList.length === 0) {
        dispatch(types.addJournalDetail(e.row.accountCode));
      } else if (detailList.length > journalDetailData.length) {
        return Swal.fire({
          icon: 'error',
          title: '상세 확인 필요',
          showConfirmButton: true
        });
      } else if (detailList.length !== 0) {
        console.log(detailList);
        dispatch({
          type: types.SAVE_JOURNAL_DETAIL_START,
          params: {
            selecJour: selecJour,
            journalDetailList: detailList,
            journalData: journalData.filter((data: any) => data.journalNo !== selecJour.journalNo)
          }
        });
        setDetailList([]);
      }
    } else {
      dispatch(types.searchJournalDetailStart(e.row.journalNo));
    }
    setSelecJour(e.row);
  };

  //분개 상세 확인
  const addDetail = () => {
    console.log(detailList);
    console.log(journalData);
  };

  //분개상세 적요칸
  const detailControl = (e: any) => {
    console.log(e);
    setSelecJourDetail(e.row);
    if (e.row.accountControlType === 'SELECT' || e.row.accountControlType === 'SEARCH') {
      dispatch({
        type: type.SEARCH_CODE_REQUEST,
        params: { divisionCodeNo: e.row.journalDescription }
      });
      setCodeDialog(true);
    }
  };

  const setCodeNameDetail = () => {
    setCodeDialog(false);
    console.log(codeName);
    // setSelecJourDetail({ ...selecJourDetail, journalDescription: codeName });

    if (detailList.length < journalDetailData.length) {
      setDetailList([{ ...selecJourDetail, journalDescription: codeName, description: codeName }, ...detailList] as any);
    } else {
      const filterList = detailList.filter((data) => data.accountControlCode !== selecJourDetail.accountControlCode);
      setDetailList([{ ...selecJourDetail, journalDescription: codeName, description: codeName }, ...filterList] as any);
    }
  };
  //분개 상세 타입 모달 오픈
  const [text, setOpenText] = useState(false);
  const [cal, setCal] = useState(false);
  const [search, setSearch] = useState(false);
  const openText = () => {
    setOpenText(true);
  };
  const openCal = () => {
    setCal(true);
  };
  const openSearch = () => {
    setSearch(true);
  };
  const handleModalClose = () => {
    setOpenText(false);
    setCal(false);
    setSearch(false);
  };
  return (
    <Page title="일반전표">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} textAlign={'center'}>
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
                <MenuItem value="전체">전체</MenuItem>
                <MenuItem value="미결">미결</MenuItem>
                <MenuItem value="반려">반려</MenuItem>
                {/* <MenuItem value="승인완료">승인</MenuItem> */}
                <MenuItem value="승인취소">취소</MenuItem>
                {/* <MenuItem value="승인요청">요청</MenuItem> */}
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
            <Button variant="contained" color="secondary" startIcon={<SearchIcon />} sx={{ mx: 1, mb: '10px' }} onClick={searchSlip}>
              조회
            </Button>
          </div>
        </Grid>
      </Grid>
      {/* =================================전표데이터그리드================================= */}
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard
            content={false}
            title="전표"
            secondary={
              <Stack direction="row" alignItems="center">
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<AddCircleIcon />} onClick={addSlip}>
                      추가
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={deleteCheck} id="slipDelete">
                      삭제
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<SaveIcon />} onClick={insertSlip}>
                      저장/수정
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<TaskIcon />} onClick={approvalRequest}>
                      승인요청
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            }
          >
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
                // checkboxSelection
                hideFooter
                getRowId={(row) => row.slipNo}
                onRowClick={searchJour}
                onEditCellPropsChange={inputValue}
                onCellEditStop={cellRender}
                style={{ padding:10 }}
              />
              <DeleteCheckDialog open={openDialog} onClose={handleClose} deleteData={deleteData} />
            </Box>
          </MainCard>
        </Grid>
        {/*분개그리드*/}
        <Grid item xs={12}>
          <MainCard
            content={false}
            title="분개"
            secondary={
              <Grid container spacing={1}>
                {/* <Grid item>
                               <Button variant="contained" color="secondary">
                                   발주/납품 마감신청
                               </Button>
                           </Grid> */}
                <Grid item>
                  <Button variant="contained" color="secondary" onClick={addJour}>
                    분개추가
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" onClick={deleteCheck} id="jourDelete">
                    분개삭제
                  </Button>
                </Grid>
                {/* >>>>>>>>>>>>>>>>>>>>>>>>updateJournal 연습  */}
                <Grid item>
                  <Button variant="contained" color="secondary" onClick={insertJour}>
                    분개저장/수정
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
                rows={journalData}
                columns={indignationColumns}
                // checkboxSelection
                hideFooter
                getRowId={(row) => row.journalNo}
                onCellClick={searchDetail}
                onCellDoubleClick={accountSelec}
                onEditCellPropsChange={inputValue}
                onCellEditStop={cellRender}
                style={{ padding:10, marginLeft: 10 }}
              />
              <AccountFormDialog
                open={accountSelectDialog}
                onClose={setAccountDetail}
                setAccountCode={setAccountCode}
                setAccountName={setAccountName}
              />
              <CustomerDialog
                open={customerCodeDialog}
                onClose={setCustomerDetail}
                setCustomerCode={setCustomerCode}
                setCustomerName={setCustomerName}
              />
            </Box>
          </MainCard>
          {/* =================================분개상세데이터그리드================================= */}
          <Grid item xs={12} sx={{ paddingTop: '25px' }}>
            <MainCard content={false} title="분개상세">
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
                  // checkboxSelection
                  getRowId={(row) => row.accountControlCode}
                  onEditCellPropsChange={inputValue}
                  onCellEditStop={cellRender}
                  onCellDoubleClick={detailControl}
                  onCellClick={(e) => {
                    console.log(e.formattedValue);
                    switch (e.formattedValue) {
                      case 'TEXT':
                        {
                          openText();
                        }
                        break;
                      case 'CALENDAR':
                        {
                          openCal();
                        }
                        break;
                      case 'SEARCH':
                        {
                          openSearch();
                        }
                        break;
                    }
                  }}
                />
                <CodeDialog open={codeDialog} onClose={setCodeNameDetail} setCodeName={setCodeName} codeData={codeData} />
              </Box>
            </MainCard>
          </Grid>
          {/** 모달 */}
          <Modal open={text} onClose={handleModalClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <TextField fullWidth id="outlined-basic" label="text" />
                <Button variant="contained" onClick={handleModalClose}>
                  확인
                </Button>
              </Box>
            </Box>
          </Modal>

          <Modal open={cal} onClose={handleModalClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4
              }}
            >
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
              <Button variant="contained" color="primary" onClick={handleModalClose}>
                저장
              </Button>
            </Box>
          </Modal>
          <Modal open={search} onClick={handleModalClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <TextField fullWidth id="outlined-basic" label="search" />
                <Button variant="contained" onClick={handleModalClose}>
                  검색
                </Button>
              </Box>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Page>
  );
}

SlipForm.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SlipForm;
