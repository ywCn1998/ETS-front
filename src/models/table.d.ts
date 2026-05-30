import { TableCellProps } from "@mui/material";

export type TTableOrder = "asc" | "desc";

export interface ITableHeadCell {
  id: string | number;
  label: string;
  align?: TableCellProps["align"];
  width?: string | number;
}
