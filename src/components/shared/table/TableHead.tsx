import { FC, MouseEvent } from "react";
import {
  TableRow,
  TableHead as MuiTableHead,
  TableCell,
  // Checkbox,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { ITableHeadCell, TTableOrder } from "@src/models/table";

interface IProps {
  headCells: ITableHeadCell[];
  numSelected?: number;
  selectable?: boolean;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: TTableOrder;
  orderBy: string | number;
  rowCount: number;
}

const TableHead: FC<IProps> = ({
  headCells,
  // selectable = false,
  // onSelectAllClick,
  order,
  orderBy,
  // numSelected,
  // rowCount,
  onRequestSort,
}) => {
  const createSortHandler = (property: any) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <MuiTableHead>
      <TableRow sx={{ bgcolor: "table.header" }}>
        {/* {selectable && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected && numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        )} */}

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell?.align ?? "center"}
            sortDirection={orderBy === headCell.id ? order : false}
            width={headCell.width}
          >
            <TableSortLabel
              active={false}
              // active={orderBy === headCell.id}
              hideSortIcon
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography
                variant="medium14"
                color="textColor.muted"
                sx={{ mt: 1 }}
              >
                {headCell.label}
              </Typography>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

export default TableHead;
