import React, { useEffect } from 'react';
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
type FixedAssetLedgerColumnType = GridColDef<any, any>;


const FixedAssetLedger = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const fixedAssetLedgerList = useSelector((state:any) => state.operate.fixedAssetLedger);
    
    //테이블 고유 id 생성함수
    const generateUniqueId = () => {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    };

    const fixedAssetLedgerColumns: FixedAssetLedgerColumnType[] = [
        { width: 80,  headerName: '계정코드', field: 'accountCode', align: 'center', headerAlign: 'center' },
        { width: 150, headerName: '계정과목명', field: 'accountName', align: 'center', headerAlign: 'center' },
        { width: 130, headerName: '자산코드', field: 'assetCode', align: 'center', headerAlign: 'center' },
        { width: 130, headerName: '자산명', field: 'assetName', align: 'center', headerAlign: 'center' },
        { width: 110, headerName: '취득일자', field: 'acqDate', align: 'center', headerAlign: 'center' },
        { width: 150, headerName: '기초가액', field: 'acqCost', align: 'center', headerAlign: 'center' },
        { width: 100, headerName: '당기증감액', field: 'incDecExpense', align: 'center', headerAlign: 'center' },
        { width: 100, headerName: '기말잔액', field: 'endBalance', align: 'center', headerAlign: 'center' },
        { width: 160, headerName: '전기말상각누계액', field: 'initAccDepreciation', align: 'center', headerAlign: 'center' },
        { width: 160, headerName: '당기감가상각비', field: 'genDepExpense', align: 'center', headerAlign: 'center' },
        { width: 160, headerName: '당기말상각누계액', field: 'currAccDepreciation', align: 'center', headerAlign: 'center' },
        { width: 160, headerName: '당기말장부가액', field: 'currBookValue', align: 'center', headerAlign: 'center' }
    ];
    

    useEffect(()=>{
        dispatch(operateActions.FixedAssetLedgerRequest());
    }, []);

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
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200',
                        textAlign: 'center'
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
                    rows={fixedAssetLedgerList.map((row:any) => ({ ...row, id: generateUniqueId() }))}
                    columns={fixedAssetLedgerColumns}
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

FixedAssetLedger.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default FixedAssetLedger
