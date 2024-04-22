// import React, { useEffect, useState } from 'react';
// import moment from 'moment';
// import SearchIcon from '@material-ui/icons/Search';
// import { useDispatch, useSelector } from 'react-redux';
// import * as types from '../../reducer/AccountReducer';
// import { Box, Button, Grid, TextField, Typography } from '@mui/material';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { useTheme } from '@mui/material/styles';
// import ApprovalIcon from '@mui/icons-material/Approval';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import CallMissedIcon from '@mui/icons-material/CallMissed';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import MainCard from 'ui-component/cards/MainCard';
// import { gridSpacing } from 'store/constant';

// interface SlipData {
//   slipCheck?: boolean;
//   accountPeriodNo?: string;
//   slipNo?: string;
//   reportingDate?: string;
//   reportingEmpCode?: string;
//   expenseReport?: string;
//   reportingEmpName?: string;
//   slipStatus?: string;
// }

// interface JournalData {
//   journalNo?: string;
//   accountCode?: string;
//   accountName?: string;
//   customerCode?: string;
//   customerName?: string;
//   balanceDivision?: string;
//   leftDebtorPrice?: number;
//   rightCreditsPrice?: number;
// }

// const slipColumns: GridColDef[] = [
//   { width: 30, headerCheckboxSelection: true, checkboxSelection: true, field: ' ' },
//   { width: 90, headerName: '기수일련번호', field: 'accountPeriodNo', align: 'center' },
//   { width: 180, headerName: '전표일련번호', field: 'slipNo' },
//   { headerName: '작성날짜', field: 'reportingDate', type: 'date' },
//   { headerName: '작성자코드', field: 'reportingEmpCode' },
//   {
//     width: 200,
//     headerName: '품의내역',
//     field: 'expenseReport',
//     editable: true
//   },
//   { headerName: '승인자', field: 'reportingEmpName' },
//   { headerName: '승인상태', field: 'slipStatus' }
// ];

// const indignationColumns: GridColDef[] = [
//   { width: 30, headerCheckboxSelection: true, checkboxSelection: true, field: ' ' },
//   { width: 250, headerName: '분개일련번호', field: 'journalNo' },
//   { headerName: '계정코드', field: 'accountCode' },
//   { headerName: '계정명', field: 'accountName' },
//   { headerName: '거래처코드', field: 'customerCode' },
//   { headerName: '거래처명', field: 'customerName', hide: true },
//   {
//     headerName: '대차구분',
//     field: 'balanceDivision',
//     editable: true,
//     type: 'singleSelect',
//     valueOptions: ['대변', '차변']
//   },
//   {
//     headerName: '차변',
//     field: 'leftDebtorPrice',
//     editable: true
//   },
//   {
//     headerName: '대변',
//     field: 'rightCreditsPrice',
//     editable: true
//   }
// ];

// const ApprovalManager: React.FC = () => {
//   const slipData: SlipData[] = useSelector((state: any) => state.RootReducers.AccReducer.AccountReducer.approvalSlipList);
//   const journalData: JournalData[] = useSelector((state: any) => state.RootReducers.AccReducer.AccountReducer.JournalList);
//   const theme = useTheme();
//   let year = moment(new Date()).format('yyyy');
//   let month = moment(new Date()).format('MM');
//   const today = year + '-' + month + '-' + new Date().getDate();
//   const monthFirst = year + '-' + month + '-01';
//   const yearFirst = year + '-01-01';
//   const yearLast = year + '-12-31';

//   const dispatch = useDispatch();
//   const [startDate, setStartDate] = useState<string>(monthFirst);
//   const [endDate, setEndDate] = useState<string>(today);
//   const [slipStatus] = useState<string>('승인요청');
//   const [positionGridApi, setPositionGridApi] = useState<any>();
//   const [slipNo, setSlipNo] = useState<string>('');

//   const approvalSearchData = () => {
//     dispatch({
//       type: types.SEARCH_AM_SLIP_REQUEST,
//       params: {
//         startDate: moment(startDate).format('yyyy-MM-DD'),
//         endDate: moment(endDate).format('yyyy-MM-DD'),
//         slipStatus: slipStatus
//       }
//     });
//   };

//   const thisYear = () => {
//     setStartDate(yearFirst);
//     setEndDate(yearLast);
//   };

//   const searchJour = (e: GridValueGetterParams) => {
//     if (e.row.slipNo !== 'new') {
//       dispatch({
//         type: types.SELECT_JOURNAL_START,
//         params: {
//           slipNo: e.row.slipNo
//         }
//       });
//     }
//   };

//   const initalBtn = () => {
//     positionGridApi.selectAll();
//     const allData = positionGridApi.getSelectedRows();
//     positionGridApi.updateRowData({ remove: allData });
//   };

