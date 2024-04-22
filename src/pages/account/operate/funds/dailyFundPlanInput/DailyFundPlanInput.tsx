import React, { useState } from 'react';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, Button, TextField, Autocomplete } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LoupeIcon from '@mui/icons-material/Loupe';
import PlayDisabledIcon from '@mui/icons-material/PlayDisabled';

import { useDispatch } from 'react-redux';
import { operateActions } from 'store/redux-saga/reducer/operate/operateReducer';
import AddFundCodeModal from '../modal/AddFundCodeModal';
import AddFundCustomerCodeModal from '../modal/AddFundCustomerCodeModal';
import Swal from 'sweetalert2';

const DailyFundPlanInput = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [ planDate, setPlanDate ] = useState('');
    const [ selectedFundCode, setSelectedFundCode ] = useState('');
    const [ selectedFundName, setSelectedFundName ] = useState('');
    const [ expenseReport, setExpenseReport ] = useState('');
    const [ customerCode, setCustomerCode ] = useState('');
    const [ customerName, setCustomerName ] = useState('');
    const [ balanceDivision, setBalanceDivison ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ custCodeModalOpen, setCustCodeModalOpen ] = useState(false);


    const divisionType = [
        { label: "수입", value: "수입" },
        { label: "지출", value: "지출" },
    ]
    const handleDivisionChange = (value:any) => {
        console.log("value??????", value.value);
        setBalanceDivison(value.value);
    }

    //자금코드
    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = (selectedAccountId: string, selectedAccName: string) => {
        setIsModalOpen(false);
        setSelectedFundCode(selectedAccountId);
        setSelectedFundName(selectedAccName);
    }

    //거래처코드
    const openCustCodeModal = () => {
        setCustCodeModalOpen(true);
    }

    const closeCustCodeModal = (selectedCustomerCode: string, selectedCustomerName: string) => {
        setCustCodeModalOpen(false);
        setCustomerCode(selectedCustomerCode);
        setCustomerName(selectedCustomerName);

        console.log("selectedCustomerCode?????", selectedCustomerCode);
        console.log("selectedCustomerName????", selectedCustomerName);
    }

    const handlePlanDateChange = (event:any) => {
        setPlanDate(event.target.value);
    }

    const handleExpReportChange = (event:any) => {
        setExpenseReport(event.target.value);
    }

    const handlePriceChange = (event:any) => {
        setPrice(event.target.value);
    }

    const addBtnClick = () => {
        const newPlanForm:any = [
            {
                planNo:"",
                planDate: planDate,
                fundCode: selectedFundCode,
                fundName: selectedFundName,
                customerCode: customerCode,
                customerName: customerName,
                expenseReport: expenseReport,
                balanceDivision: balanceDivision,
                price: price,
            },
        ];
        console.log("추가 폼:", newPlanForm[0]);

        dispatch(operateActions.CreatePlanRequest(newPlanForm[0]));
        
        Swal.fire({
            icon: 'success',
            title: '추가 성공'
          });

        resetData();
    };

    const resetData = () => {
        setPlanDate('');
        setSelectedFundCode('');
        setSelectedFundName('');
        setExpenseReport('');
        setCustomerCode('');
        setCustomerName('');
        setBalanceDivison('');
        setPrice('');
    }

  return (
    <div>
      <MainCard>
        <div style={{
            border: '1px solid lightgrey',
            borderRadius: '10px',
            padding: '10px',
            marginTop: '5px',
        }}>
        <h3 style={{ marginLeft:'15px', marginBottom: '15px' }}>🔻일자별계획입력</h3>
                
            <div style={{
                    display:'flex',
                    marginTop:'15px',
                    marginLeft:'15px',
            }}> 
                <Grid item mr={3} width={250}>
                    <TextField
                        label="계획년월"
                        fullWidth
                        id="planDate"
                        margin="normal"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={ planDate }
                        onChange = { handlePlanDateChange }
                    />
                </Grid>
                <Grid item mr={3} width={250}>
                    <TextField
                        label="자금코드"
                        fullWidth
                        id="fundCode"
                        margin="normal"
                        value={selectedFundCode || ''}
                        onClick={openModal}
                    />
                </Grid>
                <Grid item mr={3} width={250}>
                    <TextField
                        label="자금과목"
                        fullWidth
                        id="fundName"
                        margin="normal"
                        disabled
                        value={selectedFundName || ''}
                    />
                </Grid>
            </div>
            <div style={{
                    display: 'flex',
                    marginTop:'5px',
                    marginLeft:'15px',
                }}>

                <Grid item mr={3} width={250}>
                    <TextField
                        label="거래처코드"
                        fullWidth
                        id="customerCode"
                        margin="normal"
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
                    />
                </Grid>
                <Grid item mr={3} width={250}>
                    <TextField
                        label="적요"
                        fullWidth
                        id="expenseReport"
                        margin="normal"
                        value={ expenseReport }
                        onChange={handleExpReportChange}
                    />
                </Grid>
            </div>
            <div style={{
                    display: 'flex',
                    marginLeft:'15px',
                    marginBottom: '10px',
                }}
            >
             <Grid item mt={2} mr={3} width={250}>
                <Autocomplete
                    disablePortal
                    options={divisionType}
                    renderInput={(params) => <TextField {...params} label="구분" />}
                    onChange={(event, value)=> handleDivisionChange(value)}
                    />
                </Grid>
                <Grid item mr={3} width={250}>
                    <TextField
                        label="금액"
                        fullWidth
                        id="price"
                        margin="normal"
                        value={ price }
                        onChange = { handlePriceChange }
                    />
                </Grid>
                 <Grid item mt={3} mr={2}>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            startIcon={<LoupeIcon />} aria-label="two layers" 
                            sx={{ background: theme.palette.secondary.dark,
                                  '&:hover': { background: theme.palette.secondary.main },
                                  color: 'white.900',
                                }}
                            onClick={ addBtnClick }
                        >
                            추가
                        </Button>
                    </Grid>
                    <Grid item mt={3}>
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            startIcon={<PlayDisabledIcon />} 
                            aria-label="two layers"
                            onClick={resetData}
                            >
                            취소
                        </Button>
                    </Grid>
                </div>
            </div>
        </MainCard>
        <AddFundCodeModal open={isModalOpen} onClose={closeModal}/>
        <AddFundCustomerCodeModal open={custCodeModalOpen} onClose={closeCustCodeModal}/>
    </div>
  )
}

DailyFundPlanInput.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default DailyFundPlanInput
