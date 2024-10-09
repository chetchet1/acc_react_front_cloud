import React, { useState } from 'react';

import { Box, Button, Grid, Modal, Table, TableBody, TableContainer, TableHead, TextField } from '@mui/material';


import AddCircleIcon from '@mui/icons-material/AddCircle';

import SearchIcon from '@mui/icons-material/Search';

import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Page from 'ui-component/Page';
import SubCard from 'ui-component/cards/SubCard';

import { ReactElement } from 'react-markdown/lib/react-markdown';
import Layout from 'layout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { budgetActions } from 'store/redux-saga/reducer/budget/budgetReducer';
import { useSelector } from 'react-redux';

import axios from 'axios';
import { BudgetColumnDefType, DetailDeptDef, ModalPropsBudget, MonthBudget, PeriodDef, WorkPlaceDef } from '../types/type';


const BudgetFormulation = () => {
    const dispatch = useDispatch();
    const [yearList, setYearList] = useState<PeriodDef[]>([]);
    const [workplaceList, setWorkplaceList] = useState<WorkPlaceDef[]>([]);
    const [deptList, setDeptList] = useState<DetailDeptDef[]>([]);
    const [parentaccountlist, setParentaccountList] = useState([]);
    const [accountDetailData, setAccountDetailData] = useState([]);



    const [year, setYear] = useState('');
    const [accountPeriodNo, setAccountPeriodNo] = useState('');
    const [workplaceCode, setWorkplaceCode] = useState('');
    const [workplaceName, setWorkplaceName] = useState('');
    const [deptCode, setDeptCode] = useState('');
    const [deptName, setDeptName] = useState('');
    const [accountInnerCode, setAccountInnerCode] = useState('');


    const [yearOpen, yearSetOpen] = useState(false); //년도모달
    const [workOpen, workSetOpen] = useState(false); //워크모달
    const [deptOpen, deptSetOpen] = useState(false); //부서모달


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

    const yearColumns: ModalPropsBudget[] = [
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

    const workColumns: ModalPropsBudget[] = [
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

    const deptColumns: ModalPropsBudget[] = [
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

    const accountColumns: BudgetColumnDefType[] = [
        { headerName: '계정과목코드', field: 'accountInnerCode', align: 'center', width: 170 },
        { headerName: '계정과목', field: 'accountName', align: 'center', textAlign: 'center', width: 480 }
    ];


    const accountDetailcolums: BudgetColumnDefType[] = [
        { field: 'accountInnerCode', headerName: '계정과목코드', width: 170, align: 'center' },
        { field: 'accountName', headerName: '계정과목명', width: 480, align: 'center' }
    ];

    useEffect(() => {
        dispatch(budgetActions.PeriodListRequest()),
            dispatch(budgetActions.WorkPlaceRequest())
    }, []);

    const periodBudgetList = useSelector((state: any) => state.budget.fixedBudgetList);
    const workPlaceDeptCall = useSelector((state: any) => state.budget.workPlaceListName)
    const detailDeptCall = useSelector((state: any) => state.budget.deptDetailCodeName);
    const parentAccountList = useSelector((state: any) => state.budget.accountCodeList);
    const detailAccountList = useSelector((state : any) => state.budget.detailAccountList)
    const searchBudgetList = useSelector((state : any) => {
        return state.budget.searchAccountBudgetList
    })



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
    }

    const setDepartment = (e: any) => {
        deptSetOpen(false);
        setDeptCode(e.row.deptCode);
        setDeptName(e.row.deptName);
    }

    // 사업장 모달 데이터 row 클릭 이벤트
    const searchDepartment = (e: any) => { //사업장코드 행 선택했을때
        workSetOpen(false); //사업장코드 모달 닫음
        console.log('[searchDepartment]', e);
        setWorkplaceName(e.row.workplaceName); //사업장이름 셋팅 그리드에 세팅하려고 세팅하는듯함
        console.log("usestate workplaceCode", workplaceCode)
        setWorkplaceCode(e.row.workplaceCode); //사업장코드 셋팅
        console.log('[workplaceName]', workplaceName);
        console.log('[workplaceCode]', workplaceCode);
        deptSetOpen(true); //부서 모달띄우기
        dispatch(budgetActions.GetDetailDeptListRequest((e.row) as any)) // 사업장 모달창에서 Row를 클릭시 액션함수 실행

    }

    const searchBudget = () => { //값이 하나라도 할당이 안되어있으면 alert
        console.log('년도', accountPeriodNo);
        console.log('업장', workplaceCode);
        console.log('부서', deptCode);
        if (!accountPeriodNo || !workplaceCode || !deptCode) {
            alert("값을 모두 입력해주세요");
        } else {
            // axios.get(`http://localhost:9103/operate/parentaccountlist`).then(
            //     (res) => {
            //         console.log('되냐?', res.data.accountCodeList)
            //         setParentaccountList(res.data.accountCodeList)
            //     }
            // )
            dispatch(budgetActions.callParentAccountListRequest())
            
        }
    }

    // const onAccountDetail = (e: any) => {
    //     console.log(e.row);
    //     axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ACC_URL}/operate/detailaccountlist`,
    //         { params: { code: e.row.accountInnerCode } }
    //     ).then(
    //         (res) => {
    //             console.log('되냐2?', res.data)
    //             setAccountDetailData(res.data);
    //         }
    //     )
    // }

    //계정 과목 row 클릭
    const clickAccountRow = (e: any) => {
        console.log("이벤트 발생", e.row)
        dispatch(budgetActions.DetailAccountListRequest((e.row) as any))
    }



    //계정 과목 상세 클리 useSTate를 이용해 값 너헝주기
    const budgetDetailRow = (e: any) => {
        console.log(e);
        setAccountInnerCode(e.id);
        //       getMonthBudget();
    }

    const getMonthBudget = async () => {
        let budgetEntity: MonthBudget = {
            deptCode: deptCode,
            workplaceCode: workplaceCode,
            accountPeriodNo: accountPeriodNo,
            accountInnerCode: accountInnerCode,
            budgetingCode: '1'
        }

        console.log('버짓 엥팅팅', budgetEntity);
        try {
            if (Object.values(budgetEntity).some((datavalue) => datavalue == '')) {
                alert('상단을 모두 선택해 주십시오')
            } else {
                // await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ACC_URL}/budget/budget`, {
                //     params: budgetEntity
                // }).then((res) => {
                //     console.log('월 조회', res.data.currentBudgetList[0]);
                //     setOneMonth(res.data.currentBudgetList[0].m1Budget)
                //     setTwoMonth(res.data.currentBudgetList[0].m2Budget)
                //     setThreeMonth(res.data.currentBudgetList[0].m3Budget)
                //     setFourMonth(res.data.currentBudgetList[0].m4Budget)
                //     setFiveMonth(res.data.currentBudgetList[0].m5Budget)
                //     setSixMonth(res.data.currentBudgetList[0].m6Budget)
                //     setSevenMonth(res.data.currentBudgetList[0].m7Budget)
                //     setEightMonth(res.data.currentBudgetList[0].m8Budget)
                //     setNineMonth(res.data.currentBudgetList[0].m9Budget)
                //     setTenMonth(res.data.currentBudgetList[0].m10Budget)
                //     setElevenMonth(res.data.currentBudgetList[0].m11Budget)
                //     setTwelveMonth(res.data.currentBudgetList[0].m12Budget)
                // }
                // )
                dispatch(budgetActions.SearchBudgetRequest(budgetEntity as any))
                setOneMonth(searchBudgetList.currentBudgetList[0].m1Budget)
                setTwoMonth(searchBudgetList.currentBudgetList[0].m2Budget)
                setThreeMonth(searchBudgetList.currentBudgetList[0].m3Budget)
                setFourMonth(searchBudgetList.currentBudgetList[0].m4Budget)
                setFiveMonth(searchBudgetList.currentBudgetList[0].m5Budget)
                setSixMonth(searchBudgetList.currentBudgetList[0].m6Budget)
                setSevenMonth(searchBudgetList.currentBudgetList[0].m7Budget)
                setEightMonth(searchBudgetList.currentBudgetList[0].m8Budget)
                setNineMonth(searchBudgetList.currentBudgetList[0].m9Budget)
                setTenMonth(searchBudgetList.currentBudgetList[0].m10Budget)
                setElevenMonth(searchBudgetList.currentBudgetList[0].m11Budget)
                setTwelveMonth(searchBudgetList.currentBudgetList[0].m12Budget)

            }
        } catch (error) {
            alert(`네트워크 오류${error}`);
        }

    }

    const setFormulationMonth = (event: any, monthNumber: any) => {
        const value = event.target.value;
        switch (monthNumber) {
            case 1:
                setOneMonth(value);
                break;
            case 2:
                setTwoMonth(value);
                break;
            case 3:
                setThreeMonth(value);
                break;
            case 4:
                setFourMonth(value);
                break;
            case 5:
                setFiveMonth(value);
                break;
            case 6:
                setSixMonth(value);
                break;
            case 7:
                setSevenMonth(value);
                break;
            case 8:
                setEightMonth(value);
                break;
            case 9:
                setNineMonth(value);
                break;
            case 10:
                setTenMonth(value);
                break;
            case 11:
                setElevenMonth(value);
                break;
            case 12:
                setTwelveMonth(value);
                break;
        }
    }

    const postBudgetFormulation = async () => {
        let budgetEntity = {
            deptCode: deptCode,
            workplaceCode: workplaceCode,
            accountPeriodNo: accountPeriodNo,
            accountInnerCode: accountInnerCode,
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
        console.log(budgetEntity)
        try {
            if (Object.values(budgetEntity).some((datavalue) => datavalue == '')) {
                alert('월별 신청값을 입력해 주십시오')
            } else {
                dispatch(budgetActions.BudgetRegisterRequest(budgetEntity as any))
                alert('예산편성 완료')
            }
        } catch (error) {
            alert(`편성 에러${error}`)
        }
    }


    // const callParentBudget = () => {

    // }
    // ( axios.get(`http://localhost:9103/operate/parentaccountlist`)) accountCodeList


    // acountList

    return (
        <Page title="예산 편성">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid>

                        <MainCard
                            content={false}
                            title="계정과목 선택"
                        >
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
                                        계정과목조회
                                    </Button>

                                </Grid>

                            </SubCard>
                            <TableContainer>
                                <Table >
                                    <TableBody>
                                        <div>
                                            <Box
                                                sx={{
                                                    height: 400,
                                                    width: '100%',
                                                    background: 'white'
                                                }}
                                            >
                                                <DataGrid
                                                    rows={parentAccountList}
                                                    columns={accountColumns}
                                                    pageSize={100}
                                                    rowsPerPageOptions={[5]}
                                                    getRowId={(row: any) => row.accountInnerCode}
                                                    onRowClick={clickAccountRow}
                                                />
                                            </Box>
                                        </div>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </MainCard>
                        <MainCard content={false} title='계정과목 상세'>
                            <TableContainer>
                                <Table >
                                    <TableHead>

                                    </TableHead>
                                    <TableBody>
                                        <div>
                                            <Box
                                                sx={{
                                                    height: 400,
                                                    width: '100%',
                                                    background: 'white'
                                                }}
                                            >
                                                <DataGrid
                                                    rows={detailAccountList}
                                                    columns={accountDetailcolums}
                                                    pageSize={100}
                                                    rowsPerPageOptions={[5]}
                                                    getRowId={(row: any) => row.accountInnerCode}
                                                    onRowClick={budgetDetailRow}
                                                />
                                            </Box>
                                        </div>

                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </MainCard>
                        <MainCard
                            content={false}
                            title="예산조회"
                            secondary={
                                <Button variant="contained" color="secondary" startIcon={<AddCircleIcon />} onClick={getMonthBudget} >
                                    조회
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
                                }}
                            >
                                <TextField id="month1" label="1월" autoComplete="current-password" inputProps={{ "aria-readonly": true }} value={onemonth} />
                                <TextField id="month2" label="2월" autoComplete="current-password" inputProps={{ "aria-readonly": true }} value={twomonth} />
                                <TextField id="month3" label="3월" autoComplete="current-password" inputProps={{ "aria-readonly": true }} value={threemonth} />
                                <TextField id="month4" label="4월" autoComplete="current-password" inputProps={{ "aria-readonly": true }} value={fourmonth} />
                                <TextField id="month5" label="5월" autoComplete="current-password" inputProps={{ "aria-readonly": true }} value={fivemonth} />
                                <TextField id="month6" label="6월" autoComplete="current-password" inputProps={{ "aria-readonly": true }} value={sixmonth} />
                                <TextField id="month7" label="7월" autoComplete="current-password" inputProps={{ "aria-readonly": true }} value={sevenmonth} />
                                <TextField id="month8" label="8월" autoComplete="current-password" inputProps={{ "aria-readonly": true }} value={eightmonth} />
                                <TextField id="month9" label="9월" autoComplete="current-password" inputProps={{ "aria-readonly": true }} value={ninemonth} />
                                <TextField id="month10" label="10월" autoComplete="current-password" inputProps={{ "aria-readonly": true }} value={tenmonth} />
                                <TextField id="month11" label="11월" autoComplete="current-password" inputProps={{ "aria-readonly": true }} value={elevenmonth} />
                                <TextField id="month12" label="12월" autoComplete="current-password" inputProps={{ "aria-readonly": true }} value={twelvemonth} />
                            </Box>
                        </MainCard>
                        <MainCard
                            content={false}
                            title="예산편성"
                            secondary={
                                <Button variant="contained" color="secondary" startIcon={<AddCircleIcon />} onClick={postBudgetFormulation} >
                                    편성
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
                                }}
                            >
                                <TextField id="formuleMonth1" label="1월" value={onemonth} onChange={(event) => setFormulationMonth(event, 1)} />
                                <TextField id="formuleMonth2" label="2월" value={twomonth} onChange={(event) => setFormulationMonth(event, 2)} />
                                <TextField id="formuleMonth3" label="3월" value={threemonth} onChange={(event) => setFormulationMonth(event, 3)} />
                                <TextField id="formuleMonth4" label="4월" value={fourmonth} onChange={(event) => setFormulationMonth(event, 4)} />
                                <TextField id="formuleMonth5" label="5월" value={fivemonth} onChange={(event) => setFormulationMonth(event, 5)} />
                                <TextField id="formuleMonth6" label="6월" value={sixmonth} onChange={(event) => setFormulationMonth(event, 6)} />
                                <TextField id="formuleMonth7" label="7월" value={sevenmonth} onChange={(event) => setFormulationMonth(event, 7)} />
                                <TextField id="formuleMonth8" label="8월" value={eightmonth} onChange={(event) => setFormulationMonth(event, 8)} />
                                <TextField id="formuleMonth9" label="9월" value={ninemonth} onChange={(event) => setFormulationMonth(event, 9)} />
                                <TextField id="formuleMonth10" label="10월" value={tenmonth} onChange={(event) => setFormulationMonth(event, 10)} />
                                <TextField id="formuleMonth11" label="11월" value={elevenmonth} onChange={(event) => setFormulationMonth(event, 11)} />
                                <TextField id="formuleMonth12" label="12월" value={twelvemonth} onChange={(event) => setFormulationMonth(event, 12)} />
                            </Box>
                        </MainCard>

                    </Grid>

                    {/* 년도, 업장, 부서 Modal 창 */}
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
            </Grid >
        </Page >

    );
};


BudgetFormulation.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
export default BudgetFormulation;
