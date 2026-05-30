import { LogoutOutlined } from "@mui/icons-material";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, Stack, Toolbar, Typography } from "@mui/material"
import useSideBarItems from "@src/constants/sideBarItems";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";



const SideBar = () => {
    // const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    // const [isClosing, setIsClosing] = useState(false);
    const location = useLocation(); // Get the current location object
    const { sidbarItems } = useSideBarItems();



    const handleDrawerClose = () => {
        // setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        // setIsClosing(false);
    };

    const isActive = (path: string) => location.pathname === path;


    const Logout = () => {
        window.localStorage.clear();
        window.location.href = '/auth/login'
    }



    const drawer = (
        <div className="bg-[#191d24] h-full" >
            <Toolbar>
                <Typography color="primary" variant="bold20">IFC Viewer</Typography>
            </Toolbar>
            <Divider className="bg-white" />

            <List>
                {sidbarItems.map((item) => (
                    <ListItem key={item.title} disablePadding >
                        <ListItemButton sx={{ p: 0, py: 1 }}
                           >
                            <Stack
                                component={Link}
                                to={item.route}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 2,
                                    borderRadius: '5px',
                                    width: '100%',
                                }}
                            // }
                            // className={`flex flex-row gap-2 items-center rounded-[5px] w-full h-full p-2 
                            // ${isActive(item.route) ? 'bg-primary-light' : 'bg-[#191d24]'}
                            //  `} 
                            >
                                {<item.icon
                                    sx={{
                                        color: (theme: any) => isActive(item.route) ? theme.palette.primary.main : theme.palette.text.primary
                                    }}
                                // className={`${isActive(item.route) ? 'text-primary-main' : 'text-white'}`}
                                />}
                                <Typography
                                    sx={{
                                        color: theme => isActive(item.route) ? theme.palette.primary.main : theme.palette.text.primary
                                    }}
                                // className={`${isActive(item.route) ? 'text-primary-main' : 'text-white'}`}
                                >{item.title}</Typography>

                            </Stack>
                        </ListItemButton>

                    </ListItem>
                ))}
            </List>

            <Divider className="bg-white" />

            <ListItem key={'logout'} disablePadding >
                <ListItemButton sx={{ p: 0, py: 1 }}>
                    <Stack
                        onClick={() => Logout()}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2,
                            p: 2,
                            borderRadius: '5px',
                            width: '100%',
                        }}


                    >

                        <LogoutOutlined />
                        <Typography
                        >Logout</Typography>
                    </Stack>
                </ListItemButton>

            </ListItem>

        </div>
    );

    const container = window !== undefined ? () => window.document.body : undefined;













    return (
        <Box
            component="nav"
            sx={{ width: { sm: '250px' }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '250px' },

                }}
            >
                {drawer}
            </Drawer>
            
            <Stack
                sx={{
                    width: '250px',
                    height: '100%'
                }}
            >
                {drawer}
            </Stack>
        </Box>

    )
}

export default SideBar;