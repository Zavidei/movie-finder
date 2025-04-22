"use client";
import { Box, TextField, Typography, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MainIconForLogin from "@/icons/MainIconForLogin";
import { useState } from "react";

const LoginWindow = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'background.main',
        }}>
            <Box sx={{
                backgroundColor: 'background.light',
                width: { xs: '90%', sm: '70%', md: '30%' },
                minWidth: 350,
                maxWidth: 450,
                height: { xs: 'auto', md: '80vh' },
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

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 3,
                    width: '100%'
                }}>
                    <TextField
                        label="Enter email"
                        variant="outlined"
                        fullWidth
                        size="medium"
                        sx={{
                            width: '85%',
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'background.light100',
                                color: 'text.main',
                                '& fieldset': {
                                    borderColor: 'divider.main'
                                },
                                '&:hover fieldset': {
                                    borderColor: 'text.muted'
                                }
                            },
                            '& .MuiInputLabel-root': {
                                color: 'text.muted'
                            }
                        }}
                    />

                    <TextField
                        label="Enter password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        fullWidth
                        size="medium"
                        sx={{
                            width: '85%',
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'background.light100',
                                color: 'text.main',
                                '& fieldset': {
                                    borderColor: 'divider.main'
                                },
                                '&:hover fieldset': {
                                    borderColor: 'text.muted'
                                }
                            },
                            '& .MuiInputLabel-root': {
                                color: 'text.muted'
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        sx={{
                                            color: 'text.muted',
                                            '&:hover': {
                                                color: 'text.main'
                                            }
                                        }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                            mt: 1,

                            width: '50%',
                            fontSize: '1.3rem',
                            fontWeight: 'bold',
                            backgroundColor: 'background.light100',
                            boxShadow: 'none',
                            color: 'text.main',
                            '&:hover': {
                                backgroundColor: 'button.hover.active',
                                color: 'text.active',
                            }
                        }}
                    >
                        Login
                    </Button>
                </Box>

            </Box>
        </Box>
    );
}

export default LoginWindow;