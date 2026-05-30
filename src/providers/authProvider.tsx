import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import { Box, Stack } from "@mui/material";
import type { PaletteMode } from "@mui/material";


// --------------------------- css
import "react-toastify/dist/ReactToastify.css";

// --------------------------- utiles
import theme from "../theme/theme";
import queryClient from '../utils/queryClient';
import { Outlet } from "react-router-dom";




interface IProps {
    defaultPalette?: PaletteMode; 
}


export const AuthLayout = ({ }: IProps) => {

   
    return (
        <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <ToastContainer
                        rtl
                        position="bottom-center"
                        autoClose={3000}
                        limit={3}
                        draggablePercent={80}
                        draggable
                    />
                    <CssBaseline />


                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                    >
                        <Stack
                            sx={{
                                flex: 1
                            }}
                        >
                            <Stack
                                component="main"
                                sx={{
                                    minHeight: "90vh",
                                    flex: 1,
                                    backgroundColor: '#FAFAFA',
                                }}>

                                <Outlet />
                            </Stack>
                        </Stack>
                    </Box>


                </ThemeProvider>
        </QueryClientProvider>
    )
}

export default AuthLayout;
