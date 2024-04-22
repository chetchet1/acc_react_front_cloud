import React, { useState, useEffect } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Button, Dialog, Grid, IconButton, TextField} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useTheme } from '@mui/material/styles';
import Swal from 'sweetalert2';

// assets
import CloseIcon from '@mui/icons-material/Close';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import { PlanDataType } from '../../types/types';
import { useDispatch } from 'react-redux';
import { operateActions } from 'store/redux-saga/reducer/operate/operateReducer';
import AddFundCodeModal from '../modal/AddFundCodeModal';
import AddFundCustomerCodeModal from '../modal/AddFundCustomerCodeModal';



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

interface EditFundCodeModalProps{
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

  const EditDailyFundModal: React.FC<EditFundCodeModalProps> = ({ open:editFundModalOpen, onClose:closeEditModal, rowData:rowData }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [ planNo, setPlanNo ] = useState('');
    const [ planDate, setPlanDate ] = useState('');
    const [ fundCode, setFundCode ] = useState('');
    const [ fundName, setFundName ] = useState('');
    const [ customerCode, setCustomerCode ] = useState('');
    const [ customerName, setCustomerName ] = useState('');
    const [ expenseReport, setExpenseReport ] = useState('');
    const [ price, setPrice ] = useState('');

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ custCodeModalOpen, setCustCodeModalOpen ] = useState(false);

    //텍스트필드에 데이터 뿌리기
    useEffect(()=>{
        console.log("rowData???", rowData);
        setPlanNo(rowData.planNo);
        setPlanDate(rowData.planDate);
        setFundCode(rowData.fundCode);
        setFundName(rowData.fundName);
        setCustomerCode(rowData.customerCode);
        setCustomerName(rowData.customerName);
        setExpenseReport(rowData.expenseReport);
        setPrice(rowData.price);
    }, [rowData]);
    

    //자금코드
    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = (selectedAccountId: string, selectedAccName: string) => {
        setIsModalOpen(false);
        setFundCode(selectedAccountId);
        setFundName(selectedAccName);
    }

    //거래처코드
    const openCustCodeModal = () => {
        setCustCodeModalOpen(true);
    }

    const closeCustCodeModal = (selectedCustomerCode: string, selectedCustomerName: string) => {
        setCustCodeModalOpen(false);
        setCustomerCode(selectedCustomerCode);
        setCustomerName(selectedCustomerName);
    }

    //적요
    const handleExpenseReportChange = (event:any) => {
        setExpenseReport(event.target.value);
    }

    //금액
    const handlePriceChange = (event:any) => {
        setPrice(event.target.value);
    }

    //부모 컴포넌트로 선택된 행의 데이터 보내기
    const handleModalClick = () => {
        const removeCommaPrice = (price.replace(/,/g, ""))
        console.log("removeCommaPrice?????", removeCommaPrice);
        const editedData:any = [
            {
                planNo,
                planDate,
                fundCode,
                fundName,
                customerCode,
                customerName,
                expenseReport,
                price:removeCommaPrice,
            }
        ]
        console.log("editedData", editedData[0]);

        dispatch(operateActions.UpdatePlanRequest(editedData[0]));

        Swal.fire({
            icon: 'success',
            title: '수정 성공'
          });

        closeEditModal();
    }

  return (
    <div>
      <BootstrapDialog onClose={closeEditModal} aria-labelledby="customized-dialog-title" open={editFundModalOpen}>
        <BootstrapDialogTitle id="customized-dialog-title">
          자금계획 수정
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <div> 
              <div style={{
                    display:'flex',
                    marginLeft:'15px',
              }}>
                <Grid item mr={3} width={250}>
                    <TextField
                        label="계획번호"
                        fullWidth
                        id="planNo"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={ planNo }
                        disabled
                    />
                </Grid>
                <Grid item mr={3} width={250}>
                    <TextField
                        label="계획년월"
                        fullWidth
                        id="planDate"
                        type="date"
                        margin="normal"
                        value={ planDate }
                        disabled
                    />
                </Grid>
            </div>
            <div style={{
                    display: 'flex',
                    marginLeft:'15px',
                }}>

                    <Grid item mr={3} width={250}>
                        <TextField
                            label="자금코드"
                            fullWidth
                            id="fundCode"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={ fundCode }
                            onClick={openModal}
                        />
                    </Grid>
                    <Grid item mr={3} width={250}>
                        <TextField
                            label="계정과목"
                            fullWidth
                            id="fundName"
                            margin="normal"
                            value={ fundName }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </div>
                <div style={{
                    display:'flex',
                    marginLeft:'15px',
            }}>
                    <Grid item mr={3} width={250}>
                        <TextField
                            label="거래처코드"
                            fullWidth
                            id="customerCode"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={ customerCode }
                            onClick={openCustCodeModal}
                        />
                    </Grid>
                    <Grid item mr={3} width={250}>
                        <TextField
                            label="거래처명"
                            fullWidth
                            id="customerName"
                            margin="normal"
                            value={ customerName }
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </div>
                <div style={{
                    display:'flex',
                    marginLeft:'15px',
                  }}>
                    <Grid item mr={3} width={250}>
                        <TextField
                            label="적요"
                            fullWidth
                            id="expenseReport"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={ expenseReport }
                            onChange={ handleExpenseReportChange }
                        />
                    </Grid>
                    <Grid item mr={3} width={250}>
                        <TextField
                            label="금액"
                            fullWidth
                            id="price"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={ price }
                            onChange={ handlePriceChange }
                        />
                    </Grid>
                 </div>
            </div>
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
                            onClick={closeEditModal}
                        >
                            취소
                        </Button>
                    </Grid>
                    <Grid item mr={5}>
                        <Button
                            variant="contained" 
                            color="secondary" 
                            startIcon={<SaveAltIcon/>} aria-label="two layers" 
                            sx={{ background: theme.palette.secondary.dark,
                                  '&:hover': { background: theme.palette.secondary.main },
                                  color: 'white.900',
                                }}
                            onClick={handleModalClick}
                            >
                            저장
                        </Button>
                    </Grid>
                </div>
        </DialogActions>
      </BootstrapDialog>
        <AddFundCodeModal open={isModalOpen} onClose={closeModal}/>
        <AddFundCustomerCodeModal open={custCodeModalOpen} onClose={closeCustCodeModal}/>
    </div>
  )
}

export default EditDailyFundModal;