import React from 'react';
import { useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import Page from 'ui-component/Page';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { KeyedObject } from 'types';
import { DetailTrialBalanceData } from 'pages/account/types/types';

const columnDefs: any[] = [
  {
    label: '계층',
    id: 'lev',
    width: 250,
    hide: true
  },
  {
    label: '계정내부코드',
    id: 'accountInnerCode',
    width: 250,
    hide: true
  },
  {
    label: '차변',
    cellStyle: {
      textAlign: 'center'
    },
    children: [
      {
        label: '계',
        id: 'debitsSum',
        valueFormatter: (params: any) =>
          Math.floor(params.value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' 원',
        cellStyle: { textAlign: 'right' }
      },
      {
        label: '대체',
        id: 'exceptCashDebits',
        valueFormatter: (params: any) =>
          Math.floor(params.value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' 원',
        cellStyle: { textAlign: 'right' }
      },
      {
        label: '현금',
        id: 'cashDebits',
        valueFormatter: (params: any) =>
          Math.floor(params.value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' 원',
        cellStyle: { textAlign: 'right' }
      }
    ]
  },
  {
    label: '개정과목',
    id: 'accountName',
    width: 180,
    cellStyle: {
      textAlign: 'right',
      borderLeft: '0.1mm ridge #c2c2c2',
      borderRight: '0.1mm ridge #c2c2c2'
    },
    resizable: true,
    children: [
      {
        label: '개정과목',
        id: 'accountName',
        cellStyle: {
          textAlign: 'right',
          borderLeft: '0.1mm ridge #c2c2c2',
          borderRight: '0.1mm ridge #c2c2c2'
        }
      }
    ]
  },
  {
    label: '대변',
    children: [
      {
        label: '현금',
        id: 'cashCredits',
        valueFormatter: (params: any) =>
          Math.floor(params.value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' 원',
        cellStyle: {
          textAlign: 'right'
        }
      },
      {
        label: '대체',
        id: 'exceptCashCredits',
        valueFormatter: (params: any) =>
          Math.floor(params.value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' 원',
        cellStyle: {
          textAlign: 'right'
        }
      },
      {
        label: '계',
        id: 'creditsSum',
        valueFormatter: (params: any) =>
          Math.floor(params.value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' 원',
        cellStyle: { textAlign: 'right' }
      }
    ]
  }
];

const DetailTrialBalanceGrid: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setRowsPerPage(+event?.target?.value!);
    setPage(0);
  };

  const detailTrialBalanceSum = (params: DetailTrialBalanceData[]) => {
    let sum_debitsSum = 0;
    let sum_exceptCashDebits = 0;
    let sum_cashDebits = 0;
    let sum_cashCredits = 0;
    let sum_exceptCashCredits = 0;
    let sum_creditsSum = 0;

    for (let i = 0; i < params.length - 1; i++) {
      if (params[i].lev === 3) {
        sum_debitsSum += params[i].debitsSum;
        sum_exceptCashDebits += params[i].exceptCashDebits;
        sum_cashDebits += params[i].cashDebits;
        sum_cashCredits += params[i].cashCredits;
        sum_exceptCashCredits += params[i].exceptCashCredits;
        sum_creditsSum += params[i].creditsSum;
      }
    }

    let sum_data: DetailTrialBalanceData[] = [];
    sum_data.push({
      lev: 0,
      accountInnerCode: '',
      debitsSum: sum_debitsSum,
      exceptCashDebits: sum_exceptCashDebits,
      cashDebits: sum_cashDebits,
      accountName: '합계',
      cashCredits: sum_cashCredits,
      exceptCashCredits: sum_exceptCashCredits,
      creditsSum: sum_creditsSum
    });

    return sum_data;
  };
  const trialDate = useSelector((state: any) => {
    return state.detailTrial.detailTB.detailTrialBalanceList;
  });
  return (
    <Page title="Sticky Header Table" sx={{ border: '1px solid black' }}>
      <MainCard content={false}>
        {/* table */}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'right' }}>차변</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ textAlign: 'right' }}>대변</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                {columnDefs
                  .filter((column) => column.children) // children가 있는 열만 필터링
                  .map((parentColumn) =>
                    parentColumn.children.map((childColumn: any) => (
                      <TableCell
                        sx={{ py: 3, backgroundColor: 'lightgray' }}
                        key={childColumn.id}
                        style={{ minWidth: childColumn.minWidth, textAlign: 'right' }}
                      >
                        {childColumn.label}
                      </TableCell>
                    ))
                  )}
              </TableRow>
            </TableHead>
            <TableBody>
              {trialDate.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: KeyedObject) => (
                <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columnDefs
                    .filter((column) => column.children)
                    .map((parentColumn) =>
                      parentColumn.children.map((childColumn: any) => {
                        const value = row[childColumn.id];
                        const formattedValue = childColumn.valueFormatter
                          ? childColumn.valueFormatter({ value }) // 호출 valueFormatter 함수
                          : value;
                        return (
                          <TableCell key={childColumn.id} align={childColumn.cellStyle?.textAlign}>
                            {formattedValue}
                          </TableCell>
                        );
                      })
                    )}
                </TableRow>
              ))}
              <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key="sum">
                {columnDefs
                  .filter((column) => column.children)
                  .map((parentColumn) =>
                    parentColumn.children.map((childColumn: any) => {
                      if (childColumn.id === 'accountName') {
                        return (
                          <TableCell key="sum" align={childColumn.cellStyle?.textAlign} sx={{ backgroundColor: 'cyan' }}>
                            합계
                          </TableCell>
                        );
                      }
                      if (childColumn.id === 'lev') {
                        return <TableCell key="sum" align={childColumn.cellStyle?.textAlign}></TableCell>;
                      }
                      // 합계를 계산하고 표시
                      const sumData: any = detailTrialBalanceSum(trialDate)[0];
                      const formattedValue = childColumn.valueFormatter
                        ? childColumn.valueFormatter({ value: sumData[childColumn.id] })
                        : sumData[childColumn.id];
                      return (
                        <TableCell key="sum" align={childColumn.cellStyle?.textAlign} sx={{ backgroundColor: 'cyan' }}>
                          {formattedValue}
                        </TableCell>
                      );
                    })
                  )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* table pagination */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={trialDate.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
    </Page>
  );
};

export default DetailTrialBalanceGrid;
