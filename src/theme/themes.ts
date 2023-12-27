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
    background: {
      default: '#fafafa',
      paper: '#fff',
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
// TODO (Suren): replace mui-utils-deepmerge with lodash or ramda deepmerge

const themes: Record<Themes, ThemeOptions> = {
  light: deepmerge(sharedTheme, {
    palette: {
      mode: 'light',
      background: {
        default: '#fafafa',
        paper: '#fff',
        grey: '#f9f7f6',
      },
      primary: {
        main: '#970B80',
        dark: '#502048',
        light: '#fff7fe',
        contrastText: '#fff',
      },
      secondary: {
        main: '#fff7fe',
        contrastText: '#f56b0c',
      },
    },
  }),

  // dark: deepmerge(sharedTheme, {
  //   palette: {
  //     mode: 'dark',
  //     background: {
  //       default: '#111',
  //       paper: '#171717',
  //     },
  //     primary: {
  //       main: '#333',
  //     },
  //   },
  // }),
};

export default themes;
