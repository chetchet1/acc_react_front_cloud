// 컴포넌트화 한거 
// import React from 'react';
// import BudgetStatusMenu from "./BudgetStatusMenu";
// import BudgetStatusGrid from "./BudgetStatusGrid";
// import Layout from 'layout';
// import { ReactElement } from 'react-markdown/lib/react-markdown';

// const BudgetStatus = () => {
//     return (
//         <>
//             <BudgetStatusMenu />
//             <BudgetStatusGrid />
//         </>
//     );
// };

// BudgetStatus.getLayout = function getLayout(page: ReactElement) {
//     return <Layout>{page}</Layout>;
// };

// export default BudgetStatus;
//=============================================================================================

// 혼자 짜보는거 

/**
 * 추가 사항
 * 1. 부서명 딜레이되는 현상 수정하기
 * 2. budgetStatusTable bottom row total 만들기
 *  - DataGridPro 써야 rowPinned 가능 => 사용시 라이센스없다고 뜸
 *  - ReactAgGrid 는 무료로 pinned api 사용가능
 * 3. 사가 사용하여 상태 변경하도록 수정하기
 */


import React, { useState, useEffect } from 'react';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import Page from 'ui-component/Page';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import { Button, Grid, Paper, Divider, InputBase, IconButton, Box, Modal } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { BudgetColumnDefType } from '../types/type';
import accountApi from 'api/accountApi';

