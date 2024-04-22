import React from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Button, Dialog, Grid, IconButton } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useTheme } from '@mui/material/styles';
import Swal from 'sweetalert2';

// assets
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { PlanDataType } from '../../types/types';
import { useDispatch } from 'react-redux';
import { operateActions } from 'store/redux-saga/reducer/operate/operateReducer';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '400px', 
  },
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

interface DeleteFundCodeModalProps{
    open: boolean;
    onClose: () => void;
    rowData: PlanDataType;
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

  const DeleteFundPlanModal: React.FC<DeleteFundCodeModalProps> = ({ open:deleteModalOpen, onClose:closeDeleteModal, rowData:rowData }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    //부모 컴포넌트로 선택된 행의 데이터 보내기
    const DeleteBtnClick = () => {
        const planNo:any = rowData.planNo;
        dispatch(operateActions.DeletePlanRequest(planNo));
        
        Swal.fire({
          icon: 'success',
          title: '삭제 성공'
        });

        closeDeleteModal();
    }

  return (
    <div>
      <BootstrapDialog onClose={closeDeleteModal} aria-labelledby="customized-dialog-title" open={deleteModalOpen}>
        <BootstrapDialogTitle id="customized-dialog-title">
          자금계획 삭제
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <h2> 
                해당 계획을 삭제하시겠습니까?
            </h2>
        </DialogContent>
        <DialogActions>
        <div style={{
                    display: 'flex',
                    marginTop:'10px',
                }}
                >
                    <Grid item mr={2}>
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            startIcon={<CloseIcon />} 
                            aria-label="two layers"
                            onClick={closeDeleteModal}
                        >
                            취소
                        </Button>
                    </Grid>
                    <Grid item mr={2}>
                        <Button
                            variant="contained" 
                            color="secondary" 
                            startIcon={<DeleteOutlineIcon/>} aria-label="two layers" 
                            sx={{ background: theme.palette.secondary.dark,
                                  '&:hover': { background: theme.palette.secondary.main },
                                  color: 'white.900',
                                }}
                            onClick={ DeleteBtnClick }
                            >
                            삭제
                        </Button>
                    </Grid>
                </div>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}

export default DeleteFundPlanModal;