import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { gridSpacing } from 'store/constant';

const DeleteCheckDialog = ({ open, onClose, deleteData }) => {
  const Close = () => {
    onClose(false);
  };
  const deleteConfirm = () => {
    deleteData();
  };
  //========================================================================
  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={'xs'}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={12}>
            <DialogTitle>삭제 확인</DialogTitle>
            <DialogContent>
              <DialogContentText>정말 삭제 하시겠습니까?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="secondary" onClick={Close}>
                취소
              </Button>
              <Button variant="contained" color="secondary" onClick={deleteConfirm}>
                삭제
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};
export default DeleteCheckDialog;
