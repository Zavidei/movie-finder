import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PropTypes from 'prop-types';

const PasswordInput = ({ value, onChange, error, helperText }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      label="Enter password"
      type={showPassword ? "text" : "password"}
      variant="outlined"
      fullWidth
      size="medium"
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      autoComplete="current-password"
      sx={{
        width: '85%',
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'background.light100',
          color: 'text.main',
          '& fieldset': {
            borderColor: error ? 'error.main' : 'divider.main'
          },
          '&:hover fieldset': {
            borderColor: error ? 'error.main' : 'text.muted'
          },
          '&.Mui-focused fieldset': {
            borderColor: error ? 'error.main' : 'text.muted'
          }
        },
        '& .MuiInputLabel-root': {
          color: 'text.muted',
          '&.Mui-focused': {
            color: error ? 'error.main' : 'text.muted'
          }
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              sx={{ color: 'text.muted' }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string
};

export default PasswordInput;