import { TableCell } from '@mui/material';
import { FixedAssetType } from '../types/types';
import React from 'react';

type props = {
  row: FixedAssetType;
};

export default function FixedAssetTable({ row }: props) {
  return (
    <>
      <TableCell align="center">{row.accountCode}</TableCell>
      <TableCell align="center">{row.accountName}</TableCell>
      <TableCell align="center">{row.assetCode}</TableCell>
      <TableCell align="center">{row.assetName}</TableCell>
      <TableCell align="center">{row.acqDate}</TableCell>
      <TableCell align="center">{row.compStatus}</TableCell>
    </>
  );
}
