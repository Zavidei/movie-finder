"use client";
import { Box, Typography } from "@mui/material";
import MainIconForLogin from "@/icons/MainIconForLogin";
import LoginForm from "./LoginForm";
import { useRouter } from "next/navigation";
import { findUserByCredentials } from "@/app/data/authData";
import { signToken } from "@/app/lib/auth";

const LoginWindow = () => {
    const router = useRouter();

    const registeationLink = () => {
        router.push('/registration');
    };

    const handleLoginSubmit = async (formData) => {
        try {
          const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
      
          const data = await res.json();
          if (!res.ok) throw new Error(data.error);
      
          localStorage.setItem('authToken', data.token);
          router.push('/dashboard');
        } catch (error) {
          alert(error.message);
        }
      };
      

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'background.main',
        }}>
            <Box sx={{
                backgroundColor: 'background.light',
                width: { xs: '90%', sm: '70%', md: '50%' },
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
                    mt: 5
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

                <LoginForm onSubmit={handleLoginSubmit} />
            </Box>
            <Typography onClick={registeationLink} sx={{
                mt: 2,
                cursor: 'pointer',
            }}>
                Registration
            </Typography>
        </Box>
    );
}

export default LoginWindow;