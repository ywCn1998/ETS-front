import { Theme } from "@mui/material";

// .muirtl-xpmxfi-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root:focus-within
const Select = (_theme: Theme): Theme["components"] => {
  return {
    MuiSelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: theme.spacing(2),
          padding: `${theme.spacing(2)} ${theme.spacing(2.5)} ${theme.spacing(
            1
          )}`,
          "&:hover": {
            borderColor: theme.palette.primary.main,
          },
          "&:focus-within": {
            borderColor: theme.palette.primary.main,
            outline: `none !important`, // Custom outline on focus
            // outlineOffset: "1px", // Spacing between the border and outline
          },
          "&.Mui-error": {
            borderColor: theme.palette.error.main, // Border color for error state
            outline: `none !important`, // Custom outline on focus
            // outlineOffset: "1px",
          },
          // 'fieldset': {
          //   border: 'none !important'
          // }
          "&& fieldset": {
            "&:outline": {
              border: '1px solid red !important'
            },
            border: 'none !important'
          }
        }),
        select: ({ theme }) => ({
          padding: `${theme.spacing(1)} ${theme.spacing(1.5)} ${theme.spacing(
            1
          )}`,
          fontSize: "0.875rem",
          display: "flex",
          alignItems: "center",

        }),
      }
    },
  };
};

export default Select;
