import React, { useEffect } from 'react';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { Grid, Autocomplete, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';

import * as types from '../../../../store/slices/posting';
import { CurrentAssetColumnType } from './types/types';
import { useSelector, useDispatch } from 'react-redux';
import AutoComplete from 'pages/forms/components/autocomplete';

const NonCurrentAsset = () => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const currentAssetData = useSelector((state: any)=> state.posting.nonCurrentAsset);
    const assetList  = useSelector((state: any) => state.posting.assetList)

    useEffect(()=>{
    }, []);
    
    // autocomplete options
    const assetTypes = [
      { label: '설비장치', id: 1 },
      { label: '건물', id: 2 }
    ];

    //고정 자산 그리드 세팅
    const currentAssetColumns: CurrentAssetColumnType[] = [
      { width: '150', headerName: '계정코드', field: 'accountCode', key: 'accountCode', align: 'center' },
      { width: '180', headerName: '계정과목', field: 'accountName', key: 'accountName' },
      { width: '150', headerName: '자산코드', field: 'assetCode', key: 'assetCode' },
      { width: '180', headerName: '자산명', field: 'assetName', editable: true, key: 'assetName'}, // editable : 편집가능
      { width: '180', headerName: '취득일', field: 'progress', key: 'progress', type: 'date' },
      { width: '150', headerName: '처리여부', field: 'finalizeStatus', key: 'finalizeStatus' }
    ];
  
  return (
    <Grid container spacing={gridSpacing}> 
    <Grid item xs={12}>
    <div>
      <MainCard
        content={AutoComplete}
      >
        <Grid item xs={10} md={4} lg={2}>
          <Autocomplete
            disablePortal
            options={assetTypes}
            defaultValue={assetTypes[1]}
            renderInput={(params) => <TextField {...params} label="자산유형" />}
            />
        </Grid>

        <Box
          sx={{
            height: 300,
            width: '100%',
            marginTop: '10px',
            '& .MuiDataGrid-root': {
              border: '1px solid grey',
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
            rows={currentAssetData}
            columns={currentAssetColumns}
          />
        </Box>
      </MainCard>
      </div>
    </Grid>
  </Grid>
  );
};


NonCurrentAsset.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default NonCurrentAsset;
