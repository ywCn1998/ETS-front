import {
  FC,
  JSX,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from "react";
import {
  Box,
  // Checkbox,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  SxProps,
  CircularProgress,
} from "@mui/material";

import TableHead from "./TableHead";
import { EmptyBox, TableBox } from "./styles";
import { ITableHeadCell, TTableOrder } from "@src/models/table";

interface IProps {
  sx?: SxProps;
  headCells: ITableHeadCell[];
  rows: JSX.Element[];
  loading?: boolean;
  loadingRows?: number;
  footerRow?: JSX.Element;
  /** Infinite scroll */
  hasPagination?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

const Table: FC<IProps> = ({
  sx,
  headCells,
  rows,
  loading = false,
  // loadingRows = 5,
  hasPagination = false,
  hasMore = true,
  onLoadMore,
}) => {
  const [order, setOrder] = useState<TTableOrder>("asc");
  const [orderBy, setOrderBy] = useState<string>("");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLTableRowElement | null>(null);

  /* ===============================
     Infinite Scroll Logic
  ================================*/
  useEffect(() => {
    if (!containerRef.current || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          onLoadMore?.();
        }
      },
      {
        root: containerRef.current,
        threshold: 0.2,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [loading, hasMore]);

  const handleRequestSort = (_: MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box sx={sx}>
      <TableBox>
        <TableContainer
          ref={containerRef}
          sx={{
            maxHeight: 8 * 56,
            overflowY: "auto",
            borderRadius: 1,
          }}
        >
          <MuiTable stickyHeader size="medium">
            <TableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            <TableBody>
              {/* Rows */}
              {rows.map((row) => (
                <TableRow key={row.key} hover>
                  {row}
                </TableRow>
              ))}

              {/* Loader / Trigger */}
              {hasPagination && (
                <>
                  {loading &&
                    <TableRow ref={loadMoreRef}>
                      <TableCell
                        colSpan={headCells.length}
                        align="center"
                        sx={{ py: 2 }}
                      >

                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  }

                </>
              )}

              {/* Empty State */}
              {!loading && rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={headCells.length}>
                    <EmptyBox>
                      <Typography>No data!</Typography>
                    </EmptyBox>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>



          </MuiTable>
        </TableContainer>
      </TableBox >
    </Box >
  );
};

export default Table;
