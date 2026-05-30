import { FC, useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

interface Room {
    id: string;
    name: string;
    longName?: string;
    description?: string;
}

interface Props {
    open: boolean;
    room: Room;
    onClose: () => void;
    onUpdated?: (room: Room) => void;
}

interface FormValues {
    name: string;
    longName: string;
    description: string;
}

const RoomEditModal: FC<Props> = ({
    open,
    room,
    onClose,
    onUpdated,
}) => {
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
            longName: "",
            description: "",
        },
    });

    // Fill form when room changes
    useEffect(() => {
        if (room) {
            reset({
                name: room.name || "",
                longName: room.longName || "",
                description: room.description || "",
            });
        }
    }, [room, reset]);

    const onSubmit = async (data: FormValues) => {
        try {
            setLoading(true);

            onUpdated?.({ ...data, id: room.id });

            onClose();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Edit Room</DialogTitle>

            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Name"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="longName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Long Name"
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                multiline
                                minRows={3}
                                fullWidth
                            />
                        )}
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress size={18} />
                    ) : (
                        "Save"
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RoomEditModal;