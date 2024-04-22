import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useSelector } from "react-redux";
import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import {useTheme} from "@mui/material/styles";
import {AgGridReact} from "ag-grid-react";
import {gridSpacing} from "../../../../../template/store/constant";
import { Button, Typography, Grid, Modal } from '@mui/material';
import { ChangeDetectionStrategyType } from 'ag-grid-react/lib/shared/changeDetectionService'


const CapitalStatementGrid = (props) => {
    const data = useSelector(state => state.RootReducers.AccReducer.StatementReducer.capitalList);

    const { isLoading } = useSelector(state => state.RootReducers.AccReducer.StatementReducer);

    const theme = useTheme();

    const currencyFormatter = (params) => {
        return formatNumber(params.value) + ' 원';
    };

    const formatNumber = (number) => {
        return Math.floor(number)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    const  columnDefs = [
        {
            headerName: '회계 년도',
            field: 'accountPeriodNo',
            width: 250
        },
        {
            headerName: '세부 항목',
            field: 'accountName',
            width: 250
        },
        { headerName: ' 자본금 ',
            field: 'capitalStock',
            valueFormatter: currencyFormatter,
            width: 250
        },
        {
            headerName: '자본 잉여금',
            field: 'capitalSurplus',
            valueFormatter: currencyFormatter,
            width: 250
        },
        {
            headerName: '이익 잉여금',
            field: 'retainedEarnings',
            valueFormatter: currencyFormatter,
            width: 250
        },
        {
            headerName: '기타 자본항목',
            field: 'etcCapital',
            valueFormatter: currencyFormatter,
            width: 250
        },
        {
            headerName: '기타포괄수익',
            field: 'otherAccumulative',
            valueFormatter: currencyFormatter,
            width: 250
        },
        {
            headerName: '자본 총계',
            field: 'totalStockholdersEquity',
            valueFormatter: currencyFormatter,
            width: 250
        }
    ];


    return (

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
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={data}
                        rowSelection="single"
                        // rowDataChangeDetectionStrategy={ChangeDetectionStrategyType.IdentityCheck}
                        getRowStyle={function (param) {
                            //가운데
                            if (param.node.rowPinned) {
                                return { 'font-weight': 'bold', background: '#dddddd' };
                            }
                            return { 'text-align': 'center' };
                        }}
                        onGridReady={(event) => {
                            event.api.sizeColumnsToFit();
                        }}
                        domLayout={'autoHeight'}
                    />
                </div>
            </MainCard>
        </div>
    );
};

export default CapitalStatementGrid;