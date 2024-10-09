// material-ui
import { Box, Grid, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
//project imports
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../../store/reducers/base/BaseReducer';

import { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import moment from 'moment/moment';
import accountApi from 'api/accountApi';

const YearColumns = [
    { headerName: '시작날짜', field: 'periodStartDate', textAlign: 'center'},
    { headerName: '끝난날짜', field: 'periodEndDate' }
];

const YearDialog = ({ open, onClose, setYear, setPeriodno }: any) => {
    const theme = useTheme();

    // const [periodNoList, setPeriodNoList] = useState();

    // const searchYear  = async ()=>{
    //     await accountApi.get('/settlement/periodNoList', {})
    //         .then(res => {
    //             setPeriodNoList(res.data)
    //         }).catch(e => console.error(e))
    // }

    // useEffect(()=>{
    //     searchYear();
    // }, [periodNoList]);

    const yearData = useSelector((state: any) => state.RootReducers.AccReducer.BaseReducer.periodNoList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: types.SEARCH_PERIOD_NO_REQUEST
        });
    }, []);

    const onRowClicked = (e: any) => {
        let year = moment(new Date(e.row.periodStartDate)).format('yyyy');
        setYear(year + "년");
        setPeriodno(e.row.accountPeriodNo);
        onClose(false);
    };

    const closeBtn = (e: any)=>{
        console.log('닫기(데코임)')
    }

    return (
        <Dialog open={open} fullWidth={true} maxWidth={'xs'}>
            <Grid container spacing={gridSpacing}>
                <Grid item sm={12}>
                    <MainCard content={false} title="년도">
                        {/* table data grid */}
                        <Box
                            sx={{
                                height: 500,
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
                                rows={yearData}
                                columns={YearColumns}
                                getRowId={(row) => row.accountPeriodNo}
                                onRowClick={onRowClicked}
                            />
                        </Box>
                        <Button color="secondary" onClick={closeBtn}>close</Button>
                    </MainCard>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default YearDialog;