import { TableCell } from '@mui/material';
import { IndignationType } from '../types/types';
import React from 'react';

type props = {
  row: IndignationType;
};

export default function IndignationTable({ row }: props) {
  return (
    <>
      <TableCell align="center">{row.slipCheck}</TableCell>
      <TableCell align="center">{row.journalNo}</TableCell>
      <TableCell align="center">{row.accountCode}</TableCell>
      <TableCell align="center">{row.accountName}</TableCell>
      <TableCell align="center">{row.customerCode}</TableCell>
      <TableCell align="center">{row.balanceDivision}</TableCell>
      <TableCell align="center">{row.leftDebtorPrice}</TableCell>
      <TableCell align="center">{row.rightCreditsPrice}</TableCell>
    </>
  );
}
