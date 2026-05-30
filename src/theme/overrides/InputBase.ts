import { Theme } from "@mui/material";

const InputBase = (): Theme["components"] => {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({

          borderRadius: theme.spacing(2),
          width: "100%",
          // padding: `${theme.spacing(2)} ${theme.spacing(2.5)} ${theme.spacing(
          //   .5
          // )}`,
          // '& .MuiOutlinedInput-root': {
          //   border: `1px solid red !important`,
          // },
          // "&:focus": {
          //   borderColor: theme.palette.primary.main,
          // },
          // "&:hover": {
          //   borderColor: theme.palette.primary.main,
          // },
          // "&.Mui-error": {
          //   borderColor: theme.palette.error.main,
          // },
        }),
        input: {
          // fontSize: "0.875rem",
        },
      },
    },
  };
};

export default InputBase;

