import React, { useState, useEffect } from 'react';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';
import { operateActions } from 'store/redux-saga/reducer/operate/operateReducer';
// import { DepreciationColumnType } from '../types/types';
type DepreciationColumnType = GridColDef<any, any>;

const Depreciation = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const depreciationList = useSelector((state:any)=>state.operate.depreciationList);
    console.log("depreciationList???", depreciationList);
    // const [selectedData, setSelectedData] = useState<any>(null);
    const selectedDepList = useSelector((state:any)=>state.operate.selectedDepList);  
    console.log("selectedDepList??", selectedDepList);

    const depreciationColumns:DepreciationColumnType[] = [
        { width: 80,  headerName: '코드', field: 'accountCode', align: 'center', headerAlign: 'center' },
        { width: 130, headerName: '계정과목명', field: 'accountName', align: 'center', headerAlign: 'center'  },
        { width: 90,  headerName: '당기증감액', field: 'incDecExpense', align: 'center', headerAlign: 'center'  },
        { width: 90,  headerName: '기말잔액', field: 'endBalance', align: 'center', headerAlign: 'center'  },
        { width: 110, headerName: '기초가액', field: 'acqCost', align: 'center', headerAlign: 'center'  },
        { width: 180, headerName: '전기말상각누계액', field: 'initAccDepreciation', align: 'center', headerAlign: 'center' },
        { width: 120, headerName: '당기감가상각비', field: 'depExpense', align: 'center', headerAlign: 'center' },
        { width: 120, headerName: '충당금감소액', field: 'resfund', align: 'center', headerAlign: 'center' },
        { width: 170, headerName: '감가상각누계액', field: 'genDepExpense', align: 'center', headerAlign: 'center'  },
        { width: 170, headerName: '미상각잔액', field: 'currBookValue', align: 'center', headerAlign: 'center'  }
      ];

      const selectedDepListColumns:DepreciationColumnType[] = [
        { width: 100,  headerName: '코드', field: 'assetCode', align: 'center', headerAlign: 'center' },
        { width: 130, headerName: '고정자산명', field: 'assetName', align: 'center', headerAlign: 'center'  },
        { width: 110, headerName: '기초가액', field: 'acqCost', align: 'center', headerAlign: 'center'  },
        { width: 90, headerName: '당기증감액', field: 'incDecExpense', align: 'center', headerAlign: 'center'  },
        { width: 90, headerName: '기말잔액', field: 'endBalance', align: 'center', headerAlign: 'center'  },
        { width: 180, headerName: '전기말상각누계액', field: 'initAccDepreciation', align: 'center', headerAlign: 'center' },
        { width: 120, headerName: '당기감가상각비', field: 'depExpense', align: 'center', headerAlign: 'center' },
        { width: 120, headerName: '충당금감소액', field: 'resfund', align: 'center', headerAlign: 'center' },
        { width: 170, headerName: '감가상각누계액', field: 'genDepExpense', align: 'center', headerAlign: 'center' },
        { width: 170, headerName: '미상각잔액', field: 'currBookValue', align: 'center', headerAlign: 'center'  }
      ]; 

  useEffect(()=>{
    dispatch(operateActions.DepListRequest());
  }, []);

  const handleSelectionChange = (selection:any) => {
    console.log("selection??", selection);
    if(selection.length > 0){
        const selectedRowData = depreciationList.find((row:any)=> row.accountName === selection[0]);
        const selectedAccCode = selectedRowData?.accountCode;
        // setSelectedData(selectedAccCode);
        dispatch(operateActions.SelectedDepListRequest(selectedAccCode));
    }else{
       console.log("accountCode 안들어옴!")
    }
  }

  return (
    <div>
       <Grid container spacing={gridSpacing}> 
        <Grid item xs={12}>
        <div>
         <MainCard>
            <Box
                sx={{
                    height:'100%',
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
                <DataGrid
                    rows={depreciationList}
                    columns={depreciationColumns}
                    getRowId={(row) => row.accountName}
                    autoHeight
                    onSelectionModelChange={handleSelectionChange}
                />
                </Box>

                <Box
                sx={{
                    height:'100%',
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
                <DataGrid
                    rows={selectedDepList}
                    columns={selectedDepListColumns}
                    getRowId={(row) => row.assetName}
                    autoHeight
                />
                </Box>
            </MainCard>
         </div>
        </Grid>
       </Grid>
    </div>
  )
}

Depreciation.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default Depreciation
