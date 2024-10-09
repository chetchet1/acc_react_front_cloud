/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Button, Grid, Modal, Typography, Table, TableBody, TableCell, TableContainer, TableHead
    ,TableRow } from "@mui/material";
import { gridSpacing } from 'store/constant';
import Page from 'ui-component/Page';
import { DataGrid } from "@mui/x-data-grid";
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { columns, columnDefs } from './CapitalStatementColumns'

const CapitalStatementMenu = () => {

    const [list, setList] = useState<{accountPeriodNo: any;}[]>([]);

    const [open, setOpen] = useState(false);

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
    // const dispatch = useDispatch();

    
    const periodListData = () => {
        setOpen(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ACC_URL}/settlement/periodNoList`)
            .then(res => 
                {
                console.log(res.data);
                setList(res.data.periodNoList);
                console.log(res.data.periodNoList);
                }
            )
        };

    const searchData = (e:any) => {
        setOpen(false);
        console.log(e);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ACC_URL}/settlement/capitalstatement`
        ,{params:{accountPeriodNo: e.id, callResult: callResult}
            }
            )
            .then((res) => {
                console.log(res.data);
                console.log(res.data.capitalList.capitalStatement);
                setCapitalStatementlist(res.data.capitalList.capitalStatement);
                    }
                 )
            console.log(capitalStatementlist);
        };

    
    return (
        <Page title="자본변동표">
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <div align="center">
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
                                    style={{
                                        width: "50%"
                                        ,height: 500
                                        ,background: "white"
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
                </div>
            </Grid>
        </Grid>
        <div>
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