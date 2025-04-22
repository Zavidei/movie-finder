"use client";
import { Box, Typography, Button } from "@mui/material";
import MainIconForLogin from "@/icons/MainIconForLogin";
import RegistrationForm from "./RegistrationForm";

const RegistrationWindow = () => {
    const handleRegistrationSubmit = (formData) => {
        console.log('Form submitted:', formData);
      };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh' ,
            backgroundColor: 'background.main',
        }}>
            <Box sx={{
                backgroundColor: 'background.light',
                width: { xs: 'auto', sm: '70%', md: '50%' },
                minWidth: 350,
                maxWidth: 450,
                height: { xs: 'auto', md: 'auto' },
                minHeight: 500,
                borderRadius: 5,
                border: '2px solid',
                borderColor: 'divider.main',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                boxShadow: 3
            }}>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    mt: 5,
                }}>
                    <Typography variant="h4" component="h1" fontWeight="normal">
                        Welcome to
                    </Typography>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        MovieFinder
                    </Typography>
                </Box>


                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',

                }}>
                    <MainIconForLogin />
                </Box>

                <RegistrationForm onSubmit={handleRegistrationSubmit} />

            </Box>
        </Box>
    );
}

export default RegistrationWindow;