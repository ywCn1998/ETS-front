import { Theme } from "@mui/material";

const Tabs = (): Theme["components"] => {
  return {
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 0,
        },
      },
    },
  };
};

export default Tabs;
