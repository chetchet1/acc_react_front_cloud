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

const customerColumns = [
  { headerName: '거래처 코드', field: 'customerCode', sortable: true },
  { headerName: '거래처 명', field: 'customerName' }
];

// ==============================|| 계정과목관리 ||============================== //

const CustomerDialog = ({ open, onClose, setCustomerCode, setCustomerName }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const customerData = useSelector((state: any) => state.base.accountCustomerList);
  console.log("customerData???", customerData);

  useEffect(() => {
    dispatch({
      type: types.SEARCH_CUSTOMERS_REQUEST
    });
  }, []);

  const onRowClicked = (e) => {
    console.log(e);
    setCustomerCode(e.row.customerCode);
    setCustomerName(e.row.customerName);
  };
  const setAccountDetail = () => {
    onClose(false);
  };

  return (
    <Dialog open={open}>
      <Grid container>
        <MainCard
          content={false}
          title="거래처"
          secondary={
            <Grid container spacing={1}>
              <Grid item>
                <Button variant="contained" color="secondary" startIcon={<CheckIcon />} onClick={setAccountDetail}>
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
            <DataGrid
              rows={customerData}
              columns={customerColumns}
              // pageSize={15}
              // rowsPerPageOptions={[5]}
              getRowId={(row) => row.customerCode}
              onRowClick={onRowClicked}
            />
          </Box>
        </MainCard>
      </Grid>
    </Dialog>
  );
};

export default CustomerDialog;
