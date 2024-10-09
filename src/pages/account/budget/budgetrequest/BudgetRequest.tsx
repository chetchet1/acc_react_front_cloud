import React, { useState } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'layout';
import { useEffect } from 'react';

// material-ui
import MainCard from 'ui-component/cards/MainCard';
import Page from 'ui-component/Page';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Paper, Divider, InputBase, IconButton, TextField, Box, Modal } from '@mui/material';


import { gridSpacing } from 'store/constant';
import { budgetActions } from 'store/redux-saga/reducer/budget/budgetReducer';





const BudgetRequest = () => {

    const theme = useTheme();
    const dispatch = useDispatch()

    
    //const deptCall = useSelector((state: any) => state.budgetStatus.budgetWP);
    //const detailDeptCall = useSelector((state: any) => state.budgetStatus.budgetDP);
    

    // reducer와 saga를 이용한 useState값
    //남도현이 했음 ㅋ
    const periodBudgetList = useSelector((state : any) => state.budget.fixedBudgetList);
    const workPlaceDeptCall = useSelector((state : any)=> state.budget.workPlaceListName)
    const detailDeptCall = useSelector((state : any)=> state.budget.deptDetailCodeName);
    const parentAccountList = useSelector((state : any)=> state.budget.accountCodeList);
    const detailAccountList = useSelector((state : any) => state.budget.detailAccountList)

    //남도현이 했음 ㅋ
    //회계연도, 사업장명 데이터 값을 미리 부르기 위한 useEffect
    useEffect(()=>{
        dispatch(budgetActions.PeriodListRequest()),
        dispatch(budgetActions.WorkPlaceRequest())
      }, []);
      

    const [year, setYear] = useState('');
    const [accountPeriodNo, setAccountPeriodNo] = useState('');
    const [workplaceCode, setWorkplaceCode] = useState('');
    const [workplaceName, setWorkplaceName] = useState('');
    const [deptCode, setDeptCode] = useState('');
    const [deptName, setDeptName] = useState('');
    const [accountInnerCode, setAccountInnerCode] = useState('');
    //const [accountList, setAccountList] = useState([]);
    // const [detailAccountList, setDetailAccountList] = useState({});
    
    // Modal
    const [yearOpen, yearSetOpen] = useState(false); //년도모달
    const [workOpen, workSetOpen] = useState(false); //워크모달
    const [deptOpen, deptSetOpen] = useState(false); //부서모달

    // 월별 예산
    const [onemonth, setOneMonth] = useState('');
    const [twomonth, setTwoMonth] = useState('');
    const [threemonth, setThreeMonth] = useState('');
    const [fourmonth, setFourMonth] = useState('');
    const [fivemonth, setFiveMonth] = useState('');
    const [sixmonth, setSixMonth] = useState('');
    const [sevenmonth, setSevenMonth] = useState('');
    const [eightmonth, setEightMonth] = useState('');
    const [ninemonth, setNineMonth] = useState('');
    const [tenmonth, setTenMonth] = useState('');
    const [elevenmonth, setElevenMonth] = useState('');
    const [twelvemonth, setTwelveMonth] = useState('');

    //리덕스 사가를 이용한 useSelector


    // 날짜 모달 데이터 불러오기
    const yearListData = () => { //월계표조회 누르면 실행
        console.log("yearListData")
        yearSetOpen(true); //년도 모달을 띄움
        //dispatch(budgetActions.FiexdPeriodList);
        //dispatch(getPeriodList() as any) // 데이터 호출을 안되네 ?
    }

    // 날짜 모달 데이터 (row) 클릭 이벤트
    const searchYearData = (e: any) => {
        const yearset = e.row.periodStartDate.substring(0, 4); //클릭한 해당연도 데이터 값을 서브스트링으로 끊어서 가져옴.
        console.log('[searchYearData]]', e.row);
        yearSetOpen(false);
        setYear(yearset);
        setAccountPeriodNo(e.row.accountPeriodNo); //2
        console.log('[accountPeriodNo]', accountPeriodNo)
    }

    // 사업장 모달 데이터 조회
    const workListData = () => {
        workSetOpen(true);
        setDeptCode(""); //부서코드 초기화
        setDeptName(""); //부서 이름 초기화
        console.log("WorkCompany")
        //dispatch(budgetActions.WorkCompanyList('')) //데이터 호출
    }

    // 사업장 모달 데이터 row 클릭 이벤트
    const searchDepartment = (e: any) => { //사업장코드 행 선택했을때
        workSetOpen(false); //사업장코드 모달 닫음
        console.log('[searchDepartment]', e);
        setWorkplaceName(e.row.workplaceName); //사업장이름 셋팅 그리드에 세팅하려고 세팅하는듯함
        console.log("usestate workplaceCode",workplaceCode)
        setWorkplaceCode(e.row.workplaceCode); //사업장코드 셋팅
        console.log('[workplaceName]', workplaceName);
        console.log('[workplaceCode]', workplaceCode);
        deptSetOpen(true); //부서 모달띄우기
        dispatch(budgetActions.GetDetailDeptListRequest((e.row)as any)) // 사업장 모달창에서 Row를 클릭시 액션함수 실행
        
    }

    // 부서 모달 
    //남도현이 했음 ㅋㅋ
    const setDepartment = (e: any) => {
        deptSetOpen(false); // 부서모달창 off
        console.log('[setDepartment]', e) // e는 event로 해당 ROW 클릭한 값이 매개변수를 통해 받을 수 있다.
        setDeptCode(e.row.deptCode); // 복합키 pk인듯?
        setDeptName(e.row.deptName); // 복합키 pk인듯? 이거는 sql로 확인해보셔용
        console.log('e.row.deptCode',e.row.deptCode)
        console.log('[accountPeriodNo]', accountPeriodNo)
        if (accountPeriodNo === '' || workplaceCode === '' || e.row.deptCode === '') {
            alert("값을 모두 입력해주세요");
        } else {
            //callParentAccountList();
            dispatch(budgetActions.callParentAccountListRequest())
        }
    }

    // 부서명 row 클릭 이벤트
    // const callParentAccountList = async () => {
    //     const res = await accountApi.get('/operate/parentaccountlist');
    //     console.log('[res]', res.data);
    //     setAccountList(res.data.accountCodeList);
    // };

    //계정 과목 row 클릭
    const clickAccountRow = (e : any) =>{
        console.log("이벤트 발생", e.row)
        dispatch(budgetActions.DetailAccountListRequest((e.row) as any))
    }

    //계정 과목 row 클릭 이벤트
    // const clickAccountRow = async (params: any) => {
    //     console.log(params.row.accountInnerCode)
    //     const response = await accountApi.get('/operate/detailaccountlist', {params: {code: params.row.accountInnerCode}});
    //     console.log('[detailAccountList]', response.data)
    //     setDetailAccountList(response.data)
    // }

    // 계정 상세 row 클릭 이벤트
    const clickAccountDetailRow = (e: any)=>{
        console.log("이너코드찾고싶어",e)
        setAccountInnerCode(e.row.accountInnerCode) // 계정상세의 accountInnerCode 세팅
    }

    // 날짜 모달 컬럼 정의
    const yearColumns = [
        {
            headerName: "회계 년도",
            field: 'fiscalYear'
        },
        {
            headerName: '회계 시작일',
            field: 'periodStartDate',
            width: 250
        },
        { headerName: '회계 종료일', field: 'periodEndDate', width: 250 }
    ];

    // 사업장 모달 컬럼 정의
    const workColumns = [
        {
            headerName: "사업장코드",
            field: 'workplaceCode',
            width: 250
        },
        {
            headerName: '사업장명',
            field: 'workplaceName',
            width: 250
        }
    ];

    // 부서 모달 컬럼 정의
    const deptColumns = [
        {
            headerName: "부서코드",
            field: 'deptCode',
            width: 250
        },
        {
            headerName: '부서명',
            field: 'deptName',
            width: 250
        }
    ];

    // 계정과목 테이블 컬럼 정의
    const accountColumns = [
        { headerName: '계정과목코드', field: 'accountInnerCode', align: 'center', width: 500 },
        { headerName: '계정과목', field: 'accountName', align: 'center', width: 500 }
    ];

    // 상세계정과목 테이블 컬럼 정의
    const accountDetailcolums = [
        { field: 'accountInnerCode', headerName: '계정과목코드', width: 500, align: 'center' },
        { field: 'accountName', headerName: '계정과목명', width: 500, align: 'center' }
    ];

    // 월별 예산 입력
    //e.target.value가 해달 텍스트값 불러오는거 useState로 setting하는 방법임.
    const insertMonthBudget1 = (e: any) => {
        setOneMonth(e.target.value);
    };

    const insertMonthBudget2 = (e: any) => {
        setTwoMonth(e.target.value);
    };

    const insertMonthBudget3 = (e: any) => {
        setThreeMonth(e.target.value);
    };

    const insertMonthBudget4 = (e: any) => {
        setFourMonth(e.target.value);
    };

    const insertMonthBudget5 = (e: any) => {
        setFiveMonth(e.target.value);
    };

    const insertMonthBudget6 = (e: any) => {
        setSixMonth(e.target.value);
    };

    const insertMonthBudget7 = (e: any) => {
        setSevenMonth(e.target.value);
    };

    const insertMonthBudget8 = (e: any) => {
        setEightMonth(e.target.value);
    };

    const insertMonthBudget9 = (e: any) => {
        setNineMonth(e.target.value);
    };

    const insertMonthBudget10 = (e: any) => {
        setTenMonth(e.target.value);
    };

    const insertMonthBudget11 = (e: any) => {
        setElevenMonth(e.target.value);
    };

    const insertMonthBudget12 = (e: any) => {
        setTwelveMonth(e.target.value);
    };

    const insertMonthBudget = async (e: any) => {
        let budgetEntity = {
            deptCode: deptCode,
            workplaceCode: workplaceCode,
            accountPeriodNo: accountPeriodNo,
            accountInnerCode: accountInnerCode, // 디테일의 이너코드로 변경해야함
            budgetingCode: '1',
            m1Budget: onemonth,
            m2Budget: twomonth,
            m3Budget: threemonth,
            m4Budget: fourmonth,
            m5Budget: fivemonth,
            m6Budget: sixmonth,
            m7Budget: sevenmonth,
            m8Budget: eightmonth,
            m9Budget: ninemonth,
            m10Budget: tenmonth,
            m11Budget: elevenmonth,
            m12Budget: twelvemonth
        }
        //Object.values는 객체의 키와 값을 배열로 반환함.
        //budgetEntity 객체의 모든 값들을 배열에 담아 values에 할당.
        //some() 배열의 요소가 조건을 충족하는지 여부를 확인함.
        if (Object.values(budgetEntity).some((datavalue) => datavalue == '')) {
                alert('월별 신청값을 입력해 주십시오')
        } else {
            console.log(budgetEntity,"버젯엔티티");
            dispatch(budgetActions.BudgetRegisterRequest(budgetEntity as any))
            onMonthReset();
            onMenuReset();
            alert('예산신청이 완료되었습니다.')
        }
    };

    const onMonthReset = () => {
        setOneMonth('');
        setTwoMonth('');
        setThreeMonth('');
        setFourMonth('');
        setFiveMonth('');
        setSixMonth('');
        setSevenMonth('');
        setEightMonth('');
        setNineMonth('');
        setTenMonth('');
        setElevenMonth('');
        setTwelveMonth('');
    }

    const onMenuReset = () => {
        setYear('');
        setWorkplaceName('');
        setDeptName('');
        //월별예산state는 onChange함수를 사용하였기에 따로 초기화 선언을 하지않음.
    };

    return (
        <Page title="BudgetRequest">
            <Grid container spacing={gridSpacing}>

                {/* === 계정과목선택 =========================================================================================================================================== */}
                <Grid item sm={12}>
                    <MainCard
                        content={false}
                        title="계정과목선택"
                        sx={{
                            '&MuiCard-root': { color: theme.palette.text.primary }
                        }}
                        secondary={
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Paper
                                        id="startDate"
                                        component="form"
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 130 }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="회계연도"
                                            inputProps={{ 'aria-label': 'search google maps' }}
                                            value={year}
                                        />
                                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={yearListData}>
                                            <SearchIcon />
                                        </IconButton>
                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    </Paper>
                                    {/* yearOpen useState로 설정해둠 */}
                                    <Modal open={yearOpen} > 
                                        <div
                                            style={{
                                                height: 400,
                                                width: '100%',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: 400,
                                                    width: '40%',
                                                    background: 'white',

                                                }}
                                            >
                                                <DataGrid
                                                    rows={periodBudgetList.periodNoList}
                                                    columns={yearColumns}
                                                    pageSize={5}
                                                    rowsPerPageOptions={[5]}
                                                    getRowId={(row) => row.accountPeriodNo}
                                                    onRowClick={searchYearData} //년도의 행 선택했을때 실행
                                                />
                                                <Button onClick={() => yearSetOpen(false)}>닫기</Button>
                                            </Box>
                                        </div>
                                    </Modal>
                                </Grid>
                                <Grid item>
                                    <Paper
                                        id="startDate"
                                        component="form"
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 170 }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="사업장명"
                                            inputProps={{ 'aria-label': 'search google maps' }}
                                            value={workplaceName}
                                        />
                                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={workListData}>
                                            <SearchIcon />
                                        </IconButton>
                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    </Paper>
                                    <Modal open={workOpen}>
                                        <div
                                            style={{
                                                height: 400,
                                                width: '100%',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: 400,
                                                    width: '40%',
                                                    background: 'white',

                                                }}
                                            >
                                                <DataGrid
                                                    rows={workPlaceDeptCall}
                                                    columns={workColumns}
                                                    pageSize={10}
                                                    rowsPerPageOptions={[10]}
                                                    getRowId={(row: any) => row.workplaceCode + row.deptCode}
                                                    onRowClick={searchDepartment} 
                                                />
                                                <Button onClick={() => workSetOpen(false)}>닫기</Button>
                                            </Box>
                                        </div>
                                    </Modal>
                                </Grid>
                                <Grid item>
                                    <Paper
                                        id="startDate"
                                        component="form"
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 100 }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="부서명"
                                            inputProps={{ 'aria-label': 'search google maps' }}
                                            value={deptName}
                                        />
                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    </Paper>
                                    <Modal open={deptOpen}>
                                        <div
                                            style={{
                                                height: 400,
                                                width: '100%',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: 400,
                                                    width: '40%',
                                                    background: 'white',
                                                }}
                                            >
                                                <DataGrid
                                                    rows={detailDeptCall}
                                                    columns={deptColumns}
                                                    pageSize={10}
                                                    rowsPerPageOptions={[10]}
                                                    getRowId={(row) => row.deptCode}                                                    
                                                    onRowClick={setDepartment}
                                                />
                                                <Button onClick={() => deptSetOpen(false)}>닫기</Button>
                                            </Box>
                                        </div>
                                    </Modal>
                                </Grid>
                            </Grid>
                        }
                    >
                    </MainCard>
                    <MainCard>
                        <Box
                            sx={{
                                height: 315,
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
                                rows={parentAccountList}
                                columns={accountColumns}
                                getRowId={(row: any) => row.accountInnerCode}
                                onRowClick={clickAccountRow}
                            />
                        </Box>
                    </MainCard>
                </Grid>

                {/* === 계정상세선택 =========================================================================================================================================== */}
                <Grid item sm={12}>
                    <MainCard content={false} title="계정상세선택">
                        <Box
                            sx={{
                                height: 315,
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
                                rows={detailAccountList}
                                columns={accountDetailcolums}
                                getRowId={(row) => row.accountInnerCode}
                                onRowClick={clickAccountDetailRow}
                            />
                        </Box>
                    </MainCard>
                </Grid>

                {/* === 예산신청 =========================================================================================================================================== */}
                <Grid item sm={12}>
                    <MainCard
                        content={false}
                        title="예산신청"
                        secondary={
                            <Button variant="contained" color="secondary" startIcon={<AddCircleIcon />} onClick={insertMonthBudget} >
                                등록
                            </Button>
                        }
                    >
                        <Box
                            sx={{
                                display: 'grid',
                                padding: 1,
                                gap: 1,
                                gridTemplateColumns: 'repeat(3, 4fr)',
                                height: 300,
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
                            <TextField id="month1" label="1월" autoComplete="current-password" value={onemonth} onChange={insertMonthBudget1}/>
                            <TextField id="month2" label="2월" autoComplete="current-password" value={twomonth} onChange={insertMonthBudget2}/>
                            <TextField id="month3" label="3월" autoComplete="current-password" value={threemonth} onChange={insertMonthBudget3}/>
                            <TextField id="month4" label="4월" autoComplete="current-password" value={fourmonth} onChange={insertMonthBudget4}/>
                            <TextField id="month5" label="5월" autoComplete="current-password" value={fivemonth} onChange={insertMonthBudget5}/>
                            <TextField id="month6" label="6월" autoComplete="current-password" value={sixmonth} onChange={insertMonthBudget6}/>
                            <TextField id="month7" label="7월" autoComplete="current-password" value={sevenmonth} onChange={insertMonthBudget7}/>
                            <TextField id="month8" label="8월" autoComplete="current-password" value={eightmonth} onChange={insertMonthBudget8}/>
                            <TextField id="month9" label="9월" autoComplete="current-password" value={ninemonth} onChange={insertMonthBudget9}/>
                            <TextField id="month10" label="10월" autoComplete="current-password" value={tenmonth} onChange={insertMonthBudget10}/>
                            <TextField id="month11" label="11월" autoComplete="current-password" value={elevenmonth} onChange={insertMonthBudget11}/>
                            <TextField id="month12" label="12월" autoComplete="current-password" value={twelvemonth} onChange={insertMonthBudget12}/>
                        </Box>
                    </MainCard>
                </Grid>
            </Grid>
        </Page>
    );
};

BudgetRequest.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default BudgetRequest;