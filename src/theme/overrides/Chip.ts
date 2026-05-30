import { alpha, Theme } from "@mui/material/styles";
import { BLUE, GREEN, LIME, RED, YELLOW } from "../colors";

// ----------------------------------------------------------------------

const Chip = (theme: Theme) => ({
  MuiChip: {
    styleOverrides: {
      root: {
        border: "none",
        borderRadius: "8px",
        padding: "0",
        height: "auto",
        ...theme.typography.medium12,
      },
      colorDefault: {
        "& .MuiChip-avatarMedium, .MuiChip-avatarSmall": {
          color: theme.palette.text.secondary,
        },
      },

      label: {
        padding: "3px 12px",
      },

      filled: {
        "&.MuiChip-label": {
          padding: 23,
        },
        "&.MuiChip-colorDefault": {
          color: theme.palette.grey[700],
          backgroundColor: theme.palette.grey[100],
          // borderColor: theme.palette.grey[300],
          border: "none",
        },
        "&.MuiChip-colorPrimary": {
          backgroundColor: BLUE[100],
          color: BLUE[700],
        },
        "&.MuiChip-colorWarning": {
          color: YELLOW[700],
          backgroundColor: YELLOW[50],
        },
        "&.MuiChip-colorSuccess": {
          color: GREEN[700],
          backgroundColor: LIME[50],
        },
        "&.MuiChip-colorInfo": {
          color: BLUE[700],
          backgroundColor: BLUE[50],
        },
        "&.MuiChip-colorSecondary": {
          color: "#818692",
          backgroundColor: "#F1F2F3",
        },
        "&.MuiChip-colorError": {
          color: RED[600],
          backgroundColor: RED[50],
        },
      },
      outlined: {
        borderColor: alpha(theme.palette.grey[500], 0.32),
        "&.MuiChip-colorPrimary": {
          borderColor: theme.palette.primary.main,
        },
        "&.MuiChip-colorSecondary": {
          borderColor: theme.palette.secondary.main,
        },
      },
      //
      avatarColorInfo: {
        color: theme.palette.info.contrastText,
        backgroundColor: theme.palette.info.dark,
      },
      avatarColorSuccess: {
        color: theme.palette.success.contrastText,
        backgroundColor: theme.palette.success.dark,
      },
      avatarColorWarning: {
        color: theme.palette.warning.contrastText,
        backgroundColor: theme.palette.warning.dark,
      },
      avatarColorError: {
        color: theme.palette.error.contrastText,
        backgroundColor: theme.palette.error.dark,
      },
    },
  },
});

export default Chip;
