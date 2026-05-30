import { Theme } from "@mui/material/styles";
import { WHITE } from "../colors";

// ----------------------------------------------------------------------

const List = (theme: Theme) => ({
  MuiList: {
    styleOverrides: {
      root: {},
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        margin: "0 16px",
        "&.Mui-selected": {
          backgroundColor: theme.palette.grey[800],
          borderRadius: theme.shape.borderRadius,
          ".MuiTypography-root": {
            color: WHITE[100],
          },
        },
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: "inherit",
        minWidth: "auto",
        marginRight: theme.spacing(2),
      },
    },
  },
  MuiListItemAvatar: {
    styleOverrides: {
      root: {
        minWidth: "auto",
        marginRight: theme.spacing(2),
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      root: {
        marginTop: 0,
        marginBottom: 0,
        "& .MuiTypography-root": {
          color: "#ACB0B9",
        },
      },
      multiline: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
  },
});

export default List;
