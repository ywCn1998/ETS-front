import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import { PaletteMode } from "@mui/material";


// --------------------------- css
import "react-toastify/dist/ReactToastify.css";
import 'swiper/css';

// --------------------------- utiles
import theme from "../theme/theme";
import queryClient from '../utils/queryClient';
import OutletComponent from "./outLetComponent";
import { useEffect } from "react";




interface IProps {
    defaultPalette?: PaletteMode;
}


export const Layout = ({ }: IProps) => {


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/auth/login'
        }
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <ToastContainer rtl position="bottom-center" autoClose={3000} limit={3} draggablePercent={80} draggable />
                <CssBaseline />

                <OutletComponent />

            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default Layout;
