import React, { useState, useEffect } from 'react';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { Grid, Button, TextField, IconButton, TableContainer, TableHead, TableCell, TableBody, TableRow, Table, Collapse, Box, Stack, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';

// assets
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { useSelector, useDispatch } from 'react-redux';
import { operateActions } from 'store/redux-saga/reducer/operate/operateReducer';
type NoteDetailColumnType = GridColDef<any, any>;

const NotePayableSpecification = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    
    const [ selectedRow, setSelectedRow] = useState<any>(null);
    const [ inRows, setInRows ] = useState([]);
    const [openRowId, setOpenRowId] = useState<number | null>(null);
    const [ ischeckTooltipVisible, setIscheckTooltipVisible ] = useState(false);
    
    const selectNoteList = useSelector((state:any) => state.operate.noteList.noteList);

    //테이블 데이터
    useEffect(()=>{
        setInRows(selectNoteList || []);
        setIscheckTooltipVisible(checkMaturityDate(selectNoteList));
    },[selectNoteList]);


    // 데이터 칼럼
    const noteDetailColumns:NoteDetailColumnType[] = [
      { width: 80, headerName: '', field: '', align: 'center', headerAlign: 'center', 
        renderCell: (params) => (
            <IconButton aria-label="expand row" size="small" onClick={() => handleRowClick(params)}>
                    {openRowId === params.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
         )
      },
      { width: 100, headerName: '거래처명', field: 'customerName', align: 'center', headerAlign: 'center'  },
      { width: 100, headerName: '거래처코드', field: 'customerCode', align: 'center', headerAlign: 'center'  },
      { width: 120, headerName: '어음유형', field: 'noteType', align: 'center', headerAlign: 'center' },
      { width: 120, headerName: '어음번호', field: 'noteNo', type: 'date', align: 'center', headerAlign: 'center'  },
      { width: 130, headerName: '어음금액', field: 'notePrice', align: 'center', headerAlign: 'center'  },
      { width: 180, headerName: '어음만기일', field: 'maturityDate', align: 'center', headerAlign: 'center'  },
      { width: 100, headerName: '비고', field: 'description', align: 'center', headerAlign: 'center'  },
    ];

    //조회
    const searchFundPlan = () => {
        const sendData:any = { accCode: '0252', noteType: 'payable'};
        dispatch(operateActions.SearchAllNoteRequest(sendData));
    }

    console.log("selectNoteList????", selectNoteList);

    // IconButton을 누를 때 선택한 행의 데이터를 업데이트하는 함수
    const handleRowClick = (row: any) => {
        console.log("row????", row);
        setSelectedRow(row);
        setOpenRowId((prev) => (prev === row.id ? null : row.id));
    };

    //만기일 확인 함수
    const checkMaturityDate = (data:any) => {
        if(data && data.length > 0){
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2,"0"); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 표현

            for (let i = 0; i < data.length; i++) {
                if (data[i].maturityDate.substring(0, 7) === `${year}-${month}`) {
                    return true;
                }
            }
        }
        return false;
    };
    
    return (
        <div>
            <MainCard>
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '20px',
                        marginRight: '10px'
                    }}>
                         {ischeckTooltipVisible && (
                            <Tooltip title="이번 달 만기예정인 어음이 있습니다." arrow placement="left">
                                <WarningAmberIcon
                                    style={{ position: 'fixed', bottom: 632, right: 270, fontSize:'30px', color: 'orange' }}
                                />
                            </Tooltip>
                            )}
                        <Grid item mr={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<TroubleshootIcon />} aria-label="two layers"
                                sx={{
                                    background: theme.palette.secondary.dark,
                                    '&:hover': { background: theme.palette.secondary.main },
                                    color: 'white.900',
                                }}
                                onClick={searchFundPlan}
                            >
                                조회
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<UpcomingIcon />}
                                aria-label="two layers"
                            >
                                출력
                            </Button>
                        </Grid>
                    </div>
                    <div style={{
                            border: '1px solid lightgrey',
                            borderRadius: '10px',
                            padding: '10px',
                            marginTop: '20px'
                        }}>
                        <Box
                            sx={{
                                height: '100%',
                                width: '100%',
                                marginTop: '10px',
                                '& .MuiDataGrid-root': {
                                    border: '1px solid grey',
                                    borderRadius: '10px',
                                    padding: '10px',
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
                            <TableContainer>
                                <Table size="small" aria-label="collapsible table">
                                    <TableHead style={{ }}>
                                        <TableRow>
                                            {noteDetailColumns.map((column, index) => (
                                                <TableCell 
                                                    key={index} 
                                                    align={column.align} 
                                                    style={{ 
                                                        fontWeight:'bold',
                                                        color: 'white',
                                                        height:'50px', 
                                                        backgroundColor: theme.palette.secondary.main,
                                                        borderRadius: '5px',
                                                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)' 
                                                        }}
                                                >
                                                    {column.headerName}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {inRows.map((row: any, rowIndex: number) => (
                                            <React.Fragment key={rowIndex}>
                                                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                    {noteDetailColumns.map((column, colIndex) => (
                                                        <TableCell key={colIndex} align={column.align} style={{ height:'60px' }}>
                                                            {column.renderCell ? column.renderCell(row) : row[column.field]}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={noteDetailColumns.length}>
                                                        <Collapse in={openRowId === row.id} timeout="auto" unmountOnExit>
                                                            {openRowId === row.id && (
                                                                <Box sx={{ margin: 1 }}>
                                                                    <TableContainer>
                                                                        <SubCard
                                                                            sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                                                            content={false}
                                                                            secondary={<Stack direction="row" spacing={2} alignItems="center"></Stack>}
                                                                        >
                                                                            <Table size="small">
                                                                                <TableBody>
                                                                                    <TableRow>
                                                                                        <TableCell>
                                                                                            <TextField
                                                                                                label="전표일렬번호"
                                                                                                id="slipNo"
                                                                                                aria-readonly
                                                                                                value={selectedRow.slipNo}
                                                                                                sx={{ m: 2, width: 350 }}
                                                                                            />
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            <TextField
                                                                                                label="분개일렬번호"
                                                                                                id="journalNo"
                                                                                                aria-readonly
                                                                                                value={selectedRow.journalNo}
                                                                                                sx={{ m: 2, width: 350 }}
                                                                                            />
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            <TextField
                                                                                                label="적요"
                                                                                                id="expenseReport"
                                                                                                aria-readonly
                                                                                                value={selectedRow.expenseReport}
                                                                                                sx={{ m: 2, width: 350 }}
                                                                                            />
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow>
                                                                                        <TableCell>
                                                                                            <TextField
                                                                                                label="발행인"
                                                                                                id="drawer"
                                                                                                aria-readonly
                                                                                                value={selectedRow.drawer}
                                                                                                sx={{ m: 2, width: 350 }}
                                                                                            />
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            <TextField
                                                                                                label="배서인"
                                                                                                id="endorser"
                                                                                                aria-readonly
                                                                                                value={selectedRow.endorser}
                                                                                                sx={{ m: 2, width: 350 }}
                                                                                            />
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            <TextField
                                                                                                label="수금사원"
                                                                                                id="drawee"
                                                                                                aria-readonly
                                                                                                value={selectedRow.drawee}
                                                                                                sx={{ m: 2, width: 350 }}
                                                                                            />
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow>
                                                                                        <TableCell>
                                                                                            <TextField
                                                                                                label="발행일자"
                                                                                                id="issuanceDate"
                                                                                                type="date"
                                                                                                aria-readonly
                                                                                                value={selectedRow.issuanceDate}
                                                                                                sx={{ m: 2, width: 350 }}
                                                                                            />
                                                                                        </TableCell>
                                                                                    
                                                                                        <TableCell>
                                                                                            <TextField
                                                                                                label="만기일자"
                                                                                                id="maturityDate"
                                                                                                type="date"
                                                                                                aria-readonly
                                                                                                value={selectedRow.maturityDate}
                                                                                                sx={{ m: 2, width: 350 }}
                                                                                            />
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            <TextField
                                                                                                label="승인자코드"
                                                                                                id="approvalEmpCode"
                                                                                                aria-readonly
                                                                                                value={selectedRow.approvalEmpCode}
                                                                                                sx={{ m: 2, width: 350 }}
                                                                                            />
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                                </TableBody>
                                                                            </Table>
                                                                        </SubCard>
                                                                    </TableContainer>
                                                                </Box>
                                                            )}
                                                        </Collapse>
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </div>
                </div>
            </MainCard>
        </div>
    )
}

NotePayableSpecification.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default NotePayableSpecification;
