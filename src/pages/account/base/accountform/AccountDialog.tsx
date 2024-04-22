import React, { ReactElement, useEffect, useState } from 'react';

import { Checkbox, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Tooltip, Typography, Button, Modal, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
//type
import { ArrangementOrder, EnhancedTableHeadProps, GetComparator, KeyedObject,  } from 'types';
import { baseColumnsProps, HeadCell, CreateDataType } from '../types/types';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Box } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import accountApi from 'api/accountApi';

const columns: baseColumnsProps[] = [
  { id: 'accountInnerCode', label: '계정과목코드', minWidth: 50 },
  { id: 'accountName', label: '계정과목명', minWidth: 100 }
];

const rows = [];

const headCells: HeadCell[] = [
  {
    id: 'accountInnerCode',
    numeric: false,
    disablePadding: true,
    label: '계정과목코드',
  },
  {
    id: 'accountName',
    numeric: true,
    disablePadding: false,
    label: '계정과목명'
  }
];

// 예제 URL
// ==============================|| TABLE - STICKY HEADER ||============================== //

// table data
function stableSort(array: CreateDataType[], comparator: (a: KeyedObject, b: KeyedObject) => number) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0] as CreateDataType, b[0] as CreateDataType);
    if (order !== 0) return order;
    return (a[1] as number) - (b[1] as number);
  });
  return stabilizedThis.map((el) => el[0]);
}
const EnhancedTableToolbar = ({ numSelected }: { numSelected: number }) => (
  <Toolbar
    sx={{
      p: 0,
      pl: 1,
      pr: 1,
      ...(numSelected > 0 && {
        color: (theme) => theme.palette.secondary.main
      })
    }}
  >
    {numSelected > 0 ? (
      <Typography color="inherit" variant="subtitle1">
        {numSelected} selected
      </Typography>
    ) : (
      <Typography variant="h6" id="tableTitle">
        Nutrition
      </Typography>
    )}
    <Box sx={{ flexGrow: 1 }} />
    {numSelected > 0 && (
      <Tooltip title="Delete">
        <IconButton size="large">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    )}
  </Toolbar>
);

