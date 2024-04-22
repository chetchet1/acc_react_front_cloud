import { TableCell } from '@mui/material';
import { SlipType } from '../types/types';
import React from 'react';

type props = {
  row: SlipType;
};

export default function SlipTable({ row }: props) {
  return (
    <>
      <TableCell align="center">{row.slipCheck}</TableCell>
      <TableCell align="center">{row.accountPeriodNo}</TableCell>
      <TableCell align="center">{row.slipNo}</TableCell>
      <TableCell align="center">{row.reportingDate}</TableCell>
      <TableCell align="center">{row.reportingEmpCode}</TableCell>
      <TableCell align="center">{row.expenseReport}</TableCell>
      <TableCell align="center">{row.approvalEmpCode}</TableCell>
      <TableCell align="center">{row.slipStatus}</TableCell>
    </>
  );
}
