import { Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material"
import FormProvider from "@src/providers/FormProvider";
import useLoginform from "./_hooks/useLogin";
import RHFTextInput from "@src/components/shared/form/RHFTextInput";



const Login = () => {
    const { methods, OnSubmit, isPending } = useLoginform();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));




    return (
        <Grid container sx={{ height: '100vh' }}>




            <Grid
                size={{ sm: 12, md: 6 }}
                sx={{
                    px: !isMdDown ? 20 : 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%'
                }}
            >
                <FormProvider
                    methods={methods}
                    onSubmit={OnSubmit}
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20
                    }}
                >

                    <Typography
                        fontSize={34}
                        variant="bold20"
                    >Login</Typography>

                    <Typography variant="medium16">Please enter yout details</Typography>

                    <RHFTextInput
                        name="username"
                        label={'Username'}
                    />

                    <RHFTextInput
                        name="password"
                        label={'Password'}
                        type="password"
                    />

                    <Button
                        loading={isPending}
                        sx={{ mt: 10 }}
                        fullWidth
                        variant="contained"
                        type="submit"
                    >
                        login
                    </Button>


                </FormProvider>
            </Grid>


            {!isMdDown &&
                <Grid
                    size={{ sm: 12, md: 6 }}
                    sx={{
                        backgroundColor: '#001937',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
                >


                    <Typography sx={{ fontSize: 80, }} color="white" variant="bold20">.ifc</Typography>

                </Grid>
            }

        </Grid>
    )
}


export default Login;