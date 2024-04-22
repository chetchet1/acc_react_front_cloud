import { TableCell } from '@mui/material';
import { DepreciationType } from '../types/types';
import React from 'react';

type props = {
  row: DepreciationType ;
};

export default function DepreciationTable({ row }: props) {
  return (
    <>
      <TableCell align="center">{row.accountCode}</TableCell>
      <TableCell align="center">{row.accountName}</TableCell>
      <TableCell align="center">{row.acqCost}</TableCell>
      <TableCell align="center">{row.initAccDepreciation}</TableCell>
      <TableCell align="center">{row.genDepExpense}</TableCell>
      <TableCell align="center">{row.currBookValue}</TableCell>
    </>
  );
}
