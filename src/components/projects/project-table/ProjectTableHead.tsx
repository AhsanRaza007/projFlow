import React from 'react';
import { TableRow } from '@mui/material';
import { StyledTableHead, StyledTableCell } from '@/styles/table';

const ProjectTableHead = () => {
  return (
    <StyledTableHead>
      <TableRow>
        <StyledTableCell>Project ID</StyledTableCell>
        <StyledTableCell>Project Name</StyledTableCell>
        <StyledTableCell>Start Date</StyledTableCell>
        <StyledTableCell>End Date</StyledTableCell>
        <StyledTableCell>Project Manager</StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
      </TableRow>
    </StyledTableHead>
  );
};

export default ProjectTableHead;
