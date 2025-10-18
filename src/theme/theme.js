import { createTheme } from '@mui/material/styles';

// Definición del tema basado en el archivo JSON de Material Theme Builder
const lightTheme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#00696F',
      light: '#80D4DB',
      dark: '#004F54',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#4A6365',
      light: '#B1CBCE',
      dark: '#324B4D',
      contrastText: '#FFFFFF'
    },
    tertiary: {
      main: '#4F5F7D',
      light: '#B7C7EA',
      dark: '#374764',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#BA1A1A',
      light: '#FFDAD6',
      dark: '#93000A',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#F4FAFB',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#161D1D',
      secondary: '#3F4849'
    },
    surface: {
      main: '#F4FAFB',
      contrastText: '#161D1D'
    },
    surfaceVariant: {
      main: '#DAE4E5',
      contrastText: '#3F4849'
    },
    outline: {
      main: '#6F797A'
    },
    shadow: {
      main: '#000000'
    }
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 600,
      fontSize: '2.375rem',
      lineHeight: 1.2
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.2
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.2
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.2
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.2
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
          fontWeight: 500
        },
        containedPrimary: {
          backgroundColor: '#00696F',
          '&:hover': {
            backgroundColor: '#004F54'
          }
        },
        outlinedPrimary: {
          borderColor: '#00696F',
          color: '#00696F',
          '&:hover': {
            backgroundColor: 'rgba(0, 105, 111, 0.08)'
          }
        },
        textPrimary: {
          color: '#00696F',
          '&:hover': {
            backgroundColor: 'rgba(0, 105, 111, 0.08)'
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#00696F'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
          borderRadius: '12px'
        }
      }
    }
  }
};

const darkTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#80D4DB',
      light: '#9DF0F7',
      dark: '#004F54',
      contrastText: '#00363A'
    },
    secondary: {
      main: '#B1CBCE',
      light: '#CCE8EA',
      dark: '#324B4D',
      contrastText: '#1B3436'
    },
    tertiary: {
      main: '#B7C7EA',
      light: '#D7E3FF',
      dark: '#374764',
      contrastText: '#20304C'
    },
    error: {
      main: '#FFB4AB',
      light: '#FFDAD6',
      dark: '#93000A',
      contrastText: '#690005'
    },
    background: {
      default: '#0E1415',
      paper: '#1A2121'
    },
    text: {
      primary: '#DDE4E4',
      secondary: '#BEC8C9'
    },
    surface: {
      main: '#0E1415',
      contrastText: '#DDE4E4'
    },
    surfaceVariant: {
      main: '#3F4849',
      contrastText: '#BEC8C9'
    },
    outline: {
      main: '#899393'
    },
    shadow: {
      main: '#000000'
    }
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
          fontWeight: 500
        },
        containedPrimary: {
          backgroundColor: '#80D4DB',
          color: '#00363A',
          '&:hover': {
            backgroundColor: '#54D8E3'
          }
        },
        outlinedPrimary: {
          borderColor: '#80D4DB',
          color: '#80D4DB',
          '&:hover': {
            backgroundColor: 'rgba(128, 212, 219, 0.08)'
          }
        },
        textPrimary: {
          color: '#80D4DB',
          '&:hover': {
            backgroundColor: 'rgba(128, 212, 219, 0.08)'
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A2121'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A2121',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
          borderRadius: '12px'
        }
      }
    }
  }
};

// Función para crear un tema según el modo (claro u oscuro)
const getTheme = (mode) => {
  return createTheme(mode === 'dark' ? darkTheme : lightTheme);
};

export default getTheme;
