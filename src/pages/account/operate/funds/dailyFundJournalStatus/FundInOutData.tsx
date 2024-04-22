import React, { useState, useEffect } from 'react';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';

import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import UpcomingIcon from '@mui/icons-material/Upcoming';

import { useSelector, useDispatch } from 'react-redux';
import { operateActions } from 'store/redux-saga/reducer/operate/operateReducer';
type FundInOutDataColumnType = GridColDef<any, any>;

const FundInOutData = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [ searchDate, setSearchDate ] = useState<any>('');

    const [ outData, setOutData ] = useState([]);
    const [ inData, setInData ] = useState([]);
    
    const inoutPriceList = useSelector((state:any) => state.operate.expectedPriceList);
    const inPriceList = inoutPriceList.inExpectedPriceList;
    const outPriceList = inoutPriceList.outExpectedPriceList;

    //테이블 데이터
    useEffect(()=>{
        setInData(inPriceList || []);
        setOutData(outPriceList || []);
    },[inoutPriceList]);


    //입출금예정액 칼럼
    const fundInOutDataColumns:FundInOutDataColumnType[] = [
      { width: 200, headerName: '자금항목', field: 'accountName', align: 'center', headerAlign: 'center'},
      { width: 180, headerName: '적요', field: 'expenseReport', align: 'center', headerAlign: 'center' },
      { width: 180, headerName: '금액', field: 'price', type: 'date', align: 'center', headerAlign: 'center'  },
    ];

    //테이블 고유 id 생성함수
    const generateUniqueId = () => {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    };

    //조회
    const searchInoutData = () => {
        dispatch(operateActions.SelectInoutPriceRequest(searchDate));
    }

    const handleSearchDateChange = (event:any) => {
        setSearchDate(event.target.value);
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
                            label="조회일자"
                            fullWidth
                            id="fundDate"
                            margin="normal"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={ searchDate }
                            onChange = { handleSearchDateChange }
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
                                onClick={ searchInoutData }
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
                          height: '100%',
                          width: '100%',
                          marginTop: '10px',
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
                        <Grid container spacing={3}>
                             <Grid item xs={6}>
                                <Typography variant="h6" align="center" style={{ marginTop: 10, marginBottom: 10, fontSize:20 }}>
                                    [ 출금예정 ]
                                </Typography>
                                <DataGrid
                                    rows={outData}
                                    columns={fundInOutDataColumns}
                                    getRowId={generateUniqueId}
                                    style={{ height:'700px'}}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" align="center" style={{ marginTop: 10, marginBottom: 10, fontSize:20 }}>
                                    [ 입금예정 ] 
                                </Typography>
                                <DataGrid
                                    rows={inData}
                                    columns={fundInOutDataColumns}
                                    getRowId={generateUniqueId}
                                    style={{ height:'700px'}}
                                />
                            </Grid>
                         </Grid>
                      </Box>
                   </div>
               </div>
            </MainCard>
        </div>
    )
}
FundInOutData.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default FundInOutData
