import React, { useState, useEffect } from 'react';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';

import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import ModeTwoToneIcon from '@mui/icons-material/ModeTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { useSelector, useDispatch } from 'react-redux';
import { operateActions } from 'store/redux-saga/reducer/operate/operateReducer';
import EditDailyFundModal from '../modal/EditDailyFundPlanModal';
import DeleteFundPlanModal from '../modal/DeleteFundPlanModal';
type DailyFundPlanColumnType = GridColDef<any, any>;

const DailyFundPlanDetail = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [ startDate, setStartDate ] = useState('');
    const [ endDate, setEndDate ] = useState('');
    
    const [ editFundModalOpen, setEditFundModalOpen ] = useState(false);
    const [ deleteModalOpen, setDeleteModalOpen ] = useState(false);

    const [ rowData, setRowData] = useState<any>('');
    const [ inRows, setInRows ] = useState([]);
    const [ outRows, setOutRows ] = useState([]);
    
    const ExpectedPlanList = useSelector((state:any) => state.operate.expectedPlanList);
    console.log("ExpectedPlanList??????", ExpectedPlanList);

    //테이블 데이터
    useEffect(()=>{
        setInRows(ExpectedPlanList.inExpectedPlanList || []);
        setOutRows(ExpectedPlanList.outExpectedPlanList || []);
    },[ExpectedPlanList]);

    //수정, 삭제 후 조회
    useEffect(()=>{
        if(!editFundModalOpen && !deleteModalOpen){
            const selectedData:any = { startDate, endDate }
                dispatch(operateActions.FundPlanDetailRequest(selectedData));
        }
    },[editFundModalOpen, deleteModalOpen]);

    //자금계획 데이터 칼럼
    const dailyFundPlanColumns:DailyFundPlanColumnType[] = [
      { width: 180, headerName: '계획번호', field: 'planNo', align: 'center', headerAlign: 'center' },
      { width: 120, headerName: '계획일자', field: 'planDate', align: 'center', headerAlign: 'center'  },
      { width: 100, headerName: '자금코드', field: 'fundCode', align: 'center', headerAlign: 'center'  },
      { width: 120, headerName: '자금과목', field: 'fundName', align: 'center', headerAlign: 'center' },
      { width: 120, headerName: '거래처코드', field: 'customerCode', type: 'date', align: 'center', headerAlign: 'center'  },
      { width: 130, headerName: '거래처명', field: 'customerName', align: 'center', headerAlign: 'center'  },
      { width: 180, headerName: '적요', field: 'expenseReport', align: 'center', headerAlign: 'center'  },
      { width: 150, headerName: '금액(₩)', field: 'price', align: 'center', headerAlign: 'center'  },
      { width: 100, headerName: 'ACTIONS', field: 'actions', align: 'center', headerAlign: 'center',
        renderCell: (params) => (
            <div style={{
                    display:'flex'
                }}>
                <div style={{ 
                        marginLeft:'10px'
                    }}>
                    <Button onClick={() => handleEdit(params.row)}><ModeTwoToneIcon /></Button>
                </div>
                <div style={{ 
                        marginLeft:'-25px'
                    }}>
                    <Button onClick={() => handleDelete(params.row)}><DeleteTwoToneIcon /></Button>
                </div>
            </div>
        )  },
    ];

    //조회
    const searchFundPlan = () => {
        const selectedDate:any = { startDate, endDate }
        dispatch(operateActions.FundPlanDetailRequest(selectedDate));
    }

    //수정
    const handleEdit = (params:any) => {
        console.log("params", params);
        setRowData(params);
        setEditFundModalOpen(true);
    }

    const closeModal = () => {
        setEditFundModalOpen(false);
        alert("계획이 성공적으로 수정되었습니다.");
    }

    //삭제
    const handleDelete = (params:any) => {
        console.log("params", params);
        setRowData(params);
        setDeleteModalOpen(true);
    }

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        alert("계획이 성공적으로 삭제되었습니다.");
    }

    const handleStartDateChange = (event:any) => {
        setStartDate(event.target.value);
    }

    const handleEndDateChange = (event:any) => {
        setEndDate(event.target.value);
    }

  return (
    <div>
      <MainCard>
        <div style={{
            border: '1px solid lightgrey',
            borderRadius: '10px',
            padding: '10px',
            marginTop: '5px'
        }}>
                
            <div style={{
                    display:'flex',
                    marginTop:'5px',
                    justifyContent:'center',
                    marginLeft:'-50px',
            }}> 
                <Grid item xs={6} sm={2} mr={3} width={195}>
                    <TextField
                        label="조회시작일자"
                        fullWidth
                        id="planDate"
                        margin="normal"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={ startDate }
                        onChange = { handleStartDateChange }
                    />
                </Grid>
                <Grid item xs={6} sm={2} mr={3} width={195}>
                    <TextField
                        label="조회종료일자"
                        fullWidth
                        id="planDate"
                        margin="normal"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={ endDate }
                        onChange = { handleEndDateChange }
                    />
                </Grid>
                <div style={{
                    display:'flex',
                    marginTop:'20px',
                    marginLeft:'-5px'
                }}
                >
                    <Grid item mr={2}>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            startIcon={<TroubleshootIcon />} aria-label="two layers" 
                            sx={{ background: theme.palette.secondary.dark,
                                  '&:hover': { background: theme.palette.secondary.main },
                                  color: 'white.900',
                                }}
                            onClick={ searchFundPlan }
                        >
                            조회
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            startIcon={<UpcomingIcon />} 
                            aria-label="two layers"
                            >
                            출력
                        </Button>
                    </Grid>
                </div>
            </div>

            <div>
                <Box
                    sx={{
                        height:'100%',
                        width:'100%',
                        marginTop:'10px',
                        '& .MuiDataGrid-root': {
                        border: '1px solid grey',
                        borderRadius: '10px',
                        padding: '10px',
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
                    rows={inRows}
                    columns={dailyFundPlanColumns}
                    getRowId={(row) => row.planNo}
                    autoHeight
                />
                </Box>
            </div>
            <div>
                <Box
                    sx={{
                        height:'100%',
                        width:'100%',
                        marginTop:'10px',
                        '& .MuiDataGrid-root': {
                        border: '1px solid grey',
                        borderRadius: '10px',
                        padding: '10px',
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
                    rows={outRows}
                    columns={dailyFundPlanColumns}
                    getRowId={(row) => row.planNo}
                    autoHeight
                />
                </Box>
              </div>
            </div>
        </MainCard>
      <EditDailyFundModal open={editFundModalOpen} onClose={closeModal} rowData={rowData}/>
      <DeleteFundPlanModal open={deleteModalOpen} onClose={closeDeleteModal} rowData={rowData}/>
    </div>
  )
}

DailyFundPlanDetail.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default DailyFundPlanDetail
