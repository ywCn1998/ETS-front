import { ChevronRight, KeyboardArrowDown, Person } from "@mui/icons-material";
import { Button, Popover, Stack, Typography } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router-dom";

// import InboxIcon from "@mui/icons-material/Inbox";
// import SettingsIcon from "@mui/icons-material/Settings";


const Header = () => {
    // const [openDW, setOpen] = useState(false);

    // const items: DrawerItem[] = [
    //     { key: "inbox", label: "Inbox", icon: <InboxIcon />, onClick: () => console.log("Inbox") },
    //     { key: "settings", label: "Settings", icon: <SettingsIcon />, href: "/settings" },
    // ];

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <Stack
            display={'flex'}
            flexDirection={'row'}
            sx={{
                height: 60,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'flex-end',
            }}
            px={4}
        >

            {/* <DrawerMenu
            /> */}


            <Stack
                component={Button}
                variant="text"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}
                aria-describedby={id}
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                gap={2}
            >

                <Person />
                <Typography>{localStorage.getItem('fullName')}</Typography>

                <KeyboardArrowDown sx={{ color: theme => theme.palette.text.primary }} />

            </Stack>



            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Stack
                    // height={100}
                    width={240}
                >
                    <Stack
                        to={'/'}
                        component={Link}
                        sx={{
                            height: 50,
                            width: '100%',
                            alignItems: 'center',
                            flexDirection: 'row',
                            px: 3,
                            cursor: 'pointer',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography>Profile</Typography>
                        <ChevronRight sx={{ color: theme => theme.palette.text.primary }} />
                    </Stack>
                </Stack>
            </Popover>





        </Stack >
    )
}

export default Header;