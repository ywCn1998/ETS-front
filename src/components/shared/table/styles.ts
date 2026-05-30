import { Box, styled } from "@mui/material";

export const TableBox = styled(Box)(() => ({
  width: "100%",
  border: 'solid 1px #EBEBEB',
  borderRadius: 0,
  backgroundColor: 'white'
}));

export const EmptyBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: `${theme.spacing(6)} 0`,
}));
