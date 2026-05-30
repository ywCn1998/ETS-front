import { Grid, Stack, Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";

import IFCViewer from "@src/ifc/components/IFCView";




const DashboardPage = () => {
    // const theme = useTheme();



    return (
        <Stack sx={{ width: '100%', overflowX: 'hidden' }}>
            <Grid container spacing={2} p={2} sx={{ overflowX: 'hidden' }}>
                <IFCViewer
                />

            </Grid>
        </Stack >
    );
};

export default DashboardPage;






export const FactorRow = ({ title, price, color = 'textPrimary', priceVal = true }: { title: string; price: string; color?: string, priceVal?: boolean }) => {
    return (
        <Stack
            py={2}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: '100%' }}
        >
            <Typography color={color} variant="semiBold14">{title}</Typography>
            <Stack sx={{ border: 'dashed 1px #CDCFD6', flex: 1, mx: 2 }} />
            {priceVal ?
                <Typography color={color} variant="semiBold14">{price} ریال</Typography>
                :
                <Typography color={color} variant="semiBold14">{price}</Typography>
            }
        </Stack>
    );
};





