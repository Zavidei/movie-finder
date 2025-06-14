"use client";
import { AppBar, Box, Toolbar, TextField, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MainIcon from '../../icons/MainIcon';
import LogoutIcon from '../../icons/LogoutIcon';
import { useRouter } from 'next/navigation';
import UserProfile from './UserProfile';
import { usePathname } from 'next/navigation';



export default function NavBar({ onSearch, query, setQuery }) {
    const router = useRouter();
    const pathname = usePathname();


    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        router.push('/login');
    };

    return (
        <Box>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'background.light',
                    color: 'text.main',
                    boxShadow: 'none',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1
                    }}>
                    <Box onClick={() => router.push('/dashboard')} sx={{ cursor: 'pointer', lineHeight: 0 }}>
                        <MainIcon />
                    </Box>

                    {pathname !== '/favorites' && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                variant="outlined"
                                placeholder="Enter name film ..."
                                size="small"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                                sx={{
                                    width: 450,
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'background.light100',
                                        color: 'text.main',
                                        '& fieldset': {
                                            borderColor: 'divider.main'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'text.muted'
                                        }
                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: 'text.muted' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'background.light100',
                                    color: 'text.main',
                                    '&:hover': {
                                        backgroundColor: 'button.hover.active',
                                        color: 'text.active',
                                    }
                                }}
                                onClick={onSearch}
                            >
                                Search
                            </Button>

                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'background.light100',
                                    color: 'text.main',
                                    '&:hover': {
                                        backgroundColor: 'button.hover.active',
                                        color: 'text.active',
                                    }
                                }}
                                onClick={() => router.push('/favorites')}
                            >
                                Favorite Films
                            </Button>
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <UserProfile />
                        <Box onClick={handleLogout} sx={{ cursor: 'pointer', lineHeight: 0 }}>
                            <LogoutIcon />
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}