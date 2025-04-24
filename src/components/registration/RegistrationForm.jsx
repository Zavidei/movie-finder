import { useState } from 'react';
import { Box, Button } from "@mui/material";
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import RepeatPasswordInput from '../inputs/RepeatPasswordInput';

const RegistrationForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);
    const [repeatPasswordHelperText, setRepeatPasswordHelperText] = useState('');

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };

    const validatePasswords = () => {
        let isValid = true;

        if (!password) {
            setPasswordError(true);
            setPasswordHelperText('Password is required');
            isValid = false;
        } else if (password.length < 5) {
            setPasswordError(true);
            setPasswordHelperText('Password must be at least 5 characters');
            isValid = false;
        } else if (password.length > 15) {
            setPasswordError(true);
            setPasswordHelperText('Password must be no more than 15 characters');
            isValid = false;
        } else if (/[а-яА-ЯЁё]/.test(password)) {
            setPasswordError(true);
            setPasswordHelperText('Password must not contain Cyrillic letters');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordHelperText('');
        }

        if (!repeatPassword) {
            setRepeatPasswordError(true);
            setRepeatPasswordHelperText('Please repeat your password');
            isValid = false;
        } else if (password !== repeatPassword) {
            setRepeatPasswordError(true);
            setRepeatPasswordHelperText('Passwords do not match');
            isValid = false;
        } else {
            setRepeatPasswordError(false);
            setRepeatPasswordHelperText('');
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;

        if (email === '') {
            setEmailError(true);
            setEmailHelperText('Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError(true);
            setEmailHelperText('Please enter a valid email');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailHelperText('');
        }

        if (!validatePasswords()) {
            isValid = false;
        }

        if (!isValid) return;

        onSubmit({ email, password });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                alignItems: 'center',
                width: '100%'
            }}
        >
            <EmailInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailHelperText}
            />

            <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                helperText={passwordHelperText}
            />

            <RepeatPasswordInput
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                error={repeatPasswordError}
                helperText={repeatPasswordHelperText}
            />

            <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                    mt: 3,
                    mb: 3,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    width: '85%',
                    backgroundColor: 'background.light100',
                    color: 'text.main',
                    '&:hover': {
                        backgroundColor: 'button.hover.active',
                        color: 'text.active',
                    }
                }}
            >
                Register
            </Button>
            
        </Box>
    );
};

export default RegistrationForm;