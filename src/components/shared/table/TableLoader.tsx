import { FC } from "react";
import { Skeleton, TableCell, TableRow } from "@mui/material";

interface IProps {
  rowCount: number;
  columnCount: number;
}

const TableLoader: FC<IProps> = ({ rowCount, columnCount }) => {
  return [...Array(rowCount)].map((_row, rowIndex) => (
    <TableRow key={rowIndex}>
      {[...Array(columnCount)].map((_column, columnIndex) => (
        <TableCell key={columnIndex}>
          <Skeleton animation="wave" variant="rounded" height={24} />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default TableLoader;
