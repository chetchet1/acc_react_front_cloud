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

import { useSelector, useDispatch } from 'react-redux';
import { operateActions } from 'store/redux-saga/reducer/operate/operateReducer';
type GeneralFundStatusColumnType = GridColDef<any, any>;

const GeneralFundStatus = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [ startDate, setStartDate ] = useState<any>('');
    const [ endDate, setEndDate ] = useState<any>('');
    const [ data, setData ] = useState([]);
    
    const generalFundList = useSelector((state:any) => state.operate.generalFundList.generalFundStatusList);
    console.log("generalFundList??????", generalFundList);

    //테이블 데이터
    useEffect(()=>{
        setData(generalFundList || []);
    },[generalFundList]);


    //총괄거래현황 칼럼
    const generalFundStatusColumns:GeneralFundStatusColumnType[] = [
      { width: 100, headerName: 'NO', field: 'indexNo', align: 'center', headerAlign: 'center'  },
      { width: 180, headerName: '구분', field: 'accountName', align: 'center', headerAlign: 'center'  },
      { width: 180, headerName: '거래처', field: 'customerName', align: 'center', headerAlign: 'center' },
      { width: 180, headerName: '전일잔액', field: 'previousBalance', type: 'date', align: 'center', headerAlign: 'center'  },
      { width: 180, headerName: '당일증감내역', field: 'dayInout', align: 'center', headerAlign: 'center'  },
      { width: 180, headerName: '당일잔액', field: 'dayBalance', align: 'center', headerAlign: 'center'  },
    ];

    //테이블 고유 id 생성함수
    const generateUniqueId = () => {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    };

    //조회
    const searchGeneralFund = () => {
        const selectDate:any = { startDate, endDate };
        dispatch(operateActions.SelectGeneralFundRequest(selectDate));
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
                    marginLeft:'-80px',
            }}> 
                <Grid item mr={2} width={195}>
                    <TextField
                        label="조회시작일자"
                        fullWidth
                        id="startDate"
                        margin="normal"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={ startDate }
                        onChange = { handleStartDateChange }
                    />
                </Grid>
                <Grid item mr={2} width={195}>
                    <TextField
                        label="조회종료일자"
                        fullWidth
                        id="endDate"
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
                            onClick={ searchGeneralFund }
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
                    rows={data}
                    columns={generalFundStatusColumns}
                    getRowId={generateUniqueId}
                    autoHeight
                />
                </Box>
              </div>
           </div>
        </MainCard>
    </div>
  )
}

GeneralFundStatus.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default GeneralFundStatus
