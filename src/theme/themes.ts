import { ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { Themes } from './types';

const sharedTheme = {
  spacing: 4,
  typography: {
    allVariants: {
      fontFamily: 'Manrope, sans-serif',
    },
  },
  palette: {
    primary: {
      main: '#3F51B5', // Indigo
    },
    secondary: {
      main: '#D4CB92', // Deep Orange
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    success: {
      main: '#4CAF50', // Green
    },
    grey: {
      500: '#9E9E9E', // Grey
    },
    common: {
      white: '#FFFFFF', // White
    },
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#fafafa',
          },
          '&:hover': {
            color: '#970B80',
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '33px',
          fontSize: '1rem',
          fontWeight: 'bold',
          color: '#fff7fe',
          backgroundColor: '#6C92B6',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        vertical: {
          marginRight: 10,
          marginLeft: 10,
        },
        middle: {
          marginTop: 10,
          marginBottom: 10,
          width: '80%',
        },
      },
    },
  },
} as ThemeOptions; // the reason for this casting is deepmerge return type

const themes: Record<Themes, ThemeOptions> = {
  light: deepmerge(sharedTheme, {
    palette: {
      mode: 'light',
      background: {
        default: '#f2f2f2',
        paper: '#fff',
        grey: '#f9f7f6',
      },
      primary: {
        // main: '#3F51B5',
        main: '#6C92B6',
        light: '#fff7fe',
        contrastText: '#EDC363',
      },
      secondary: {
        main: '#537131',
        light: '#A2A915',
        contrastText: '#3F3929',
      },
      error: {
        main: '#d72a31',
      },
      grey: {
        500: '#9E9E9E', // Grey
      },
      common: {
        white: '#FFFFFF', // White
      },
    },
  }),
};

export default themes;
