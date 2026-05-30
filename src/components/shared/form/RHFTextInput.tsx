import { Controller, useFormContext } from "react-hook-form";
import { Stack, TextField, TextFieldProps, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export interface IProps {
  name: string;
  label?: string;
  helperComponenet?: React.JSX.Element;
  controllerKey?: string;
  defaultValue?: any;
}

const RHFTextInput = ({
  name,
  placeholder,
  label,
  helperComponenet,
  type,
  disabled,
  controllerKey,
  autoFocus,
  defaultValue,
  ...others
}: IProps & TextFieldProps) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Controller
      key={controllerKey ?? name}   // <- critical for FieldArray reindex
      name={name}
      control={control}
      defaultValue={defaultValue ?? ""}
      render={({ field, fieldState: { error } }) => (
        <Stack gap={2} sx={{ width: "100%" }}>
          <TextField
            {...field}
            {...others}
            placeholder={placeholder}
            error={!!error?.message}
            helperText={error?.message || ""}
            label={label}
            value={field.value ?? ""}
            type={type === "password" && !showPassword ? "password" : "text"}
            disabled={disabled}
            autoFocus={autoFocus}
            InputProps={{
              endAdornment:
                type === "password" ? (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ) : null,
            }}
          />
          {helperComponenet}
        </Stack>
      )}
    />
  );
};

export default RHFTextInput;
