import { TableCell } from '@mui/material';
import { JounalDataType } from 'pages/account/types/types';
import React from 'react';

type props = {
  row: JounalDataType;
};

export default function Tableccccc({ row }: props) {
  return (
    <>
      <TableCell align="right">{row.customerCode}</TableCell>
      <TableCell align="right">{row.reportingDate}</TableCell>
      <TableCell align="right">{row.slipNo}</TableCell>
      <TableCell align="right">{row.accountCode}</TableCell>
      <TableCell align="right">{row.accountName}</TableCell>
      <TableCell align="right">{row.expenseReport}</TableCell>
      <TableCell align="right">{row.balanceDivision}</TableCell>
      <TableCell align="right">{row.leftDebtorPrice}</TableCell>
      <TableCell align="right">{row.rightCreditsPrice}</TableCell>
    </>
  );
}
