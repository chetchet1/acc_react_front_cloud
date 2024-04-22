import React, { useCallback, useState } from 'react';
import { Grid, Button, Modal, Box } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { gridSpacing } from 'store/constant';
import Page from 'ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentBudget, getDeptList, getDetailDeptList, getPeriodList } from 'store/slices/budget/budgetStatus';
import { ModalPropsBudget } from '../types/type';

const BudgetStatusMenu = () => {

    const dispatch = useDispatch()

    const periodCall = useSelector((state:any)=>state.budgetStatus.budgetDT);
    const deptCall = useSelector((state:any)=>state.budgetStatus.budgetWP);
    const detailDeptCall = useSelector((state:any)=>state.budgetStatus.budgetDP);


    const [year, setYear] = useState('');
    const [accountPeriodNo, setAccountPeriodNo] = useState('');
    const [workplaceCode, setWorkplaceCode] = useState('');
    const [workplaceName, setWorkplaceName] = useState('');
    const [deptCode, setDeptCode] = useState('');
    const [deptName, setDeptName] = useState('');
    

    const [yearOpen, yearSetOpen] = useState(false); //년도모달
    const [workOpen, workSetOpen] = useState(false); //워크모달
    const [deptOpen, deptSetOpen] = useState(false); //부서모달



    console.log(periodCall);
    console.log(deptCall);
    console.log(deptCode)

    const yearListData = () => { //월계표조회 누르면 실행
        yearSetOpen(true); //년도 모달을 띄움
        dispatch(getPeriodList() as any)
    };


    const searchYearData = (e: any) => {
        const yearset = e.row.periodStartDate.substring(0, 4);
        console.log(e.row);
        yearSetOpen(false);
        setYear(yearset);
        setAccountPeriodNo(e.row.accountPeriodNo);
    }

    const workListData = () => {

        workSetOpen(true);
        setDeptCode(""); //부서코드 초기화
        setDeptName(""); //부서 이름 초기화
        dispatch(getDeptList() as any)

    }

    const searchDepartment = (e: any) => { //사업장코드 행 선택했을때
        workSetOpen(false); //사업장코드 모달 닫음
        console.log(e);
        setWorkplaceName(e.row.workplaceName); //사업장이름 셋팅
        setWorkplaceCode(e.id); //사업장코드 셋팅
        console.log(e.row.workplaceName);
        deptSetOpen(true); //부서 모달띄우기

        dispatch(getDetailDeptList(e.row) as any);

        // axios.get(`http://localhost:9103/operate/detaildeptlist`, {
        //     params: e.row
        // }
        // )
        //     .then(res => {
        //         console.log(res.data);
        //         setDeptList(res.data.detailDeptList);
        //     })
    }

    const setDepartment = (e: any) => {
        deptSetOpen(false);
        setDeptCode(e.row.deptCode);
        setDeptName(e.row.deptName);
    }

    const searchBudget = () => { //값이 하나라도 할당이 안되어있으면 alert
        console.log('맘마1',accountPeriodNo);
        console.log('맘마2',workplaceCode);
        console.log('맘마3',deptCode);
        if (!accountPeriodNo || !workplaceCode || !deptCode) {
            alert("값을 모두 입력해주세요");
        } else {
            callBudgetStatus();
        }
    }

    const callBudgetStatus = useCallback(() => {
    let params = {
        accountPeriodNo,
        workplaceCode,
        deptCode
    }
    dispatch(getCurrentBudget(params) as any)
    },[dispatch, accountPeriodNo, workplaceCode, deptCode]
    );

    // const searchMonthData = useCallback(
    //     (e: GridRowParams) => {
    //       setMonthOpen(false);
    //       setMonth(e.row.month);
    //       let params = {
    //         fromDate: year + '-' + e.row.monthStartDate, // 달의 첫날
    //         toDate: year + '-' + e.row.monthEndDate // 달의 마지막날
    //       };
    //       dispatch(getTrialDate(params) as any);
    //     },
    //     [dispatch, year]
    //   );


    const yearColumns:ModalPropsBudget[] = [
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

    const workColumns:ModalPropsBudget[] = [
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




    return (
        <Page title="예산 신청 현황">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <MainCard
                        content={false}
                        title="예산신청현황"
                    >
                        <Grid>
                            <SubCard>
                                <Grid style={{ display: 'flex', padding: '20px' }}>

                                    <input type="text"
                                        className="border-0 small form-control form-control-user"
                                        value={year} placeholder="연도선택"
                                    />

                                    <Button variant="contained" color="secondary" size="small" startIcon={<SearchIcon />} onClick={yearListData}>

                                    </Button>

                                    <label htmlFor="example-text-input" className="col-form-label"></label>

                                    <input type="text"
                                        className="border-0 small form-control form-control-user"
                                        value={workplaceName} placeholder="사업장선택" />

                                    <Button variant="contained" color="secondary" size="small" startIcon={<SearchIcon />} onClick={workListData}>

                                    </Button>

                                    <label htmlFor="example-text-input" className="col-form-label"></label>
                                    <span> </span>
                                    <input type="text"
                                        className="border-0 small form-control form-control-user"
                                        value={deptName} placeholder="부서명" />

                                    <Button variant="contained" color="secondary" onClick={searchBudget}>
                                        예산실적조회
                                    </Button>

                                </Grid>

                            </SubCard>
                        </Grid>
                    </MainCard>
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
                                    rows={periodCall}
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
                                    rows={deptCall}
                                    columns={workColumns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    getRowId={(row) => row.workplaceCode}
                                    onRowClick={searchDepartment} //년도의 행 선택했을때 실행
                                />
                                <Button onClick={() => workSetOpen(false)}>닫기</Button>
                            </Box>
                        </div>
                    </Modal>
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
                                    onRowClick={setDepartment} //년도의 행 선택했을때 실행
                                />
                                <Button onClick={() => deptSetOpen(false)}>닫기</Button>
                            </Box>
                        </div>
                    </Modal>
                </Grid>
            </Grid>
        </Page>

    );
};



export default BudgetStatusMenu;