
import { CSSProperties } from "react";
import {
  createTheme,
  darken,
  lighten,
} from "@mui/material/styles";

import persianFonts from "./typography/persianFonts";
import {
  createColorObject,
  GREEN,
  RED,
  WHITE,
  GRAY,
  YELLOW,
} from "./colors";
import ComponentsOverrides from "./overrides";

const theme = createTheme({
  direction: "ltr",
  spacing: 4,
  palette: {
    mode: "light",
    primary: {
      light: lighten('#003B73', 0.2),
      main: '#003B73',
      dark: darken('#003B73', 0.8),
    },
    secondary: {
      light: lighten('#333', 1),
      main: '#333',
      dark: darken('#333', 1),
    },
    success: createColorObject(GREEN),
    error: createColorObject(RED),
    warning: createColorObject(YELLOW),
    background: {
      default: WHITE[500],
      paper: WHITE[500],
    },
    text: {
      primary: '#333',
      secondary: '#333',
      disabled: "#ACB0B9",
    },
    grey: GRAY,
    stroke: {
      active: "#D3D5D9",
      inactive: "#E6E7EA",
    },
    back: {
      surface: WHITE[500],
      subdude: GRAY[50],
    },
    input: {
      disable: GRAY[50],
      activeBorder: "#D3D5D9",
    },
    table: {
      header: "#F9FAFB",
    },
    textColor: {
      muted: "#818692",
      title: "#15181E",
      body: "#45464F",
    },
  },
  typography: persianFonts(),
  shape: {
    borderRadius: 10,
  },
});

theme.components = ComponentsOverrides(theme);

export interface IPalette {
  stroke: {
    active: string;
    inactive: string;
  };
  back: {
    surface: string;
    subdude: string;
  };
  input: {
    disable: string;
    activeBorder: string;
  };
  table: {
    header: string;
  };
  textColor: {
    muted: string;
    title: string;
    body: string;
  };
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    regular10: CSSProperties;
    regular12: CSSProperties;
    medium12: CSSProperties;
    semiBold12: CSSProperties;
    regular14: CSSProperties;
    medium14: CSSProperties;
    semiBold14: CSSProperties;
    regular16: CSSProperties;
    medium16: CSSProperties;
    semiBold16: CSSProperties;
    bold16: CSSProperties;
    bold18: CSSProperties;
    bold20: CSSProperties;
    regular44: CSSProperties;
  }

  interface TypographyVariantsOptions {
    regular10?: CSSProperties;
    regular12?: CSSProperties;
    medium12?: CSSProperties;
    semiBold12?: CSSProperties;
    regular14?: CSSProperties;
    medium14?: CSSProperties;
    semiBold14?: CSSProperties;
    regular16?: CSSProperties;
    medium16?: CSSProperties;
    semiBold16?: CSSProperties;
    bold16?: CSSProperties;
    bold18?: CSSProperties;
    bold20?: CSSProperties;
    regular44?: CSSProperties;
  }

  interface Palette extends IPalette { }

  interface PaletteOptions extends IPalette { }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    regular10: true;
    regular12: true;
    medium12: true;
    semiBold12: true;
    regular14: true;
    medium14: true;
    semiBold14: true;
    regular16: true;
    medium16: true;
    semiBold16: true;
    bold16: true;
    bold18: true;
    bold20: true;
    regular44: true;
  }
}

export default theme;
