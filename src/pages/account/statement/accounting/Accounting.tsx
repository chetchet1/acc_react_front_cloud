import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';

import React, { useState } from 'react';
import { Grid, Modal, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import TaskIcon from "@mui/icons-material/Task";
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { Box } from '@mui/system';

const Accounting = () => {

  // const data = useSelector((state) => state.RootReducers.AccReducer.StatementReducer.accountingList);
  const [data, setData] = useState([])
  const [data2,setData2] = useState([]);



  // const list = useSelector((state) => state.RootReducers.AccReducer.StatementReducer.periodNoList);
  const [list, setList] = useState([]);

  const [open, setOpen] = useState(false);
  const callResult = 'SEARCH';

  const periodListData = () => {
    setOpen(true);
    axios.get('http://localhost:9103/settlement/periodNoList')
      .then((res) => {
        console.log(res.data.periodNoList),
          setList(res.data.periodNoList)
      })
  };

  const searchData = (e: any) => {
    setOpen(false);
    console.log(e.id);
    console.log(e.row.accountPeriodNo)
    axios.get('http://localhost:9103/settlement/accounting',
      {
        params: {
          accountPeriodNo: e.row.accountPeriodNo
          , callResult: callResult
        }
      }
    )
      .then((res) => {
        console.log(res.data.accountingList)
        console.log(res.data.accountingList.incomeStatement[0].accountName)
        const result = res.data.accountingList.incomeStatement;
        setData(result)
      }
      );
  };

  const test = () => {

  }


  const columns = [
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




  const accountDetailcolums = [
    { field: 'accountName', headerName: '과목', width: 200, valueFormatter: preserveWhitespace }, // 값의 공백을 지우지 않고 모두 표출(계층 표시) cellStyle: { textAlign:'left', whiteSpace: 'pre' } -> 는 일반 TableCell 에서 적용 가능
    { field: 'income', headerName: '당기 금액', width: 170, editable:true },
    { field: 'incomeSummary', headerName: '당기 잔액', width: 170,editable:true },
    { field: 'earlyIncome', headerName: '전기 금액', width: 170,editable:true },
    { field: 'earlyIncomeSummary', headerName: '전기 잔액', width: 170,editable:true }
  ];


// 값의 공백을 지우지 않고 모두 표출(계층 표시)
  function preserveWhitespace(params: any) {
    const text = params.value.replace(/ /g, '\u00A0');
    return text;
  }



  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <div align="center">
          <div align="right">
            {/*<Button variant="contained" color="secondary" startIcon={<TaskIcon />} onClick={test}>
              결산
            </Button>
            <Button variant="contained" color="secondary">
              결산 취소
  </Button>*/}
          </div>
          <Typography variant="h3">[ 검색조건 ]</Typography>
          <div>
            <Button onClick={periodListData} variant="contained" color="secondary">
              결산 자료 불러오기
            </Button>
            <Modal open={open}>
              <div align="center">
                <div
                  className="ag-theme-balham"
                  style={{
                    width: '50%',
                    height: 500,
                    background: 'white'
                  }}
                >
                  <DataGrid
                    rows={list}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row.accountPeriodNo}
                    onRowClick={searchData}
                  />
                </div>
              </div>
            </Modal>
          </div>
          <MainCard
            content={false}
            title=''

          >
            {/* table data grid */}
            <div
              style={{
                height: '400',
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
                  columns={accountDetailcolums}
                  getRowId={(row) => row.accountInnerCode}
                  getRowClassName={(params) => {
                    return 'left-aligned-row'; // 사용자 지정 클래스 이름
                  }}
                  editMode='cell'//셀 클릭 후 Value 변경 Option
                />
              </Box>
            </div>
          </MainCard>
        </div>
      </Grid>
    </Grid>
  );
};


Accounting.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Accounting;