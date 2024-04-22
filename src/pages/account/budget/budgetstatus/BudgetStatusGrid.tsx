import React from 'react';
import { useSelector } from "react-redux";
import MainCard from 'ui-component/cards/MainCard';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { BudgetColumnDefType } from '../types/type';

const BudgetStatusGrid: any = () => {


  const currentBudgetCall = useSelector((state: any) => {
    
    return state.budgetStatus.currentBudget
  }
  );
  console.log('맘마',currentBudgetCall);


  // Define your column definitions for the main grid
  const BudgetcolumnDefs: BudgetColumnDefType[] = [
    { headerName: "계정과목 코드", field: "accountInnerCode", sort: "asc", width: 150 },
    { headerName: "계정과목", field: "accountName", width: 200 },
    { headerName: "누계예산실적", field: "abr", width: 120 },
    { headerName: "누계예산", field: "annualBudget", width: 120 },
    { headerName: "누계잔여예산", field: "remainingBudget", width: 120 },
    { headerName: "누계예산집행율(%)", field: "budgetExecRate", width: 120 },
    { headerName: "당원예산실적", field: "ambr", width: 120 },
    { headerName: "당월예산", field: "budget", width: 120 },
    { headerName: "당월잔여예산", field: "remainingMonthBudget", width: 120 },
    { headerName: "당월집행율(%)", field: "monthBudgetExecRate", width: 120 },];

  // Define your column definitions for the detail grid
  const BudgetDetailcolumnDefs: BudgetColumnDefType[] = [
    { headerName: "구분", field: "budgetDate", sort: "none", width: 100 },
    { headerName: "신청예산", field: "appBudget", width: 100 },
    { headerName: "편성예산", field: "orgBudget", width: 100 },
    { headerName: "집행실정", field: "execPerform", width: 100 },
    { headerName: "예실대비", field: "budgetAccountComparison", width: 100 },];


  return (
    <div >
      <MainCard
        content={false}

      >
        <div>
          <TableContainer>
            <Table >
              {/* <TableHead>
                <TableRow>
                  <TableCell>
                    {BudgetcolumnDefs.map((col) =>
                      <TableCell>
                        {col.headerName}
                      </TableCell>
                    )}
                  </TableCell>
                </TableRow>
              </TableHead> */}
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
                      rows={currentBudgetCall}
                      columns={BudgetcolumnDefs}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      getRowId={(row) => row.month}
                      // onRowClick={searchMonthData}
                    />
                  </Box>
                </div>

              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </MainCard>
      <br />

      <MainCard
        content={false}

      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {BudgetDetailcolumnDefs.map((col) =>
                      <TableCell>{col.headerName}</TableCell>
                    )}
                  </TableCell>
                </TableRow>
              </TableHead>
            </TableHead>
            <TableBody>

            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </div>
  );
};

export default BudgetStatusGrid;
