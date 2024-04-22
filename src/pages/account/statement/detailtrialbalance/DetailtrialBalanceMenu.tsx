import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import { Box, Grid, Button, Typography, Dialog } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { getSelectDate, getTrialDate, requestSearchDate } from 'store/slices/detailTrial';

// 월계표 월 그리드 칼럼
const monthColumns = [
  {
    headerName: '조회 월',
    field: 'month',
    width: 150
  },
  {
    headerName: '시작월일',
    field: 'monthStartDate',
    width: 150
  },
  {
    headerName: '종료월일',
    field: 'monthEndDate',
    width: 150
  }
];

// 월계표 년도 그리드 칼럼
const yearColumns = [
  {
    headerName: '회계 년도',
    field: 'fiscalYear'
  },
  {
    headerName: '회계 시작일',
    field: 'periodStartDate',
    width: 150
  },
  { headerName: '회계 종료일', field: 'periodEndDate', width: 150 }
];

const DetailtrialBalanceMenu: React.FC = () => {
  // 일계표(승인된 전표 기록을 바탕으로 기간별 거래 내역을 확인할 수 있습니다. 사업장과 전표일을 지정한 후 검색하면 해당되는 기간의 차변과 대변 금액이 계정 과목별로 표시됩니다.)

  const [monthOpen, setMonthOpen] = useState(false);
  const [month, setMonth] = useState('XX');

  const [yearOpen, yearSetOpen] = useState(false);
  const [year, setYear] = useState('XX');

  const dispatch = useDispatch();

  // 년도 가져오는 데이터
  const data = useSelector(
    // console.log(getDetailDate());
    (state: any) => {
      return state.detailTrial.detailDate.periodNoList;
    }
  );
  console.log('data: ', data);
  // 월 가져오는 데이터
  const monthList = useSelector((state: any) => {
    return state.detailTrial.choicedate.monthList;
  });

  const yearListData1 = () => {
    //월계표조회 누르면 실행
    yearSetOpen(true); //년도 모달을 띄움
    dispatch(requestSearchDate() as any);
  };

  const searchYearData = useCallback(
    (e: GridRowParams) => {
      yearSetOpen(false); // 기존 모달을 닫고
      setYear(e.row.fiscalYear); // 년도를 useState로 저장
      setMonthOpen(true); // 새 모달을 열기
      dispatch(getSelectDate() as any);
    },
    [dispatch]
  );
  const searchMonthData = useCallback(
    (e: GridRowParams) => {
      setMonthOpen(false);
      setMonth(e.row.month);
      let params = {
        fromDate: year + '-' + e.row.monthStartDate, // 달의 첫날s
        toDate: year + '-' + e.row.monthEndDate // 달의 마지막날
      };
      dispatch(getTrialDate(params) as any);
    },
    [dispatch, year]
  );
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          {year}년 {month}월
        </Typography>
        <div>
          <Button onClick={yearListData1} variant="contained" color="secondary">
            월계표 조회
          </Button>
          <Dialog open={yearOpen} fullWidth={true} maxWidth={'xs'} sx={{ textAlign: 'center' }}>
            <div
              style={{
                height: 400,
                width: '100%'
              }}
            >
              <Box
                sx={{
                  height: 400,
                  width: '100%',
                  background: 'white'
                }}
              >
                <DataGrid
                  rows={data}
                  columns={yearColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  getRowId={(row) => row.accountPeriodNo}
                  onRowClick={searchYearData}
                />
              </Box>
            </div>
          </Dialog>
          <Dialog open={monthOpen} fullWidth={true} maxWidth={'sm'} sx={{ textAlign: 'center' }}>
            <div
              style={{
                height: 400,
                width: '100%'
              }}
            >
              <Box
                sx={{
                  height: 400,
                  width: '100%',
                  background: 'white'
                }}
              >
                <DataGrid
                  rows={monthList}
                  columns={monthColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  getRowId={(row) => row.month}
                  onRowClick={searchMonthData}
                />
              </Box>
            </div>
          </Dialog>
        </div>
      </Grid>
    </Grid>
  );
};

export default DetailtrialBalanceMenu;
