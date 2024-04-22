import TableCell from '@mui/material/TableCell';
import { CashJournalDataType } from 'pages/account/types/types';
import React from 'react';

type props = {
  row: CashJournalDataType;
};

export default function CashJournalTableCell({ row }: props) {
  return (
    <>
      <TableCell align="right">{row.monthReportingDate}</TableCell>
      <TableCell align="right">{row.reportingDate}</TableCell>
      <TableCell align="right">{row.expenseReport}</TableCell>
      <TableCell align="right">{row.customerName}</TableCell>
      <TableCell align="right">{row.deposit}</TableCell>
      <TableCell align="right">{row.withdrawal}</TableCell>
      <TableCell align="right">{row.balance}</TableCell>
    </>
  );
}