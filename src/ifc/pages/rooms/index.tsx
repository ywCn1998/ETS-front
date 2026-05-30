import { Stack, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Pagination, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState, useRef } from "react";
import Table from "@src/components/shared/table";
import Row from "./_components/EmailTableRow";
import { ITableHeadCell } from "@src/models/table";
import { useGetRooms } from "@src/ifc/services/room.api";

const headCells: ITableHeadCell[] = [
    { id: "index", label: "#", align: "left" },
    { id: "id", label: "ID", align: "center" },
    { id: "name", label: "Name", align: "left" },
    { id: "longName", label: "Long Name", align: "left" },
    { id: "createdAt", label: "CreatedAt", align: "left" },
    { id: "menu", label: "Actions", align: "right" },
];

const SORT_OPTIONS = [
    { value: "name", label: "Name" },
    { value: "createdAt", label: "Created At" },
    { value: "updatedAt", label: "Updated At" },
];

const LIMIT_OPTIONS = [5, 10, 20, 50];

const RoomsPage = () => {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "createdAt" | "updatedAt">("name");
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [debouncedSearch, setDebouncedSearch] = useState("");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setDebouncedSearch(value);
        }, 400);
    };

    const { data, refetch, isLoading } = useGetRooms({
        search: debouncedSearch,
        sortBy,
        order,
        page: String(page),
        limit: String(limit),
    },);

    const pagination = data?.pagination;

    const tableRows = data?.data?.map((item: any, index: number) => (
        <Row refetch={refetch} key={"item" + index} index={(page - 1) * limit + index} room={item} />
    )) ?? [];

    return (
        <Stack p={2} gap={3} pt={8}>
            <Typography variant="bold20">Rooms</Typography>

            <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">

                <TextField
                    size="small"
                    placeholder="Search rooms..."
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    sx={{ flex: 1, minWidth: 200 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                />

                <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel>Sort by</InputLabel>
                    <Select
                        value={sortBy}
                        label="Sort by"
                        onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 110 }}>
                    <InputLabel>Order</InputLabel>
                    <Select
                        value={order}
                        label="Order"
                        onChange={(e) => { setOrder(e.target.value as "asc" | "desc"); setPage(1); }}
                    >
                        <MenuItem value="asc">Ascending</MenuItem>
                        <MenuItem value="desc">Descending</MenuItem>
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 110 }}>
                    <InputLabel>Per page</InputLabel>
                    <Select
                        value={limit}
                        label="Per page"
                        onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                    >
                        {LIMIT_OPTIONS.map((n) => (
                            <MenuItem key={n} value={n}>{n}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>

            <Table
                loading={isLoading}
                headCells={headCells}
                rows={tableRows}
            />

            {pagination && pagination.totalPages > 1 && (
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                        Showing {(page - 1) * limit + 1}–{Math.min(page * limit, pagination.total)} of {pagination.total} rooms
                    </Typography>

                    <Pagination
                        page={page}
                        count={pagination.totalPages}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                        shape="rounded"
                        showFirstButton
                        showLastButton
                    />
                </Stack>
            )}
        </Stack>
    );
};

export default RoomsPage;