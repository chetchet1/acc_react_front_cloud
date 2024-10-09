/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {gridSpacing} from "../../../../store/constant";

const TotalTrialBalanceGrid = () => {

    const totaltrialListData:any= useState<{
        totaltrialList: any;}[]>([]);

    const theme:any = useTheme();

    const columnDefs:any = [
        {
            headerName: '차변 잔액',
            field: 'debitsSumBalance',
            valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
            width: 250
        },
        {
            headerName: '차변 합계',
            field: 'debitsSum',
            valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
            width: 250
        },
        { headerName: ' 계정 과목 ', field: 'accountName' },
        {
            headerName: '대변 합계',
            field: 'creditsSum',
            valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
            width: 250
        },
        {
            headerName: '대변 잔액',
            field: 'creditsSumBalance',
            valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
            width: 250
        }
    ];

    return (
        <div>
            <MainCard
                content={false}
                sx={{
                    '&MuiCard-root': { color: theme.palette.text.primary }
                }}
            >
                {/* table data grid */}
                <div
                    className="ag-theme-balham"
                    style={{
                        height: 700,
                        width: '100%'
                    }}
                >

                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <MainCard
                                content={false}
                            >
                                {/* table */}
                                <TableContainer>
                                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                    {columnDefs.map((column:any) => (
                                                        <TableCell key={column.headerName}>
                                                            {column.headerName}
                                                        </TableCell>)

                                                    )}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                                <TableRow>
                                                    {totaltrialListData}
                                                </TableRow>
                                                <TableRow>

                                                </TableRow>

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </MainCard>
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>

                </div>

            </MainCard>
        </div>
    );
};

export default TotalTrialBalanceGrid;
