import React, { useEffect } from 'react';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { Grid, Autocomplete, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';

import { useSelector, useDispatch } from 'react-redux';
import AutoComplete from 'pages/forms/components/autocomplete';
import { operateActions } from 'store/redux-saga/reducer/operate/operateReducer';
import AddFixedAsset from './AddFixedAsset';

const FixedAsset = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    //자산유형
    const fixedAssetCode = useSelector((state:any) => state.operate.fixedAssetCode);
    console.log("fixedAssetCode?>?/?//?", fixedAssetCode);
    
    //고정자산목록
    const fixedAssetListData = useSelector((state: any)=> state.operate.fixedAssetList);
    const fixedAssetList = fixedAssetListData.findFixedAssetList || [];
    console.warn("fixedAssetList?????", fixedAssetList);
    type FixedAssetColumnType = GridColDef<any, any>;

    useEffect(()=>{
      dispatch(operateActions.FixedAssetCodeRequest());
    }, []);
    

    //고정 자산 그리드 세팅
    const fixedAssetColumns:FixedAssetColumnType[] = [
      { width: 100, headerName: '계정코드', field: 'accountCode', align: 'center', headerAlign: 'center' },
      { width: 180, headerName: '계정과목', field: 'accountName', align: 'center', headerAlign: 'center'  },
      { width: 150, headerName: '자산코드', field: 'assetCode', align: 'center', headerAlign: 'center'  },
      { width: 180, headerName: '자산명', field: 'assetName', align: 'center', headerAlign: 'center' },
      { width: 180, headerName: '취득일', field: 'acqDate', type: 'date', align: 'center', headerAlign: 'center'  },
      { width: 150, headerName: '처리여부', field: 'compStatus', align: 'center', headerAlign: 'center'  }
    ];

    const handleAssetName = (value:any) => {
      const selectedData:any = { accountName: value.label, accountCode: value.value }
      if(selectedData){
        dispatch(operateActions.FixedAssetListRequest(selectedData)); // 선택한 데이터 값
      }
    }
  
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
            options={fixedAssetCode.map((asset:any) => ({label: asset.assetName, value: asset.assetCode}))}
            defaultValue={fixedAssetCode[1] }
            renderInput={(params) => <TextField {...params} label="자산유형" />}
            onChange={(event, value)=> handleAssetName(value)} //사용자가 선택하면 호출하는 함수
            />
        </Grid>

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
            rows={fixedAssetList}
            columns={fixedAssetColumns}
            getRowId={(row) => row.assetCode}
            autoHeight
          />
        </Box>
        <div>
          <AddFixedAsset />
        </div>
      </MainCard>
      </div>
    </Grid>
  </Grid>
  );
};


FixedAsset.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default FixedAsset;
