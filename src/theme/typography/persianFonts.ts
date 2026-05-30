import type { TypographyVariantsOptions } from "@mui/material/styles";
import { GRAY } from "../colors";

export default function persianFonts(): TypographyVariantsOptions {
  return {
    allVariants: {
      color: GRAY[900],
    },
    fontFamily: "Dana",
    regular10: {
      fontSize: "0.625rem",
      fontWeight: 400,
      lineHeight: "1.125rem",
    },
    regular12: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: "1.125rem",
    },
    medium12: {
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: "1.125rem",
    },
    semiBold12: {
      fontSize: "0.75rem",
      fontWeight: 600,
      lineHeight: "1.125rem",
    },
    regular14: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.5rem",
    },
    regular44: {
      fontSize: "2.75rem",
      fontWeight: 900,
      lineHeight: "3.575rem",
    },
    medium14: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: "1.375rem",
    },
    semiBold14: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: "1.375rem",
    },
    regular16: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "1.5rem",
    },
    medium16: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: "1.5rem",
    },
    semiBold16: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: "1.5rem",
    },
    bold16: {
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: "1.625rem",
    },
    bold18: {
      fontSize: "1.125rem",
      fontWeight: 700,
      lineHeight: "1.75rem",
    },
    bold20: {
      fontSize: "1.25rem",
      fontWeight: 700,
      lineHeight: "2rem",
    },
  };
}
