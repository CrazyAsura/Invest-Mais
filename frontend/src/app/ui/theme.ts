'use strict';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D4AF37', // Dourado (Gold)
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#000000',
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#D4AF37',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h6: {
      fontWeight: 700,
      color: '#D4AF37',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: '#D4AF37',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#B8860B',
          },
        },
        outlinedPrimary: {
          borderColor: '#D4AF37',
          color: '#D4AF37',
          '&:hover': {
            borderColor: '#B8860B',
            backgroundColor: 'rgba(212, 175, 55, 0.08)',
          },
        },
      },
    },
  },
});

export default theme;
