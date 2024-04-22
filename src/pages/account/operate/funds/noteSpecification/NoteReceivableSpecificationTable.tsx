import { TableCell } from '@mui/material';
import { NoteType } from '../../types/types';
import React from 'react';

type props = {
  row: NoteType;
};

export default function NoteTable({ row }: props) {
  return (
    <>
      <TableCell align="center">{row.noteNo}</TableCell>
      <TableCell align="center">{row.journalNo}</TableCell>
      <TableCell align="center">{row.noteType}</TableCell>
      <TableCell align="center">{row.accountInnerCode}</TableCell>
      <TableCell align="center">{row.drawer}</TableCell>
      <TableCell align="center">{row.endorser}</TableCell>
      <TableCell align="center">{row.drawee}</TableCell>
      <TableCell align="center">{row.issuanceDate}</TableCell>
      <TableCell align="center">{row.maturityDate}</TableCell>
    </>
  );
}
