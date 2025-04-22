import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PropTypes from 'prop-types';

const RepeatPasswordInput = ({ value, onChange, error, helperText }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      label="Repeat your password"
      type={showPassword ? "text" : "password"}
      variant="outlined"
      fullWidth
      size="medium"
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
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
              onClick={() => setShowPassword(!showPassword)}
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
  );
};

RepeatPasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string
};

export default RepeatPasswordInput;