function descendingComparator(a: KeyedObject, b: KeyedObject, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator: GetComparator = (order, orderBy) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

interface TableDataEnhancedTableHead extends EnhancedTableHeadProps {}

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }: TableDataEnhancedTableHead) {
  const createSortHandler = (property: string) => (event: React.SyntheticEvent) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ pl: 3 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| 여기부터 시작 ||============================== //

function AccountDialog() {
  const [page, setPage] = React.useState(0);
  const [page2, setPage2] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowsPerPage2, setRowsPerPage2] = React.useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };
  const handleChangePage1 = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage2(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    console.log('dddd');
    setRowsPerPage(+event?.target?.value!);
    setPage(0);
  };
  const handleChangeRowsPerPage2 = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setRowsPerPage2(+event?.target?.value!);
    setPage2(0);
  };
  // 데이타 테이블
  const [order, setOrder] = React.useState<ArrangementOrder>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('accountName');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [dense] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [data, setData] = useState<CreateDataType[]>([]); // 데이터를 저장할 상태
  // const [detailData, setDetailData] = React.useState([]); // 데이터를 저장할 상태

  const [parentAccountInnerCode ,setParentAccountInnerCode] = useState('');
  const [newAccountInnerCode, setNewAccountInnerCode] = useState('코드');
  const [newAccountName, setNewAccountName] = useState('이름');
  const [ModalOpen, setModalOpen] = useState(false);
  const [detailData, setDetailData] = useState<
    {
      accountInnerCode: string;
      accountName: string;
    }[]
  >([]);

  const handleRequestSort = (event: React.SyntheticEvent, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      if (selected.length > 0) {
        setSelected([]);
      } else {
        const newSelectedId: string[] = detailData.map((n) => n.accountInnerCode);
        setSelected(newSelectedId);
      }
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<HTMLTableRowElement> | undefined, accountInnerCode: string) => {
    const selectedIndex = selected.indexOf(accountInnerCode);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, accountInnerCode);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    const selectedRowData: any = detailData.filter((row) => newSelected.includes(row.accountInnerCode.toString()));
    setSelectedValue(selectedRowData);
    setSelected(newSelected);
  };

  const isSelected = (accountInnerCode: string) => selected.indexOf(accountInnerCode) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page2 > 0 ? Math.max(0, (1 + page2) * rowsPerPage2 - detailData.length) : 0;

  // 화면 출력과 동시에 계정리스트를 출력
  useEffect(() => {
    // (async () => {
    //   try {
    //     const response = await fetch('http://localhost:9103/operate/parentaccountlist');
    //     if (!response.ok) {
    //       throw new Error('서버 응답이 실패했습니다.');
    //     }
    //     const data = await response.json();
    //     setData(data.accountCodeList);
    //   } catch (error) {
    //     console.error('데이터를 가져오는 중 에러 발생:', error);
    //   }
    // })();

    (async ()=>{
      await accountApi.get('http://localhost:9103/operate/parentaccountlist', {})
        .then(res=>{
          console.log('accountCodeList', res.data.accountCodeList)
          setData(res.data.accountCodeList)
        })
        .catch(e=>console.error(e));
    })()
  }, []);

  // 계정을 클릭하면 계정과목 출력
  const onCellClick = (code: any) => {
    console.log(code);
    setParentAccountInnerCode(code);
    axios.get('http://localhost:9103/operate/detailaccountlist', {params: {code: code}})
      .then((res) => {
        console.log('accountCodeDetailList', res.data);
        setDetailData(res.data);
      });
  };
  console.log('parentAccountInnerCode', parentAccountInnerCode)

  const addCategory = () => {
    console.log('계정과목추가')
    const newDetailData = {
      accountCharacter: null,
      accountCode: newAccountInnerCode,
      accountControlList: null,
      accountDescription: null,
      accountInnerCode: newAccountInnerCode,
      accountName: newAccountName,
      accountUseCheck: null,
      budget: null,
      editable: null,
      editform: null,
      lev: null,
      parentAccountInnercode: parentAccountInnerCode,
      status: 'normal',
    };
    setDetailData([...detailData, newDetailData])
    setModalOpen(true);
  }

  const delCategory = () => {
    console.log('계정과목삭제')
  }
  const saveCategory = () => {
    console.log('계정과목저장')
  }

  const onCellDetailClick = (e: any) => {
    if (e === '코드') {

      setNewAccountInnerCode(d)
    } else {

    }
    console.log('e', e)
    console.log('이름셀 클릭')
    console.log('코드셀 클릭')
  }

  return (
    <Page title="Sticky Header Table">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} lg={4}>
          <MainCard content={false} title="계정" secondary={<Stack direction="row" spacing={2} alignItems="center"></Stack>}>



            {/* :::::::::::::::::::::::::::::::::::::::계정 테이블::::::::::::::::::::::::::::::::::::::: */}
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell sx={{ py: 3 }} key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: KeyedObject) => (
                    <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell onClick={() => onCellClick(row.accountInnerCode)} key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </MainCard>
        </Grid>
      
      
      
        {/* :::::::::::::::::::::::::::::::::::::::계정과목 테이블::::::::::::::::::::::::::::::::::::::: */}
        <Grid item xs={12} lg={8}>
          <MainCard
            content={false}
            title="계정과목"
            secondary={
              <Grid container spacing={1}>
                  <Grid item>
                      <Button variant="contained" color="secondary" startIcon={<AddCircleIcon />} onClick={addCategory}>
                          추가
                      </Button>
                  </Grid>
                  <Grid item>
                      <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={delCategory}>
                          삭제
                      </Button>
                  </Grid>
                  <Grid item>
                      <Button variant="contained" color="secondary" startIcon={<SaveIcon />} onClick={saveCategory}>
                          저장
                      </Button>
                  </Grid>
              </Grid>
          }
          >
            <Paper sx={{ width: '100%', mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} />

              {/* table */}
              <TableContainer sx={{ maxHeight: 377 }}>
                <Table sx={{ minWidth: 500 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(detailData, getComparator(order, orderBy))
                      .slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2)
                      .map((row, index) => {
                        /** Make sure no display bugs if row isn't an OrderData object */
                        if (typeof row === 'number') return null;
                        const isItemSelected = isSelected(row.accountInnerCode);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.accountInnerCode)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.accountInnerCode}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox" sx={{ pl: 3 }}>
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId
                                }}
                              />
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row" padding="none"  onClick={() => onCellDetailClick(row.accountInnerCode)}>
                              {row.accountInnerCode}
                            </TableCell>
                            <TableCell align="right" onClick={() => onCellDetailClick(row.accountName)}>{row.accountName}</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* table data */}
              <TablePagination
                rowsPerPageOptions={[5, 10, 45]}
                component="div"
                count={detailData.length}
                rowsPerPage={rowsPerPage2}
                page={page2}
                onPageChange={handleChangePage1}
                onRowsPerPageChange={handleChangeRowsPerPage2}
              />
            </Paper>
          </MainCard>
        </Grid>
      </Grid>
      <Modal open={ModalOpen}>
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
            <TextField></TextField>
            <TextField></TextField>
            <Button onClick={() => setModalOpen(false)}>닫기</Button>
          </Box>
        </div>
      </Modal>
    </Page>
  );
}

AccountDialog.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AccountDialog;
