"use client";

import { ThemeProvider } from '@mui/material/styles';
import getTheme from '@/assets/theme';

const theme = getTheme();

export default function MuiProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}