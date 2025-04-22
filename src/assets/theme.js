import { createTheme } from '@mui/material';

const getTheme = () => {
  return createTheme({
    palette: {
      primary: {
        main: "#68E3FF", 
        contrastText: "#0F1115" 
      },
      background: {
        main: "#0F1115",
        light: "#1A1E24",
        light100: "#2A2F36"
      },
      text: {
        main: "#68E3FF",
        secondary: "#A1EDF9",
        muted: "#4D7C8A",
        active: "#0F1115"
      },
      divider: {
        main: "#273038"
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: "#A1EDF9" 
            }
          }
        }
      }
    }
  });
}

export default getTheme;