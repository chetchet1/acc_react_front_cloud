// material-ui
import { Box, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
//project imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import * as types from '../../../../store/reducers/base/BaseReducer';

// DEPARTMENT 테이블관련으로 만들 수 있을듯.

const WorkPlaceColumns = [
    { headerName: '사업장코드', field: 'workplaceCode', align: 'center', headerAlign: 'center' },
    { headerName: '사업장명', field: 'workplaceName', width: 185, align: 'center', headerAlign: 'center' }
];

const DeptColumns = [
    { headerName: '부서코드', field: 'deptCode', align: 'center', headerAlign: 'center'},
    { headerName: '부서명', field: 'deptName', align: 'center', headerAlign: 'center', width: 180 }
];

const DeptDialog = ({ open2, onClose2, setWorkplace, setDname, setDeptCdoe, setWorkplaceCode }: any) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const workplacedata = useSelector((state: any) => state.RootReducers.AccReducer.BaseReducer.deptList);
    const deptDetailData = useSelector((state: any) => state.RootReducers.AccReducer.BaseReducer.detailDeptList);

    // 앞단에서 중복제거용도. 
    // const uniqueWorkplace = _.uniqBy(workplacedata, 'workplaceCode');

    useEffect(() => {
        dispatch({
            type: types.SEARCH_WORKPLACE_REQUEST
        });
    }, []);

    const onRowClicked2 = (e: any) => {
        setWorkplace(e.row.workplaceName);
        setWorkplaceCode(e.row.workplaceCode);
        dispatch({
            type: types.SEARCH_DEPT_REQUEST,
            params: {
                workplaceCode: e.row.workplaceCode
            }
        });
    };

    const onDeptSet = (e: any) => {
        setDname(e.row.deptName);
        setDeptCdoe(e.row.deptCode);
        onClose2(false);
        dispatch({
            type: types.SEARCH_ACCOUNT_REQUEST
        });
    };

    return (
        <Dialog open={open2} fullWidth={true} maxWidth={'sm'}>
            <Grid container spacing={gridSpacing}>
                <Grid item sm={6}>
                    <MainCard content={false} title="사업장">
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
                                rows={workplacedata}
                                columns={WorkPlaceColumns}
                                getRowId={(row) => row.workplaceCode}
                                onRowClick={onRowClicked2}
                            />
                        </Box>
                    </MainCard>
                </Grid>
                <Grid item sm={6}>
                    <MainCard content={false} title="부서">
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
                            <DataGrid rows={deptDetailData} 
                            columns={DeptColumns} 
                            getRowId={(row) => row.deptCode} 
                            onRowClick={onDeptSet} />
                        </Box>
                    </MainCard>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default DeptDialog;