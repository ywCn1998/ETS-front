import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Typography,
    Chip,
    Divider,
    Box,
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import {
    Close,
    Search,
} from "@mui/icons-material";
import { useState, useMemo } from "react";


interface Asset {
    id: string;
    expressID: number;
    type: string;
    name: string;
    tag?: string | null;
    description?: string | null;
    properties: Record<string, any>;
}

interface Room {
    id: string;
    expressID: number;
    name: string;
    longName?: string | null;
    description?: string | null;
    properties: Record<string, any>;
    assets: Asset[];
    createdAt: string;
}

interface Props {
    open: boolean;
    room: Room | null;
    onClose: () => void;
}


const ASSET_META: Record<string, { color: string; label: string }> = {
    door: { color: "#f59e0b", label: "Door" },
    window: { color: "#3b82f6", label: "Window" },
    slab: { color: "#8b5cf6", label: "Slab" },
    column: { color: "#10b981", label: "Column" },
    member: { color: "#ef4444", label: "Member" },
};

const getAssetMeta = (type: string) =>
    ASSET_META[type.toLowerCase()] ?? { color: "#6b7280", label: type };

const RoomAssetsModal = ({ open, room, onClose }: Props) => {
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [expandedAsset, setExpandedAsset] = useState<string | null>(null);

    const assetTypes = useMemo(() => {
        if (!room) return [];
        return [...new Set(room.assets.map((a) => a.type.toLowerCase()))];
    }, [room]);

    const filteredAssets = useMemo(() => {
        if (!room) return [];
        return room.assets.filter((asset) => {
            const matchSearch =
                !search ||
                asset.name.toLowerCase().includes(search.toLowerCase()) ||
                asset.tag?.toLowerCase().includes(search.toLowerCase()) ||
                String(asset.expressID).includes(search);

            const matchType =
                !selectedType || asset.type.toLowerCase() === selectedType;

            return matchSearch && matchType;
        });
    }, [room, search, selectedType]);

    const handleClose = () => {
        setSearch("");
        setSelectedType(null);
        setExpandedAsset(null);
        onClose();
    };

    if (!room) return null;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{ sx: { borderRadius: 2, maxHeight: "85vh" } }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                    <Stack gap={0.5}>
                        <Typography variant="h6" fontWeight={600}>
                            {room.name}
                        </Typography>
                        {room.longName && (
                            <Typography variant="body2" color="text.secondary">
                                {room.longName}
                            </Typography>
                        )}
                        <Stack direction="row" gap={1} mt={0.5}>
                            <Chip
                                label={`Express ID: ${room.expressID}`}
                                size="small"
                                variant="outlined"
                                color="secondary"
                                sx={{ fontSize: 11 }}
                            />
                            <Chip
                                label={`${room.assets.length} assets`}
                                size="small"
                                color="secondary"
                                sx={{ fontSize: 11 }}
                            />
                        </Stack>
                    </Stack>

                    <IconButton onClick={handleClose} size="small">
                        <Close fontSize="small" />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ p: 0 }}>
                {Object.keys(room.properties).length > 0 && (
                    <Box sx={{ px: 3, py: 2, bgcolor: "grey.50" }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase">
                            Room Properties
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
                            {Object.entries(room.properties).map(([key, value]) => (
                                <Chip
                                    key={key}
                                    label={`${key}: ${value ?? "—"}`}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: 11, bgcolor: "white" }}
                                />
                            ))}
                        </Stack>
                    </Box>
                )}

                <Divider />

                <Stack px={3} py={2} gap={2}>
                    <TextField
                        size="small"
                        placeholder="Search assets by name, tag or ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {assetTypes.length > 1 && (
                        <Stack direction="row" gap={1} flexWrap="wrap">
                            <Chip
                                label="All"
                                size="small"
                                onClick={() => setSelectedType(null)}
                                color={selectedType === null ? "primary" : "default"}
                                variant={selectedType === null ? "filled" : "outlined"}
                            />
                            {assetTypes.map((type) => {
                                const meta = getAssetMeta(type);
                                return (
                                    <Chip
                                        key={type}
                                        label={meta.label}
                                        size="small"
                                        onClick={() =>
                                            setSelectedType(selectedType === type ? null : type)
                                        }
                                        variant={selectedType === type ? "filled" : "outlined"}
                                        sx={{
                                            borderColor: meta.color,
                                            color: selectedType === type ? "white" : meta.color,
                                            bgcolor: selectedType === type ? meta.color : "transparent",
                                            "&:hover": { bgcolor: meta.color + "22" },
                                        }}
                                    />
                                );
                            })}
                        </Stack>
                    )}
                </Stack>

                {room.assets.length === 0 ? (
                    <Stack alignItems="center" justifyContent="center" py={6} gap={1}>
                        <Typography color="text.secondary">No assets in this room</Typography>
                    </Stack>
                ) : filteredAssets.length === 0 ? (
                    <Stack alignItems="center" justifyContent="center" py={6}>
                        <Typography color="text.secondary">No assets match your search</Typography>
                    </Stack>
                ) : (
                    <TableContainer component={Paper} elevation={0} sx={{ px: 3 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600, color: "text.secondary", fontSize: 12 }}>
                                        TYPE
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: "text.secondary", fontSize: 12 }}>
                                        NAME
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: "text.secondary", fontSize: 12 }}>
                                        EXPRESS ID
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: "text.secondary", fontSize: 12 }}>
                                        TAG
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: "text.secondary", fontSize: 12 }}>
                                        PROPERTIES
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filteredAssets.map((asset) => {
                                    const meta = getAssetMeta(asset.type);
                                    const isExpanded = expandedAsset === asset.id;
                                    const propCount = Object.keys(asset.properties).length;

                                    return (
                                        <>
                                            <TableRow
                                                key={asset.id}
                                                hover
                                                sx={{ cursor: propCount > 0 ? "pointer" : "default" }}
                                                onClick={() =>
                                                    propCount > 0 &&
                                                    setExpandedAsset(isExpanded ? null : asset.id)
                                                }
                                            >
                                                <TableCell>
                                                    <Chip
                                                        label={meta.label}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: meta.color + "22",
                                                            color: meta.color,
                                                            fontWeight: 600,
                                                            fontSize: 11,
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <Typography variant="body2" fontWeight={500}>
                                                        {asset.name}
                                                    </Typography>
                                                    {asset.description && (
                                                        <Typography variant="caption" color="text.secondary">
                                                            {asset.description}
                                                        </Typography>
                                                    )}
                                                </TableCell>

                                                <TableCell>
                                                    <Typography variant="body2" fontFamily="monospace">
                                                        {asset.expressID}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    {asset.tag ? (
                                                        <Chip label={asset.tag} size="small" variant="outlined" sx={{ fontSize: 11 }} />
                                                    ) : (
                                                        <Typography variant="body2" color="text.disabled">—</Typography>
                                                    )}
                                                </TableCell>

                                                <TableCell>
                                                    {propCount > 0 ? (
                                                        <Chip
                                                            label={`${propCount} props ${isExpanded ? "▲" : "▼"}`}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ fontSize: 11, cursor: "pointer" }}
                                                        />
                                                    ) : (
                                                        <Typography variant="body2" color="text.disabled">—</Typography>
                                                    )}
                                                </TableCell>
                                            </TableRow>

                                            {isExpanded && (
                                                <TableRow key={asset.id + "-props"}>
                                                    <TableCell colSpan={5} sx={{ bgcolor: "grey.50", py: 1.5 }}>
                                                        <Stack direction="row" flexWrap="wrap" gap={1} px={1}>
                                                            {Object.entries(asset.properties).map(([key, value]) => (
                                                                <Chip
                                                                    key={key}
                                                                    label={`${key}: ${value ?? "—"}`}
                                                                    size="small"
                                                                    variant="outlined"
                                                                    sx={{ fontSize: 11, bgcolor: "white" }}
                                                                />
                                                            ))}
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DialogContent>

            <Divider />

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                    {filteredAssets.length} of {room.assets.length} assets shown
                </Typography>
                <Button onClick={handleClose} variant="outlined" size="small">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RoomAssetsModal;