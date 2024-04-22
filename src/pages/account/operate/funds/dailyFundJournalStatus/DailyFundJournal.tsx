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
type DailyFundJournalColumnType = GridColDef<any, any>;

const DailyFundJournal = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [ searchDate, setSearchDate ] = useState<any>('');

    const [ data, setData ] = useState([]);
    
    const dailyTradeStatusList = useSelector((state:any) => state.operate.dailyTradeList.dailyTradeStatusList);
    console.log("dailyTradeStatusList??????", dailyTradeStatusList);

    //테이블 데이터
    useEffect(()=>{
        setData(dailyTradeStatusList || []);
    },[dailyTradeStatusList]);


    //일일거래증감현황 칼럼
    const dailyFundJournalColumns:DailyFundJournalColumnType[] = [
      { width: 30, headerName: '', field: '', align: 'center', headerAlign: 'center' },
      { width: 240, headerName: '구분', field: 'accountName', align: 'center', headerAlign: 'center'  },
      { width: 150, headerName: '전일잔액', field: 'previousBalance', align: 'center', headerAlign: 'center'  },
      { width: 100, headerName: '당일증가', field: 'dayIncrease', align: 'center', headerAlign: 'center' },
      { width: 100, headerName: '당일감소', field: 'dayDecrease', type: 'date', align: 'center', headerAlign: 'center'  },
      { width: 150, headerName: '당일잔액', field: 'dayBalance', align: 'center', headerAlign: 'center'  },
    ];

    //테이블 고유 id 생성함수
    const generateUniqueId = () => {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    };

    //조회
    const searchFundJournal = () => {
        dispatch(operateActions.SelectTradeStatusRequest(searchDate));
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
                            onClick={ searchFundJournal }
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
                    columns={dailyFundJournalColumns}
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

DailyFundJournal.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default DailyFundJournal
