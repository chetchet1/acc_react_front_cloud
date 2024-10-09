import React, { useState, useRef, useEffect } from 'react';
import { Grid, Button, TextField, Autocomplete } from '@mui/material';
import LayersTwoToneIcon from '@mui/icons-material/LayersTwoTone';
import { useTheme } from '@mui/material/styles';

import { useSelector, useDispatch } from 'react-redux';
import { operateActions } from 'store/redux-saga/reducer/operate/operateReducer';
import Swal from 'sweetalert2';

const AddFixedAsset = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const fixedAssetType = useSelector((state:any) => state.operate.fixedAssetCode);
    const [ selectedAccCode, setSelectedAccCode ] = useState(''); 
    const [ selectedAccName, setSelectedAccName ] = useState(''); 
    const [ madeAssetCode, setMadeAssetCode ] = useState(fixedAssetType[0]?.value || '');
    const [ assetName, setAssetName ] = useState('');
    const [ acqDate, setAcqDate ] = useState(''); //취득일
    const compStatus = useRef('진행'); //완료상태
    const [ acqCost, setAcqCost ] = useState(''); //취득원가
    const [ depMethod, setDepMethod ] = useState(''); //상가방법
    const [ initAccDepreciation, setInitAccDepreciation ] = useState(''); //전기말상각누계액
    const [ prevBookValue, setPrevBookValue ] = useState(''); //전기말장부가액
    const [ usefulLife, setUsefulLife ] = useState(''); //내용연수
    const [ depCompYear, setDepCompYear ] = useState(''); //상각완료연도
    const [ dept, setDept ] = useState(''); //관리부서
    const [ acqQty, setAcqQty ] = useState(''); //취득수량
    const incDecQty = useRef(''); //증감수량
    const [ remQty, setRemQty ] = useState(''); //잔존수량
    const [ depRate, setDepRate ] = useState(''); //상각률
    const months = useRef('12');
    const [ genDepExpense, setGenDepExpense ] = useState(''); //일반상각비
    const [ currAccDepreciation, setCurrAccDepreciation ] = useState(''); //당기말상각누계액
    const [ currBookValue, setCurrBookValue ] = useState(''); //당기말장부가액
    

    const depMethodList = [
        {label: "정액법", value: "정액법"},
        {label: "정률법", value: "정률법"}
    ];

    const departmentList = [
        {label: "재경부", value:"재경부"},
        {label: "영업부", value:"영업부"},
        {label: "생산부", value:"생산부"},
        {label: "구매자재부", value:"구매자재부"}
    ]

    //자산코드생성
    const year = new Date().getFullYear().toString().slice(-2);
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const date = new Date().getDate().toString().padStart(2, "0");

    //자산유형
    const handleAssetCode = (value:any) => {
        if(value){
            setSelectedAccCode(value?.value || '');
            setSelectedAccName(value?.label || '');
            console.log("selectedAccName??", selectedAccName);
        }
    
        //자산코드
        const getRandomLetters = () => {
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let result = "";

            for(let i=0; i<3; i++){
                const randomIndex = Math.floor(Math.random()*alphabet.length);

                result += alphabet[randomIndex];
            }
            return result;
        };
        const randomAssetCode = `${year}${month}${date}${getRandomLetters()}`;
        setMadeAssetCode(randomAssetCode);
    }

    //자산명
    const handleAssetNameChange = (event:any) => {
        setAssetName(event.target.value);
        console.log("assetName@@@", assetName);
    }

    //취득일
    const handleAcqDateChange = (event:any) => {
        setAcqDate(event.target.value);
        console.log("acqDate@@@", acqDate);
    }

    //취득원가
    const handleAcqCostChange = (event:any) => {
        const newAcqCost = event.target.value;
        setAcqCost(newAcqCost);
        calculatePrevBookValue(newAcqCost, initAccDepreciation);
        console.log("newAcqCost@@@", newAcqCost);
    }

    //상각방법
    const handleDepMethod = (value:any) => {
        if(value){
            setDepMethod(value?.value || '');
        }
    }

    //전기말상각누계액
    const handleInitAccDepreciationChange = (event:any) => {
        const newInitAccDepreciation = event.target.value;
        setInitAccDepreciation(newInitAccDepreciation);
        calculatePrevBookValue(acqCost, newInitAccDepreciation);
        console.log("newInitAccDepreciation@@@", newInitAccDepreciation);
    }

    //전기말장부가액(취득원가 - 전기말상각누계액)
     const calculatePrevBookValue = (acqCost: string, initAccDepreciation: string) => {
        if(!isNaN(Number(acqCost)) && !isNaN(Number(initAccDepreciation))){
            const prevBookValueCalculate = Number(acqCost) - Number(initAccDepreciation);
            setPrevBookValue(prevBookValueCalculate.toString());
            console.log("prevBookValue@@@", prevBookValue);  
        }
    }

    //내용연수
    const handleUsefulListChange = (event:any) => {
        setUsefulLife(event.target.value);
        console.log("usefulLife@@@", usefulLife);
    }

    //관리부서
    const handleDepartment = (value:any) => {
        if(value){
            setDept(value?.value || '');
        }
    }
    
    //취득수량, 잔존수량
    const handleAcqQtyChange = (event:any) => {
        const acqCostValue = event.target.value;
        setAcqQty(acqCostValue);
        setRemQty(acqCostValue);
    }

    //일반상각비
    const handleGenDepExpense = (event:any) => {
        setGenDepExpense(event.target.value);
        console.log("genDepExpense@@@", genDepExpense);
    }

    useEffect(() => {
        if(usefulLife !== ''){
            calculateValues();
        }
    },[usefulLife]);

    //내용연수 입력
    const calculateValues = () => {
        
        //취득일 연도 추출
        const acqDateYear = Number(acqDate.substring(0,4));

        //상각완료연도 계산
        const depCompYearValue = acqDateYear + Number(usefulLife);
        setDepCompYear(depCompYearValue.toString());

        //상각률
        const depRateValue = 1 / Number(usefulLife);
        setDepRate(depRateValue.toString());

        //일반상각비
        const genDepExpenseValue = Number(acqCost) / Number(usefulLife);
        setGenDepExpense(genDepExpenseValue.toString());

        //당기말상각누계액
        const currAccDepreciationValue = Number(initAccDepreciation) + genDepExpenseValue
        setCurrAccDepreciation(currAccDepreciationValue.toString());

        //당기말장부가액
        const currBookValueValue = Number(acqCost) - currAccDepreciationValue;
        setCurrBookValue(currBookValueValue.toString());
    };

    //추가버튼클릭
    const addFixedAssetClick = () => {
        const data:any = {
            accountCode: selectedAccCode,
            accountName: selectedAccName,
            assetCode: madeAssetCode,
            assetName: assetName,
            acqDate: acqDate,
            compStatus: compStatus.current,

            fixedAssetDetailBean: [
                {
                    assetCode: madeAssetCode,
                    acqCost: acqCost,
                    depMethod: depMethod,
                    initAccDepreciation: initAccDepreciation,
                    prevBookValue: prevBookValue,
                    usefulLife: usefulLife,
                    depCompYear: depCompYear,
                    dept: dept,
                    acqQty: acqQty,
                    incDecQty: incDecQty.current,
                    remQty: remQty,
                    depRate: depRate,
                    month: months.current,
                    genDepExpense: genDepExpense,
                    currAccDepreciation : currAccDepreciation,
                    currBookValue: currBookValue
                }
            ]
        }
        console.log("data??????????", data);
        dispatch(operateActions.AddFixedAssetRequest(data));

        Swal.fire({
            icon: 'success',
            title: '추가 성공'
          });
          
        cancelClick();
    };

    //취소버튼클릭
    const cancelClick = () => {
        setSelectedAccCode('');
        setSelectedAccName('');
        setMadeAssetCode('');
        setAssetName('');
        setAcqDate('');
        setAcqCost('');
        setDepMethod('');
        setInitAccDepreciation('');
        setPrevBookValue('');
        setUsefulLife('');
        setDepCompYear('');
        setDept('');
        setAcqQty('');
        setRemQty('');
        setDepRate('');
        setGenDepExpense('');
        setCurrAccDepreciation('');
        setCurrBookValue('');
    };

    return (
    <div>
        <div style={{
            border: '1px solid lightgrey',
            borderRadius: '10px',
            padding: '10px',
            marginTop: '20px'
        }}>
            <div style={{
                    display: 'flex',
                    marginTop:'20px',
                    marginLeft: '40px'
                }}
                >
                    <Grid item mr={2}>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            startIcon={<LayersTwoToneIcon />} aria-label="two layers" 
                            sx={{ background: theme.palette.secondary.dark,
                                  '&:hover': { background: theme.palette.secondary.main },
                                  color: 'white.900',
                                }}
                            onClick={addFixedAssetClick}
                        >
                            추가
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            startIcon={<LayersTwoToneIcon />} 
                            aria-label="two layers"
                            onClick={cancelClick}
                            >
                            취소
                        </Button>
                    </Grid>
                </div>
                
            <div style={{
                    display:'flex',
                    marginTop:'20px',
                    marginLeft:'15px',
            }}> 
                <Grid item xs={6} sm={2} mr={3}>
                    <TextField
                        label="계정코드"
                        fullWidth
                        id="accountCode"
                        defaultValue=""
                        margin="normal"
                        disabled
                        value={selectedAccCode || ''}
                    />
                </Grid>
                
                <Grid item xs={6} sm={2} mt={2}>
                <Autocomplete
                    disablePortal
                    options={fixedAssetType.map((asset:any) => ({label: asset.assetName, value: asset.assetCode}))}
                    renderInput={(params) => <TextField {...params} label="자산유형" />}
                    onChange={(event, value)=> handleAssetCode(value)}
                    />
                </Grid>
            </div>
            <div style={{
                    display: 'flex',
                    marginTop:'5px',
                    marginLeft:'15px',
                }}>
                <Grid item xs={5} sm={2} mr={3}>
                    <TextField
                        label="자산코드"
                        fullWidth
                        id="assetCode"
                        margin="normal"
                        disabled
                        value={madeAssetCode || ''}
                    />
                </Grid>
                <Grid item xs={5} sm={2} mr={3}>
                    <TextField
                        label="자산명"
                        fullWidth
                        id="assetName"
                        margin="normal"
                        value={ assetName }
                        onChange={ handleAssetNameChange }
                    />
                </Grid>

                <Grid item xs={5} md={2}>
                    <TextField
                        label="취득일"
                        fullWidth
                        id="acqDate"
                        margin="normal"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={ acqDate }
                        onChange={ handleAcqDateChange }
                    />
                </Grid>
            </div>
            <div style={{
                    display: 'flex',
                    marginTop:'5px',
                    marginLeft:'15px',
                }}>
                <Grid item xs={5} sm={3} mr={3}>
                    <TextField
                        label="취득원가"
                        fullWidth
                        id="acqCost"
                        margin="normal"
                        value={ acqCost }
                        onChange={ handleAcqCostChange }
                    />
                </Grid>

                <Grid item xs={6} sm={3} mt={2}>
                    <Autocomplete
                        disablePortal
                        options={depMethodList}
                        renderInput={(params) => <TextField {...params} label="상각방법" />}
                        onChange={(event, value)=> handleDepMethod(value)}
                        />
                </Grid>
            </div>
            <div style={{
                    marginLeft:'15px',
                }}
            >
                <Grid item xs={5} sm={4} mr={3}>
                    <TextField
                        label="전기말상각누계액"
                        fullWidth
                        id="initAccDepreciation"
                        margin="normal"
                        value={ initAccDepreciation }
                        onChange={ handleInitAccDepreciationChange }
                    />
                </Grid>
                <Grid item xs={5} sm={4} mr={3}>
                    <TextField
                        fullWidth
                        id="prevBookValue"
                        placeholder="전기말장부가액"
                        margin="normal"
                        disabled
                        value={ prevBookValue }
                    />
                </Grid>
            </div>
            <div style={{
                display:'flex',
                marginLeft:'15px',
            }}>
                <Grid item xs={5} sm={3} mr={3}>
                    <TextField
                        label="내용연수"
                        fullWidth
                        id="usefulLife"
                        margin="normal"
                        value={ usefulLife }
                        onChange={handleUsefulListChange}
                    />
                </Grid>
                <Grid item xs={5} sm={3} mr={3}>
                    <TextField
                        fullWidth
                        id="depCompYear"
                        placeholder="상각완료연도"
                        margin="normal"
                        disabled
                        value={ depCompYear }
                    />
                </Grid>
            </div>
            <div style={{
                    display:'flex',
                    marginLeft:'15px',
                }}>
                <Grid item xs={6} sm={2} mt={2} mr={3}>
                    <Autocomplete
                        disablePortal
                        options={departmentList}
                        renderInput={(params) => <TextField {...params} label="관리부서" />}
                        onChange={(event, value)=> handleDepartment(value)}
                    />
                </Grid>
                <Grid item xs={5} sm={1} mr={3}>
                    <TextField
                        label="취득수량"
                        fullWidth
                        id="acqQty"
                        margin="normal"
                        value={ acqQty }
                        onChange={handleAcqQtyChange}
                    />
                </Grid>
                <Grid item xs={5} sm={1} mr={3}>
                    <TextField
                        fullWidth
                        id="incDecQty"
                        placeholder="증감수량"
                        margin="normal"
                        disabled
                    />
                </Grid>
                <Grid item xs={5} sm={1} mr={3}>
                    <TextField
                        fullWidth
                        id="remQty"
                        placeholder="잔존수량"
                        margin="normal"
                        disabled
                        value={ remQty }
                    />
                </Grid>
            </div>
            <div style={{
                    display:'flex',
                    marginLeft:'15px',
                }}
            >
            <Grid item xs={5} sm={2} mr={3}>
                    <TextField
                        fullWidth
                        id="depRate"
                        placeholder="상각률"
                        margin="normal"
                        disabled
                        value={ depRate }
                    />
                </Grid>
                <Grid item xs={6} sm={2} mr={3}>
                    <TextField
                        label="월수"
                        fullWidth
                        id="months"
                        defaultValue={ months.current }
                        margin="normal"
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
                <Grid item xs={5} sm={4} mr={3}>
                    <TextField
                        label="일반상각비"
                        fullWidth
                        id="genDepExpense"
                        margin="normal"
                        value={ genDepExpense }
                        onChange={ handleGenDepExpense }
                    />
                </Grid>
                <Grid item xs={5} sm={4} mr={3}>
                    <TextField
                        fullWidth
                        id="currAccDepreciation"
                        placeholder="당기말상각누계액"
                        margin="normal"
                        disabled
                        value={ currAccDepreciation }
                    />
                </Grid>
            </div>
            <div style={{
                display:'flex',
                marginLeft:'15px',
                }}
            >
                 <Grid item xs={5} sm={4} mr={3}>
                    <TextField
                        fullWidth
                        id="currBookValue"
                        placeholder="당기말장부가액"
                        margin="normal"
                        disabled
                        value={ currBookValue }
                    />
                </Grid>
            </div>
        </div>
    </div>
  )
}

export default AddFixedAsset
