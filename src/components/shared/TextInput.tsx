import { FC, ReactElement } from "react";
import {
  Box,
  InputAdornment,
  InputBase,
  InputProps,
  styled,
  SxProps,
  Typography,
} from "@mui/material";

interface IProps extends Omit<InputProps, "label" | "sx"> {
  sx?: SxProps;
  label?: string;
  textAlign?: "left" | "right";
  labelAlign?: "rtl" | "ltr";
  maxLength?: number;
  helperText?: string;
  startAdornment?: ReactElement;
  endAdornment?: ReactElement;
}

const TextInput: FC<IProps> = ({
  sx,
  label,
  textAlign = "right",
  labelAlign = "rtl",
  inputProps,
  maxLength,
  error,
  helperText,
  value,
  onChange,
  startAdornment,
  endAdornment,
  ...other
}) => {
  return (
    <MainBox sx={sx}>
      {!!label && (
        <LabelText variant="medium14" dir={labelAlign}>
          {label}
        </LabelText>
      )}

      <InputBox>
        <InputBase
          error={error}
          inputProps={{
            maxLength,
            style: {
              direction: textAlign === "right" ? "rtl" : "ltr",
              textAlign: textAlign === "right" ? "right" : "left",
              ...inputProps?.style,
            },
            ...inputProps,
          }}
          startAdornment={
            !!startAdornment && (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            )
          }
          endAdornment={
            !!endAdornment && (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            )
          }
          value={value}
          onChange={onChange}
          {...other}
        />
      </InputBox>

      {!!helperText && (
        <HelperText
          variant="regular12"
          color={error ? "error.main" : "initial"}
        >
          {helperText}
        </HelperText>
      )}
    </MainBox>
  );
};

const MainBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const InputBox = styled(Box)({});

export const LabelText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginLeft: theme.spacing(1),
}));

const HelperText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1),
}));

export default TextInput;
