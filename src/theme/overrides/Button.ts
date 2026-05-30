import { Theme } from "@mui/material";
import { GRAY } from "../colors";

const Button = (theme: Theme): Theme["components"] => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: theme.spacing(2),
          textTransform: "none",
        },
        sizeMedium: {
          minHeight: theme.spacing(10),
          paddingTop: theme.spacing(0.5),
          paddingBottom: 0,
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            fontSize: "0.875rem",
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            fontSize: "0.875rem",
            borderColor: theme.palette.stroke.active,
            color: GRAY[900],
            ":hover": {
              borderColor: theme.palette.stroke.active,
              backgroundColor: "transparent",
            },
          },
        },
        {
          props: { variant: "outlined", color: "error" },
          style: {
            fontSize: "0.875rem",
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
            ":hover": {
              borderColor: theme.palette.error.main,
              backgroundColor: "transparent",
            },
          },
        },
        {
          props: { variant: "text", color: "secondary" },
          style: {
            fontSize: "0.875rem",
            color: GRAY[900],
            ":hover": {
              backgroundColor: "transparent",
            },
          },
        },
      ],
    },
  };
};

export default Button;
