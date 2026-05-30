// form
// @mui
import {
    Controller,
    ControllerFieldState,
    ControllerRenderProps,
    useFormContext,
} from 'react-hook-form';


import {
    FormControl,
    FormHelperText,
    SelectChangeEvent,
    SelectProps,
    Stack,
    TextField,
} from '@mui/material';
// import { LabelText } from '@src/components/shared/TextInput';


interface IProps {
    name: string;
    children: React.ReactNode;
    onChange?: (value: string) => void; // تغییر نوع تابع به دریافت مقدار به جای رویداد
}

type Props = (IProps & SelectProps<string | number>) | any;

export default function RHFSelect({ name, children, label, onChange, ...other }: Props) {
    const { control } = useFormContext<any>();

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field,
                fieldState: { error },
            }: {
                field: ControllerRenderProps;
                fieldState: ControllerFieldState;
            }) => (
                <FormControl fullWidth error={!!error}>
                    <Stack gap={1.2}>
                        <TextField
                            {...other}
                            error={!!error}
                            {...field}
                            onChange={(e: SelectChangeEvent<string | number>) => {
                                const value: any = e?.target?.value;
                                if (onChange) onChange(value);
                                field.onChange(value);
                                field.onChange(e);
                            }}
                            select
                            label={label}
                        >
                            {children}
                        </TextField>
                        {error?.message && <FormHelperText>{error.message}</FormHelperText>}
                    </Stack>
                </FormControl>
            )}
        />
    );
}
