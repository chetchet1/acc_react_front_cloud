/* eslint-disable prettier/prettier */
import React, { useState, useRef } from "react";
import { Button, Grid, Modal, Typography, Table, TableBody, TableCell, TableContainer, TableHead
    ,TableRow } from "@mui/material";
import { gridSpacing } from 'store/constant';
import Page from 'ui-component/Page';
import { DataGrid } from "@mui/x-data-grid";
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import { columns, columnDefs } from './CapitalStatementColumns'
import { settlementActions } from "store/redux-saga/reducer/settlement/settlementReducer";

const CapitalStatementMenu = () => {

    const [periodListModal, setPeriodListModal] = useState(false);

    const componentRef = useRef<HTMLDivElement>(null);

    // const [capitalStatementlist, setCapitalStatementlist]: any = useState('');

    const [capitalStatementlist, setCapitalStatementlist] = useState<{
        accountPeriodNo :any;
        accountName: any;
        capitalStock: any;
        capitalSurplus: any;
        etcCapital: any;
        otherAccumulative: any;
        retainedEarnings: any;
        totalStockholdersEquity: any;}[]>([]);
    
    const theme:any = useTheme();

    const callResult = 'SEARCH';
    const dispatch = useDispatch();

    
  // 회계연도 검색 클릭
    const accountPeriodList = () => {
        console.log('날짜 모달 ON');
        setPeriodListModal(true);
        dispatch(settlementActions.AccountPeriodNoRequest());
    };
    
      // 회계기수데이터
	const accountPeriodNoData = useSelector((state:any) => {
		console.log("----- state -----", state);
		return state.settlement.periodNoList
	})
    
    // 자본변동표 조회
    const searchData = (e: any) => {
        setPeriodListModal(false);
        console.log(e);
        axios.get(
            'http://localhost:9103/settlement/capitalstatement' ,
            {params:{accountPeriodNo: e.id, callResult: callResult}} 
        ).then((res) => {
            console.log(res.data);
            console.log(res.data.capitalList.capitalstatement);
            setCapitalStatementlist(res.data.capitalList.capitalstatement);
        })
        console.log(capitalStatementlist);
    }

    // pdf 다운로드
    const pdfDownload = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: "@Page { size: A4 landscape; margin:10; }",
        documentTitle: ' FinancialStatement '
    })

    return (
        <Page title="자본변동표">
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <div align="center">
                    <Typography variant="h3">[ 검색조건 ]</Typography>
                    <div>
                        <Button onClick={accountPeriodList}  sx={{ ml: 1, flex: 1 }} size="large" variant="contained" color="secondary">
                            회계 기수조회
                        </Button>
                        <Button variant="contained" sx={{ ml: 1, flex: 1 }} size="large" color="secondary" onClick={pdfDownload}>
                            출력
                        </Button>
                        <Modal open={periodListModal}>
                            <div align="center">
                                <div
                                    align="center"
                                    className="ag-theme-balham"
                                    style={{
                                        width: "50%"
                                        ,height: 500
                                        ,background: "white"
                                    }}
                                >
                                    <DataGrid
                                        rows={accountPeriodNoData}
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
        <div ref={componentRef}>
                <MainCard
                    content={false}
                    sx={{
                        '&MuiCard-root': {color: theme.palette.text.primary}
                    }}
                >
                    {/* table data grid */}
                    <div
                        className="ag-theme-balham"
                        style={{
                            height: 1000,
                            width : "100%",
                        }}
                    >

                                {/* <DataGrid
                                experimentalFeatures={{ columnGrouping: true }}
                                rows={capitalStatementlist}
                                columns={columnDefs}
                                getRowId={(row) => row.accountPeriodNo}           
                                /> */}

                                <TableContainer sx={{ maxHeight: 650 }}>
                                      <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                          <TableHead>
                                                  {columnDefs.map((column:any) => (
                                                      <TableCell align="center" key={column.headerName}>
                                                          {column.headerName}
                                                      </TableCell>
                                                                )
                                                            )
                                                        }
                                          </TableHead>
                                          <TableBody>
                                                 {capitalStatementlist.map((e:any) => (
                                                <TableRow key={e.accountName}>
                                                   <TableCell align="center">{e.accountPeriodNo}</TableCell>
                                                   <TableCell align="center">{e.accountName}</TableCell>
                                                   <TableCell align="center">{e.capitalStock}</TableCell>
                                                   <TableCell align="center">{e.capitalSurplus}</TableCell>
                                                   <TableCell align="center">{e.retainedEarnings}</TableCell>
                                                   <TableCell align="center">{e.etcCapital}</TableCell>
                                                   <TableCell align="center">{e.otherAccumulative}</TableCell>
                                                   <TableCell align="center">{e.totalStockholdersEquity}</TableCell>
                                                </TableRow>)
                                                        )
                                                    }
                                          </TableBody>
                                      </Table>
                                  </TableContainer>
                    </div>
                </MainCard>
            </div>
        </Page>
    );
};

export default CapitalStatementMenu;