//   const approvalBtn = async () => {
//     let selectedData = positionGridApi.getSelectedRows();
//     let approvalData = selectedData.map((cv: any) => {
//       cv.slipStatus = '승인';
//       cv.approvalDate = moment(new Date()).format('yyyy-MM-DD');
//       cv.approvalEmpCode = sessionStorage.getItem('empCodeInfo_token');
//       cv.approvalEmpName = sessionStorage.getItem('empNameInfo_token');
//       return cv;
//     });
//     dispatch({
//       type: types.UPDATE_AM_SLIP_REQUEST,
//       params: { approvalData: approvalData }
//     });
//     alert(` ${approvalData.length} 건 의 전표가 승인이 되었습니다. `);
//     positionGridApi.updateRowData({ remove: selectedData });
//   };

//   const companionBtn = async () => {
//     let selectedData = positionGridApi.getSelectedRows();
//     let companionData = selectedData.map((cv: any) => {
//       cv.slipStatus = '반려';
//       cv.companionDate = moment(new Date()).format('yyyy-MM-DD');
//       cv.companionEmpCode = sessionStorage.getItem('empCodeInfo_token');
//       cv.companionEmpName = sessionStorage.getItem('empNameInfo_token');
//       return cv;
//     });
//     dispatch({
//       type: types.UPDATE_AM_SLIP_REQUEST,
//       params: { approvalData: companionData }
//     });
//     alert(` ${companionData.length} 건 의 전표가 승인이 되었습니다. `);
//     positionGridApi.updateRowData({ remove: selectedData });
//   };

//   const slipChange = () => {
//     const rowData = positionGridApi.getSelectedRows();
//     setSlipNo(rowData[0].slipNo);
//   };

//   const onGridReady = (params: any) => {
//     setPositionGridApi(params.api);
//     params.api.sizeColumnsToFit();
//   };

//   return (
//     <Grid container spacing={gridSpacing}>
//       <Grid item xs={12} alignContent={'center'}>
//         <div>
//           <Typography variant="h3">[ 검색조건 ]</Typography>
//           <div>
//             <TextField
//               id="startDate"
//               type={'date'}
//               variant={'standard'}
//               sx={{ mx: 1 }}
//               value={startDate}
//               defaultValue={monthFirst}
//               onChange={(e) => {
//                 setStartDate(e.target.value);
//               }}
//             />
//             <TextField
//               id="endDate"
//               type={'date'}
//               variant={'standard'}
//               sx={{ mx: 1 }}
//               value={endDate}
//               defaultValue={today}
//               onChange={(e) => {
//                 setEndDate(e.target.value);
//               }}
//             />
//             <Button variant="contained" color="secondary" startIcon={<CalendarMonthIcon />} sx={{ mx: 1, mb: '10px' }} onClick={thisYear}>
//               올해
//             </Button>
//             <Button
//               variant="contained"
//               color="secondary"
//               startIcon={<SearchIcon />}
//               sx={{ mx: 1, mb: '10px' }}
//               onClick={approvalSearchData}
//             >
//               조회
//             </Button>
//           </div>
//         </div>
//         <MainCard
//           content={false}
//           title="전표"
//           sx={{
//             '&MuiCard-root': { color: theme.palette.text.primary }
//           }}
//           secondary={
//             <Grid container spacing={1}>
//               <Grid item>
//                 <Button variant="contained" color="secondary" onClick={approvalBtn} startIcon={<ApprovalIcon />}>
//                   전표승인
//                 </Button>
//               </Grid>
//               <Grid item>
//                 <Button variant="contained" color="secondary" onClick={companionBtn} startIcon={<CallMissedIcon />}>
//                   반려
//                 </Button>
//               </Grid>
//               <Grid item>
//                 <Button variant="contained" color="secondary" onClick={initalBtn} startIcon={<RefreshIcon />}>
//                   초기화
//                 </Button>
//               </Grid>
//             </Grid>
//           }
//         >
//           <Box
//             sx={{
//               height: 300,
//               width: '100%',
//               '& .MuiDataGrid-root': {
//                 border: 'none',
//                 '& .MuiDataGrid-cell': {
//                   borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
//                 },
//                 '& .MuiDataGrid-columnsContainer': {
//                   color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
//                   borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
//                 },
//                 '& .MuiDataGrid-columnSeparator': {
//                   color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
//                 }
//               }
//             }}
//           >
//             <DataGrid
//               hideFooter
//               rows={slipData}
//               columns={slipColumns}
//               //rowSelection="multiple"
//               //onGridReady={onGridReady}
//               //onRowClick={searchJour}
//               getRowId={(row) => row.slipNo}
//             />
//           </Box>
//         </MainCard>
//         <MainCard content={false} title="분개">
//           <Box
//             sx={{
//               height: 300,
//               width: '100%',
//               '& .MuiDataGrid-root': {
//                 border: 'none',
//                 '& .MuiDataGrid-cell': {
//                   borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
//                 },
//                 '& .MuiDataGrid-columnsContainer': {
//                   color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
//                   borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
//                 },
//                 '& .MuiDataGrid-columnSeparator': {
//                   color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
//                 }
//               }
//             }}
//           >
//             <DataGrid hideFooter rows={journalData} columns={indignationColumns} getRowId={(row) => row.journalNo} />
//           </Box>
//         </MainCard>
//       </Grid>
//     </Grid>
//   );
// };

// export default ApprovalManager;
