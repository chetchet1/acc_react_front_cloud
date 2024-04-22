/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    Button, Grid, Modal, Typography, Table, TableBody, TableCell, TableContainer, TableHead
    , TableRow
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { gridSpacing } from 'store/constant';
import Page from 'ui-component/Page';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import axios from "axios";
import { ColumnPropsTotalTrialBalance, ColumnProps } from 'pages/account/settlement/totaltrialbalance/types/types';
import { settlementActions } from 'store/redux-saga/reducer/settlement/settlementReducer';


const TotalTrialBalanceMenu = () => {

    const [list, setList] = useState<{ accountPeriodNo: any; }[]>([]); // ------------ 🎈

    const [open, setOpen] = useState(false);

    const [totaltrialListData, setTotaltrialListData] = useState<ColumnPropsTotalTrialBalance[]>([]);

    const callResult = 'SEARCH';

    const theme: any = useTheme();

    const periodNo = useState<any>('');

    // 회계기수조회 버튼 함수 수정 전🎈
    const periodListData = () => {
        setOpen(true);
        axios.get('http://localhost:9103/settlement/periodNoList')
            .then((res:any) => {
                console.log("res.data???", res.data);
                setList(res.data.periodNoList);
                console.log("res.data.periodNoList????", res.data.periodNoList);
            }
            )
    };


    // 회계기수를 선택하면 이를 바탕으로 데이터를 찾아옴
    const searchData = (e: any) => {
        setOpen(false);
        console.log(e); // 날짜 객체 정보
        axios.get('http://localhost:9103/settlement/totaltrialbalance'
            , {
                params: { accountPeriodNo: e.id, callResult: callResult }
            }
        )
            .then((res) => {
                // console.log(res.data.totaltrialList.totalTrialBalance);
                console.log("----- res.data -----", res.data);
                // setTotaltrialListData(res.data.totaltrialList.totalTrialBalance);
            }
            )
            console.log("callResult ?", callResult); // 매개변수로 넘어갈 callResult?
    };

    const earlyStatement = () => { // 결산 버튼
        console.log("----- periodNo ------", periodNo);
        axios.get('http://localhost:9103/settlement/earlyStatements'
        , {
            params: { 
                accountPeriodNo: periodNo, callResult: callResult }
        })
        console.log("callResult ?", callResult); // 매개변수로 넘어갈 callResult?
        alert('결산 실행')
    };

    const columns: ColumnProps[] = [
        {
            headerName: '회계 기수'
            , field: 'accountPeriodNo'
            , width: 80
        },
        {
            headerName: '회계 시작일'
            , field: 'periodStartDate'
            , width: 150
        },
        {
            headerName: '회계 종료일'
            , field: 'periodEndDate'
            , width: 150
        }
    ];



    const columnDefs: ColumnProps[] = [
        {
            headerName: ' 계정 과목 '
            , field: 'accountName'
            , width: 250
        },
        {
            headerName: '차변 합계'
            , field: 'debitsSum'
            , valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"'
            , width: 250
        },
        {
            headerName: '차변 잔액'
            , field: 'debitsSumBalance'
            , valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"'
            , width: 250
        },
        {
            headerName: '대변 합계'
            , field: 'creditsSum'
            , valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"'
            , width: 250
        },
        {
            headerName: '대변 잔액'
            , field: 'creditsSumBalance'
            , valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"'
            , width: 250
        }
    ];



    return (

        <Page title="합계잔액시산표">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <div align="center">
                        <div align="right">
                            <Button variant="contained" color="secondary" onClick={earlyStatement}>
                                결산
                            </Button>
                            <Button variant="contained" color="secondary">
                                결산 취소
                            </Button>
                        </div>
                        <Typography variant="h3">[ 검색조건 ]</Typography>
                        <div>
                            <Button onClick={periodListData} variant="contained" color="secondary">
                                회계 기수조회
                            </Button>
                            <Modal open={open}>
                                <div align="center">
                                    <div
                                        align="center"
                                        className="ag-theme-balham"
                                        style={
                                            {
                                                width: '50%'
                                                , height: 500
                                                , background: 'white'
                                            }
                                        }
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
                    </div>
                </Grid>
            </Grid>

            <div>
                <MainCard
                    content={false}
                    sx={
                        {
                            '&MuiCard-root': { color: theme.palette.text.primary }
                        }
                    }
                >
                    {/* table data grid */}
                    <div
                        className="ag-theme-balham"
                        style={
                            {
                                height: 700
                                , width: '100%'
                            }
                        }
                    >
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <MainCard
                                    content={false}
                                >
                                    {/* table */}
                                    <TableContainer sx={{ maxHeight: 650 }}>
                                        <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                            <TableHead>
                                                {columnDefs.map((column: any) => (
                                                    <TableCell align="center" key={column.headerName}>
                                                        {column.headerName}
                                                    </TableCell>
                                                )
                                                )
                                                }
                                            </TableHead>
                                            <TableBody>
                                                {totaltrialListData.map((e: any) => (
                                                    <TableRow key={e.accountName}>
                                                        <TableCell style={{ whiteSpace: 'pre' }}>{e.accountName}</TableCell>
                                                        <TableCell align="center">{e.debitsSum}</TableCell>
                                                        <TableCell align="center">{e.debitsSumBalance}</TableCell>
                                                        <TableCell align="center">{e.creditsSum}</TableCell>
                                                        <TableCell align="center">{e.creditsSumBalance}</TableCell>
                                                    </TableRow>)
                                                )
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </MainCard>
                            </Grid>
                        </Grid>
                    </div>
                </MainCard>
            </div>
        </Page>

    );
};

export default TotalTrialBalanceMenu;
