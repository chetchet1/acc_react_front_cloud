import React, { useState, useEffect } from 'react';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, Button, TextField, Autocomplete } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';

import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import UpcomingIcon from '@mui/icons-material/Upcoming';

import { useSelector, useDispatch } from 'react-redux';
import { operateActions } from 'store/redux-saga/reducer/operate/operateReducer';
type FinanceStatusColumnType = GridColDef<any, any>;

const FinanceStatus = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [ searchDate, setSearchDate ] = useState<any>('');
    const [ data, setData ] = useState([]);
    const [ accName, setAccName ] =useState('');
    
    const financeList = useSelector((state:any) => state.operate.financeStatusList.financeStatusList);
    console.log("financeList??????", financeList);

    //테이블 데이터
    useEffect(()=>{
        setData(financeList || []);
    },[financeList]);


    //예적금현황 칼럼
    const financeStatusColumns:FinanceStatusColumnType[] = [
      { width: 120, headerName: 'CODE', field: 'customerCode', align: 'center', headerAlign: 'center'  },
      { width: 180, headerName: '개설점', field: 'customerName', align: 'center', headerAlign: 'center'  },
      { width: 150, headerName: '계좌번호', field: 'accountNo', align: 'center', headerAlign: 'center' },
      { width: 150, headerName: '전일잔액', field: 'previousBalance', type: 'date', align: 'center', headerAlign: 'center'  },
      { width: 150, headerName: '증가', field: 'increase', align: 'center', headerAlign: 'center'  },
      { width: 150, headerName: '감소', field: 'decrease', align: 'center', headerAlign: 'center'  },
      { width: 150, headerName: '당일잔액', field: 'dayBalance', align: 'center', headerAlign: 'center'  },
      { width: 150, headerName: '한도잔액', field: 'limitBalance', align: 'center', headerAlign: 'center'  },
    ];

    //계정과목 구분
    const accountNameList = [
        {label: "1.당좌예금", value: "당좌예금"},
        {label: "2.보통예금", value: "보통예금"},
        {label: "3.제예금",   value: "제예금"},
        {label: "4.정기예금", value: "정기예금"},
        {label: "5.정기적금", value: "정기적금"},
    ];

    //테이블 고유 id 생성함수
    const generateUniqueId = () => {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    };

    //조회
    const searchFinanceData = () => {
        const selectedData:any = { date: searchDate, accountName: accName };
        dispatch(operateActions.SelectFinanceStatusRequest(selectedData));
    }

    const handleSearchDateChange = (event:any) => {
        setSearchDate(event.target.value);

    }

    //계정과목 구분
    const handleOptionsChange = (value:any) => {
        console.log("value???", value);
        setAccName(value?.value);
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
                <Grid item mr={2} width={195} mt={2}>
                    <Autocomplete
                        disablePortal
                        options={accountNameList}
                        defaultValue={accountNameList[0]}
                        renderInput={(params) => <TextField {...params} label="자산유형" />}
                        onChange={(event, value)=> handleOptionsChange(value)}
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
                            onClick={ searchFinanceData }
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
                    columns={financeStatusColumns}
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

FinanceStatus.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default FinanceStatus
