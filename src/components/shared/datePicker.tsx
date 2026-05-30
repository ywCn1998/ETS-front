import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { TextFieldProps } from "@mui/material/TextField";

type PersianDatePickerProps = {
    value: Date | null;
    setValue: React.Dispatch<React.SetStateAction<Date | null>>;
    label?: string;
    disabled?: boolean;
    textFieldProps?: Partial<TextFieldProps>;
};

export function PersianDatePicker({
    value,
    setValue,
    label = "تاریخ",
}: PersianDatePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
            <DatePicker
                label={label}
                value={value}
                onChange={(v) => setValue(v)}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        sx: {
                            direction: "ltr",
                            justifyContent: 'center',
                            display: 'flex',
                            "& .MuiInputBase-input": {
                                direction: "ltr",
                                textAlign: "right",
                                display: 'flex',
                                justifyContent: 'center',
                            },
                        },
                        inputProps: {
                            dir: "ltr",
                            justifyContent: 'center',

                        },
                    },
                    popper: {
                        sx: { direction: "ltr" },

                    },
                }}
            />
        </LocalizationProvider>
    );
}
