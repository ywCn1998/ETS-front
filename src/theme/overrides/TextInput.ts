
import { Theme } from "@mui/material";


// '& .MuiOutlinedInput-root': {
//     '&:hover fieldset': {
//       borderColor: 'blue', // Border color on hover
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: 'green', // Border color on focus
//     },
//   },
const TextInput = (): Theme["components"] => {
    return {
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                      borderRadius: theme.spacing(2),
                    width: "100%",
                    '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main + ' !important',
                    },
                    "&:hover fieldset": {
                        borderColor: theme.palette.primary.main + ' !important',
                    },
                    "&.Mui-error": {
                        borderColor: theme.palette.error.main,
                    },
                }),
                input: {
                    fontSize: "0.875rem",
                },
            },
        },
    };
};

export default TextInput;