const BudgetStatus = () => {

    const theme = useTheme();

    // DataGrid
    const [year, setYear] = useState('');
    const [workplaceName, setWorkplaceName] = useState('');
    const [budgetList, setbudgetList]: any = useState('');
    const [DetailbudgetList, setDetailbudgetList]: any = useState('');

    // Modal 
    const [yearModal, setYearModal] = useState(false);
    const [workModal, setWorkModal] = useState(false);
    const [deptModal, setDeptModal] = useState(false);

    const [accountPeriodNo, setAccountPeriodNo] = useState('');
    const [workplaceCode, setWorkplaceCode] = useState();    
    const [deptCode, setDeptCode] = useState('');
    const [deptName, setDeptName] = useState('');

    const [periodNoList, setPeriodNoList]: any = useState('');
    const [workList, setWorkList]: any = useState('');
    const [deptList, setDeptList]: any = useState('');

    const [result, setResult] = useState('');
    const [] = useState('');

    // 날짜 모달 컬럼
    const YearColumns = [
        { headerName: '시작날짜', field: 'periodStartDate', textAlign: 'center'},
        { headerName: '끝난날짜', field: 'periodEndDate' }
    ];

    // 작업장 모달 컬럼
    const WorkplaceColumns: any[] = [
        { headerName: '사업장코드', field: 'workplaceCode', align: 'center', headerAlign: 'center' },
        { headerName: '사업장명', field: 'workplaceName', width: 185, align: 'center', headerAlign: 'center' }
    ];
    
    // 부서 모달 컬럼
    const DeptColumns: any[] = [
        { headerName: '부서코드', field: 'deptCode', align: 'center', headerAlign: 'center'},
        { headerName: '부서명', field: 'deptName', align: 'center', headerAlign: 'center', width: 180 }
    ];
    

    // 부모칼럼
    const BudgetGroupcolumnDefs = [
        {
            headerName: " ", groupId: 'account', width: 350,
            children: [ { field: "accountInnerCode" }, { field: "accountName" } ],
        },
        {
            headerName: "누계예산대비실적", groupId: 'total', width: 480,
            children: [
                { field: "abr" }, { field: "annualBudget" }, 
                { field: "remainingBudget" }, { field: "budgetExecRate" },
            ],
        },
        {
            headerName: "당월예산대비실적", groupId: 'forMonth', width: 480,
            children: [
                { field: "ambr" }, { field: "budget" },
                { field: "remainingMonthBudget" }, { field: "monthBudgetExecRate" },
            ],
        },
    ];

    // 고정 로우 합계
    // function getRow(budgetStatus: any) {
    //     if(!budgetStatus) return;
    //     console.log("합계");
    //     console.log(budgetStatus);
    //     let sum_abr = 0;
    //     let sum_annualBudget = 0;
    //     let sum_remainingBudget = 0;

    //     let sum_ambr = 0;
    //     let sum_budget = 0;
    //     let sum_remainingMonthBudget = 0;
    //     let sum_budgetStatus=[];
    //     for(let i=0; i<budgetStatus.length; i++){
    //         sum_abr = sum_abr + budgetStatus[i].abr;
    //         sum_annualBudget = sum_annualBudget + budgetStatus[i].annualBudget;
    //         sum_remainingBudget = sum_remainingBudget  + budgetStatus[i].remainingBudget;
    //         sum_ambr = sum_ambr + budgetStatus[i].ambr;
    //         sum_budget = sum_budget + budgetStatus[i].budget;
    //         sum_remainingMonthBudget = sum_remainingMonthBudget + budgetStatus[i].remainingMonthBudget;
    //     }
    //     sum_budgetStatus.push({
    //         accountInnerCode: "합계",
    //         accountName     : null,
    //         abr             : sum_abr,
    //         annualBudget : sum_annualBudget,
    //         remainingBudget : sum_remainingBudget,
    //         budgetExecRate :  sum_annualBudget == null?"-" : ((sum_abr/sum_annualBudget)*100).toFixed(3),     //(sum_abr/sum_annualBudget)*100,
    //         ambr             : sum_ambr,
    //         budget : sum_budget,
    //         remainingMonthBudget : sum_remainingMonthBudget,
    //         monthBudgetExecRate : sum_budget == 0 ? "-" : ((sum_ambr/sum_budget)*100).toFixed(3)
    //     })
    //     return sum_budgetStatus;
    //   }

    // const pinnedRows: GridPinnedRowsProp = {
    //     bottom: [getRow()],
    //   };

    // 자식칼럼
    const BudgetcolumnDefs: BudgetColumnDefType[] = [ 
                { headerName: "계정과목 코드", field: "accountInnerCode", sort: "asc", width: 150},
                { headerName: "계정과목", field: "accountName", width: 200 },    

                { headerName: "실적", field: "abr", width: 120 },
                { headerName: "예산", field: "annualBudget", width: 120 },
                { headerName: "잔여예산", field: "remainingBudget", width: 120 },
                { headerName: "집행율(%)", field: "budgetExecRate", width: 120 },

                { headerName: "실적", field: "ambr", width: 120 },
                { headerName: "예산", field: "budget", width: 120 },
                { headerName: "잔여예산", field: "remainingMonthBudget", width: 120 },
                { headerName: "집행율(%)", field: "monthBudgetExecRate", width: 120 },
    ]

    // 상세칼럼
    const BudgetDetailcolumnDefs: BudgetColumnDefType[] = [
        { headerName: "구분", field: "budgetDate", sort: "none", width: 210 },
        { headerName: "신청예산", field: "appBudget", width: 210 },
        { headerName: "편성예산", field: "orgBudget", width: 210 },
        { headerName: "집행실정", field: "execPerform", width: 210 },
        { headerName: "예실대비", field: "budgetAccountComparison", width: 210 },
    ];

    // 회계연도 검색 클릭
    const onYearBtn = () => {
        console.log('날짜 모달 ON');
        setYearModal(true);
        getYearApi();
    };

    // 사업장명 검색 클릭
    const onWorkBtn = () => {
        if(accountPeriodNo == ''){
            alert('회계연도를 선택해주세요.')
        } else {
            console.log('사업장&부서 모달 ON');
            setWorkModal(true);
            getWorkApi();
        }
    };

    // 날짜모달 row 클릭시 발생 이벤트
    const clickYearData = (e: any) => {
        const yearset = e.row.periodStartDate.substring(0, 4);
        console.log('[clickYearData]', e.row);
        setYearModal(false);
        setYear(yearset);
        setAccountPeriodNo(e.row.accountPeriodNo);
    }

    // 사업장모달 row 클릭시 발생 이벤트
    const clickWorkData = (e: any) => {
        setWorkModal(false);
        console.log('[clickWorkData]', e.row);
        setWorkplaceCode(e.row.workplaceCode)
        setWorkplaceName(e.row.workplaceName)
        setDeptModal(true);
        getDeptApi();
    }

    // 부서모달 row 클릭시 발생 이벤트
    const clickDeptData = (e: any) => {
        console.log('[clickDeptData]', e.row);
        setDeptCode(e.row.deptCode);
        setDeptName(e.row.deptName);
        setDeptModal(false);
    }

    // 상태값 잘 들어갔나 확인
    console.log('[accountPeriodNo]', accountPeriodNo)
    console.log('[workplaceCode]', workplaceCode)
    console.log('[deptCode]', deptCode)
    console.log('[budgetList]', budgetList)

    const getYearApi = async ()=>{
        await accountApi.get('/settlement/periodNoList', {})
            .then(res=>{ 
                setPeriodNoList(res.data.periodNoList)
                console.log('[periodNoList]', res.data.periodNoList)
            }).catch(e=>console.error((e)));
    }

    const getWorkApi = async ()=>{
        await accountApi.get('/operate/deptlist', {})
            .then(res=>{
                setWorkList(res.data)
                console.log('[workList]', res.data)
            })
            .catch(e=>console.error((e)));
    }

    const getDeptApi = async ()=>{
        await accountApi.get('/operate/detaildeptlist', {params: {workplaceCode: workplaceCode}})
            .then(res=>{
                setDeptList(res.data.detailDeptList)
                console.log('[deptList]', res.data.detailDeptList)
            })
            .catch(e=>console.error((e)));
    }


    // 조회 클릭
    const searchBudget = async ()=>{
        console.log('예산실적조회')
        const budgetBean = {
            accountPeriodNo: accountPeriodNo,
            deptCode: deptCode,
            workplaceCode: workplaceCode,
        }
        await accountApi.post('/budget/budgetstatus', budgetBean)
            .then(res => { 
                console.log('예산실적조회', res.data);
                setbudgetList(res.data.budgetStatus);
            })
            .catch(e => console.error(e));
    };

    // budgetStatus 테이블 row 클릭
    const searchDetailBudget = async (e: any)=>{
        console.log('세부예산조회')
        const budgetBean = {
            accountPeriodNo: accountPeriodNo,
            deptCode: deptCode,
            workplaceCode: workplaceCode,
            accountInnerCode: e.row.accountInnerCode,
        }
        await accountApi.post('/budget/comparisonBudget', budgetBean)
            .then(res => {
                console.log(res.data.RESULT);
                setDetailbudgetList(res.data.RESULT);
            })
            .catch(e => console.error(e));
    }

    const comparisnBudgetResult=(comparisonBudget: any)=>{ // 두번째 테이블, 1월 2월 3월 1분기 ... 
        console.log(comparisonBudget);
        let resultComparisonBudget=comparisonBudget;
       for (let a=0; a< comparisonBudget.length; a++) {
           console.log(comparisonBudget[a])
           if(comparisonBudget[a].appBudget == null){
               comparisonBudget[a].appBudget = 0
           }else{
               comparisonBudget[a].appBudget = numToMoney(comparisonBudget[a].appBudget+"")
           }

           if(comparisonBudget[a].orgBudget == null){
               comparisonBudget[a].orgBudget = 0
           }else{
               comparisonBudget[a].orgBudget = numToMoney(comparisonBudget[a].orgBudget+"")
           }

           if(comparisonBudget[a].execPerform == null){
               comparisonBudget[a].execPerform = 0
           }else{
               comparisonBudget[a].execPerform = numToMoney(comparisonBudget[a].execPerform+"")
           }

           if(comparisonBudget[a].budgetAccountComparison == null){
               comparisonBudget[a].budgetAccountComparison = 0
           }else{
               comparisonBudget[a].budgetAccountComparison = numToMoney(comparisonBudget[a].budgetAccountComparison+"")
           }
       }
       setResult(resultComparisonBudget);
    }

    useEffect( () => {
        comparisnBudgetResult(DetailbudgetList); // 3. 이부분이 실행
       console.log(DetailbudgetList); //comparisonBudget 값이 업데이트 될때만 실행
       },[DetailbudgetList]); //의존성 배열 , 첫번째 매개변수자리의 함수를 실행시킬 조건.  //2. comparisonBudget 의 값이 바뀌고
                              

    const  numToMoney=(value: any)=>{ //10000
        let length=value.length; //길이
        let valueArray=value.split(""); //빈공간 ""을 기준으로 잘라서 배열에 넣음->모든숫자가 다 잘림 100-> 1/0/0
        let strBuffer=[]; //빈배열
        for(let i in valueArray){ //배열이 가지고 있는 인덱스만큼 가져오겠다
            if((i - 3) % 3 == 0 && i != 0) strBuffer.unshift(","); //세글자마다 ',' 이붙음
            strBuffer.unshift(value[length-1-i]); //배열 앞에 요소추가
        }
        value=strBuffer.join(""); //자른값이 붙어짐
        return value;
    }

    return (
        <Page title="예산 실적 현황">
            <Grid container spacing={gridSpacing}>
                {/* === 메뉴 =========================================================================================================================================== */}
                <Grid item sm={12}>
                    <MainCard
                        content={false}
                        title="예산 실적"
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
                                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onYearBtn}>
                                            <SearchIcon />
                                        </IconButton>
                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    </Paper>
                                    <Modal open={yearModal} >
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
                                                    rows={periodNoList}
                                                    columns={YearColumns}
                                                    pageSize={5}
                                                    rowsPerPageOptions={[5]}
                                                    getRowId={(row) => row.accountPeriodNo}
                                                    onRowClick={clickYearData} //년도의 행 선택했을때 실행
                                                />
                                            <Button onClick={() => setYearModal(false)}>닫기</Button>

                                            </Box>
                                        </div>
                                    </Modal>
                                </Grid>
                                <Grid item>
                                    <Paper
                                        id="workplace"
                                        component="form"
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 170 }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="사업장명"
                                            inputProps={{ 'aria-label': 'search google maps' }}
                                            value={workplaceName}
                                        />
                                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onWorkBtn}>
                                            <SearchIcon />
                                        </IconButton>
                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    </Paper>
                                    <Modal open={workModal}>
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
                                                    rows={workList}
                                                    columns={WorkplaceColumns}
                                                    pageSize={10}
                                                    rowsPerPageOptions={[10]}
                                                    getRowId={(row) => row.workplaceCode}
                                                    onRowClick={clickWorkData} 
                                                />
                                                <Button onClick={() => setWorkModal(false)}>닫기</Button>
                                            </Box>
                                        </div>
                                    </Modal>
                                </Grid>
                                <Grid item>
                                    <Paper
                                        id="dept"
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
                                    <Modal open={deptModal}>
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
                                                    rows={deptList}
                                                    columns={DeptColumns}
                                                    pageSize={10}
                                                    rowsPerPageOptions={[10]}
                                                    getRowId={(row) => row.deptCode}
                                                    onRowClick={clickDeptData} 
                                                />
                                                <Button onClick={() => setDeptModal(false)}>닫기</Button>
                                            </Box>
                                        </div>
                                    </Modal>
                                </Grid>
                                <Grid item>
                                <Paper
                                    id="dept"
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 120 }}
                                >
                                        <Button 
                                        sx={{ ml: 1, flex: 1 }} variant="contained" color="secondary" size="large" onClick={searchBudget}
                                        >조회
                                        </Button>
                                    </Paper>
                                </Grid>
                            </Grid>
                        }
                    >
                    </MainCard>
                </Grid>



                {/* === 테이블 =========================================================================================================================================== */}
                <Grid item sm={12}>
                <MainCard>
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
                                experimentalFeatures={{ columnGrouping: true }}
                                rows={budgetList}
                                columns={BudgetcolumnDefs}
                                getRowId={(row: any) => row.accountInnerCode}
                                columnGroupingModel={BudgetGroupcolumnDefs}
                                onRowClick={searchDetailBudget}
                            />
                        </Box>
                    </MainCard>
                </Grid>
                

                
                {/* === 상세테이블 =========================================================================================================================================== */}
                <Grid item sm={12}>
                <MainCard>
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
                                rows={result}
                                columns={BudgetDetailcolumnDefs}
                                getRowId={(row: any) => row.budgetDate}
                                // onRowClick={}
                            />
                        </Box>
                    </MainCard>
                </Grid>
            </Grid>
        </Page>
    );
};

BudgetStatus.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default BudgetStatus;