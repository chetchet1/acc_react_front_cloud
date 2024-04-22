import { TableCell } from '@mui/material';
import { CurrentAssetType } from './types/types';
import React from 'react';

type props = {
  row: CurrentAssetType;
};

export default function CurrentAssetTable({ row }: props) {
  return (
    <>
      <TableCell align="center">{row.accountCode}</TableCell>
      <TableCell align="center">{row.accoutName}</TableCell>
      <TableCell align="center">{row.assetCode}</TableCell>
      <TableCell align="center">{row.assetName}</TableCell>
      <TableCell align="center">{row.progress}</TableCell>
      <TableCell align="center">{row.finalizeStatus}</TableCell>
    </>
  );
}
