import React, { useState, useEffect } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Button, Dialog, Grid, IconButton, TextField, Autocomplete } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { operateActions } from 'store/redux-saga/reducer/operate/operateReducer';

// assets
import CloseIcon from '@mui/icons-material/Close';
type CustomerCodeListColumnType = GridColDef<any, any>;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
}

interface AddFundCustomerCodeModalProps{
    open: boolean;
    onClose: (selectedCustomerCode: string, selectedCustomerName: string) => void;
}

const BootstrapDialogTitle = ({ children, ...other }: DialogTitleProps) => (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {<IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      }
    </DialogTitle>
  );

  const AddFundCustomerCodeModal: React.FC<AddFundCustomerCodeModalProps> = ({ open:custCodeModalOpen, onClose:closeCustCodeModal }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customerCodeList = useSelector((state:any) => state.operate.customerCodeList);
  
    const [ selectedCustomerCode, setSelectedCustomerCode ] = useState<string>('');
    const [ selectedCustomerName, setSelectedCustomerName ] = useState<string>('');
    const [ selectedWorkPlaceCode, setSelectedWorkPlaceCode ] = useState<any>('');
    const [ rows, setRows ] = useState<any[]>([]);

    const customerCodeListColumns:CustomerCodeListColumnType[] = [
      { width: 150, headerName: '사업장코드', field: 'workplaceCode', align: 'center', headerAlign: 'center' },
      { width: 150, headerName: '거래처코드', field: 'customerCode', align: 'center', headerAlign: 'center'  },
      { width: 150, headerName: '거래처명', field: 'customerName', align: 'center', headerAlign: 'center'  },
    ];

    const workPlaceCodeList = [
        {label: "------------------------------------------", value: ""},
        {label: "BRC-01 : 본사"     ,value: "BRC-01"},
        {label: "BRC-02 : 아웃소싱" ,value: "BRC-02"},
        {label: "BRC-03 : 은행"     ,value: "BRC-03"},
        {label: "BRC-04 : 보험사"   ,value: "BRC-04"},
        {label: "BRC-05 : 요식업체" ,value: "BRC-05"},
        {label: "BRC-06 : 병원"     ,value: "BRC-06"},
    ];

    const handleWorkPlaceClick = (value:any) => {
      setSelectedWorkPlaceCode(value);
    }

    //거래처 코드 조회
    useEffect(()=>{
      dispatch(operateActions.CustomerCodeRequest());
    }, []);

    //사업장 코드에 따른 거래처 목록
    useEffect(()=>{
      if(selectedWorkPlaceCode){
        console.log("selectedWorkPlaceCode111???", selectedWorkPlaceCode);
        const filteredRows = customerCodeList.accountCustomerList.filter((item:any) => 
                              item.workplaceCode === selectedWorkPlaceCode.value).map((item:any) => ({
                                  id: item.customerCode,
                                  workplaceCode: item.workplaceCode,
                                  customerCode: item.customerCode,
                                  customerName: item.customerName
        }));
        setRows(filteredRows);
      }else{
        const allRows = customerCodeList.accountCustomerList?.map((item: any) => ({
          id: item.customerCode,
          workplaceCode: item.workplaceCode,
          customerCode: item.customerCode,
          customerName: item.customerName
        }));
        setRows(allRows);
      }
    },[selectedWorkPlaceCode, customerCodeList]);

    const handleRowSelection = (selection:any) => {
      if(selection && selection.length > 0){
        const selectedRowId = selection[0];
        const selectedRowData = rows.find((row:any)=> row.id === selectedRowId);
        if(selectedRowData){
          setSelectedCustomerCode(selectedRowData.customerCode);
          setSelectedCustomerName(selectedRowData.customerName);
        }
      }
    }

    //부모 컴포넌트로 선택된 행의 데이터 보내기
    const handleModalClick = () => {
      closeCustCodeModal(selectedCustomerCode, selectedCustomerName);
    }

  return (
    <div>
      <BootstrapDialog onClose={closeCustCodeModal} aria-labelledby="customized-dialog-title" open={custCodeModalOpen}>
        <BootstrapDialogTitle id="customized-dialog-title">
          거래처코드 찾기
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <div style={{
                display:'flex',
            }}>
                <Grid item ml={9} mr={3} width={100}>
                    <TextField
                        fullWidth
                        id="customerCode"
                        placeholder="거래처코드"
                        value={ selectedCustomerCode }
                        disabled
                        />
                </Grid>
                <Grid item width={200}>
                    <Autocomplete
                        disablePortal
                        options={workPlaceCodeList}
                        renderInput={(params) => <TextField {...params} label="사업장코드" />}
                        onChange={(event, value)=> handleWorkPlaceClick(value)}
                        />
                </Grid>
            </div>

            <div style={{
                    borderBottom:'1px solid lightgrey',
                    marginTop: '20px',
                    marginBottom: '10px',
                  }} 
              />
              
            <DataGrid
                rows={rows}
                columns={customerCodeListColumns}
                getRowId={(row) => row.id}
                autoHeight
                onSelectionModelChange={handleRowSelection}
             />
        </DialogContent>
          <DialogActions>
            <Grid item mr={2} mt={1}>
              <Button 
                  variant="contained" 
                  color="secondary" 
                  sx={{ background: theme.palette.secondary.dark,
                        '&:hover': { background: theme.palette.secondary.main },
                        color: 'white.900',
                      }}
                  autoFocus 
                  onClick={handleModalClick}
              >
                  확인
              </Button>
            </Grid>
          </DialogActions>
      </BootstrapDialog>
    </div>
  )
}

export default AddFundCustomerCodeModal;