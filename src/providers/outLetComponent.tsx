import { Box, Stack } from "@mui/material"
import Header from "@src/components/shared/header"
import { Outlet } from "react-router-dom"
import SideBar from "@src/components/shared/sideBar"




const OutletComponent = () => {

    return (
        <>
            <Box display="flex" flexDirection="row" sx={{ width: '100%', overflowX: 'hidden' }}>

                <SideBar />

                <Stack sx={{ flex: 1, minWidth: 0 }}>
                    <Header />

                    <Stack
                        component="main"
                        sx={{
                            minHeight: '90vh',
                            flex: 1,
                            backgroundColor: '#FAFAFA',
                            minWidth: 0,
                            overflowX: 'hidden',
                        }}
                    >
                        <Outlet />
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default OutletComponent;