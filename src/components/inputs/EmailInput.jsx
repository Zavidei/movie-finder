import { TextField } from "@mui/material";
import PropTypes from 'prop-types';

const EmailInput = ({ value, onChange, error, helperText }) => {
  return (
    <TextField
      label="Enter email"
      variant="outlined"
      fullWidth
      size="medium"
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      autoComplete="email"
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
    />
  );
};

EmailInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string
};

export default EmailInput;