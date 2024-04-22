import React, { useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Button, Dialog, Grid, IconButton, TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';

// assets
import CloseIcon from '@mui/icons-material/Close';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SearchIcon from '@mui/icons-material/Search';

import { useDispatch, useSelector } from 'react-redux';
import { operateActions } from 'store/redux-saga/reducer/operate/operateReducer';
type FundCodeListColumnType = GridColDef<any, any>;

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

interface AddFundCodeModalProps{
    open: boolean;
    onClose: (selectedAccountId: string, selectedAccName: string) => void;
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

  const AddFundCodeModal: React.FC<AddFundCodeModalProps> = ({ open:isModalOpen, onClose:closeModal }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const accountCodeList = useSelector((state:any) => state.operate.accountCodeList);
    const selectedAccCode = useSelector((state:any) => state.operate.selectedAccCode);
    console.log("selectedAccCode!!!!!@@@####", selectedAccCode);
  
    const [ selectedAccountId, setSelectedAccountId ] = useState<string>('');
    const [ selectedAccName, setSelectedAccName ] = useState<string>('');
    const [ rows, setRows ] = useState<any>('');

    const fundCodeListColumns:FundCodeListColumnType[] = [
      { width: 100, headerName: '자금코드', field: 'accountInnerCode', align: 'center', headerAlign: 'center' },
      { width: 180, headerName: '자금과목', field: 'accountName', align: 'center', headerAlign: 'center'  },
    ];

    const handleRowSelection = (selection:any) => {
      console.log('selection???', selection);
      if(selection && selection.length > 0 ){
        const selectedRowId = selection[0];
        const selectedRowData = rows.find((row:any) => row.id === selectedRowId);
        if(selectedRowData){
          setSelectedAccountId(selectedRowData.accountInnerCode);
          setSelectedAccName(selectedRowData.accountName);
        }
      }
    }

    const searchFundCode = accountCodeList.accountCodeList?.map((item: any) => ({
        id: item.accountInnerCode,
        accountInnerCode: item.accountInnerCode,
        accountName: item.accountName
    })) ?? [];
    
    
    const selectedFundCode = selectedAccCode.accountCodeList?.map((item: any) => ({
        id: item.accountInnerCode,
        accountInnerCode: item.accountInnerCode,
        accountName: item.accountName
    })) ?? [];


    //계정코드 전체조회
    const searchFundCodeClick = () => {
        dispatch(operateActions.FundCodeListRequest());
        setRows(searchFundCode);
    }

    //계정코드 조건조회
    const selectedFundCodeClick = () => {
      const selectedData:any = { accountId: selectedAccountId, accountName: selectedAccName }
      dispatch(operateActions.SelectedFundCodeRequest(selectedData));
      setRows(selectedFundCode);
    }

    //부모 컴포넌트로 선택된 행의 데이터 보내기
    const handleModalClick = () => {
      closeModal(selectedAccountId, selectedAccName);
    }

  return (
    <div>
      <BootstrapDialog onClose={closeModal} aria-labelledby="customized-dialog-title" open={isModalOpen}>
        <BootstrapDialogTitle id="customized-dialog-title">
          자금코드 찾기
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <div style={{
                display:'flex',
            }}>
                <Grid item xs={6} sm={2} mr={3}>
                    <TextField
                        label="자금코드"
                        fullWidth
                        id="fundCode"
                        placeholder="자금코드를 입력하세요."
                        value={ selectedAccountId }
                        onChange={(e) => setSelectedAccountId(e.target.value)}
                        />
                </Grid>
                <Grid item mt={1}>
                  <Button 
                      variant="contained" 
                      color="secondary"  
                      aria-label="two layers"
                      onClick={selectedFundCodeClick}
                      >
                    <SearchIcon />
                  </Button>
                </Grid>
                <Grid item mr={2} mt={1}>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        sx={{ background: theme.palette.secondary.dark,
                            '&:hover': { background: theme.palette.secondary.main },
                            color: 'white.900',
                            }}
                        onClick={searchFundCodeClick}
                    >
                        전체조회
                    </Button>
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
                columns={fundCodeListColumns}
                getRowId={(row) => row.id}
                autoHeight
                onSelectionModelChange={handleRowSelection}
             />
        </DialogContent>
        <DialogActions>
        <Grid item mr={5}>
            <Button 
                variant="outlined" 
                color="secondary" 
                startIcon={<SaveAltIcon />} 
                aria-label="two layers"
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

export default AddFundCodeModal;