// material-ui
import { Box, Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@mui/material/Dialog';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as types from '../../../../store/slices/base';

const codeColumns = [
  { headerName: '코드 ', field: 'divisionCodeNo' },
  { headerName: '상세 코드', field: 'detailCode' },
  { headerName: '상세 코드 명', field: 'description', sortable: true }
];

// ==============================|| 계정과목관리 ||============================== //

const codeDialog = ({ open, onClose, setCodeName, codeData }) => {
  const theme = useTheme();

  const onRowClicked = (e: any) => {
    console.log('디비젼노노', e.row);
    setCodeName(e.row.description);
  };
  const setCode = () => {
    //여기서 로우를 업데이트 시켜줄 수 있으면 좋은데
    onClose(false);
  };

  return (
    <Dialog open={open}>
      <Grid container>
        <MainCard
          content={false}
          title="코드"
          secondary={
            <Grid container spacing={1}>
              <Grid item>
                <Button variant="contained" color="secondary" startIcon={<CheckIcon />} onClick={setCode}>
                  선택
                </Button>
              </Grid>
            </Grid>
          }
        >
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
            <DataGrid rows={codeData} columns={codeColumns} getRowId={(row) => row.detailCode} onRowClick={onRowClicked} />
          </Box>
        </MainCard>
      </Grid>
    </Dialog>
  );
};

export default codeDialog;
