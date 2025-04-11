import { TableHead, TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTableCell = styled(TableCell)(() => ({
  whiteSpace: 'nowrap',
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  [`& ${StyledTableCell}`]: {
    fontWeight: 800,
  },
}));

export const ClickableTableRow = styled(TableRow)({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#333',
  },
});
