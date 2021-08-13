import { useSettingsContext } from '@/store/settings/provider';
import { PaletteType } from '@/store/settings/state';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { useEffect } from 'react';

interface ThemeProviderProps {}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { state, actions } = useSettingsContext();
  const darkMode =
    state.themeType === null
      ? Boolean(prefersDarkMode)
      : state.themeType === PaletteType.DARK;

  useEffect(() => {
    actions.toggleThemeType(
      prefersDarkMode ? PaletteType.DARK : PaletteType.LIGHT,
    );
  }, [prefersDarkMode]);

  const theme = React.useMemo(() => {
    const nextTheme = createTheme({
      palette: {
        type: darkMode ? PaletteType.DARK : PaletteType.LIGHT,
        primary: {
          main: darkMode ? '#FACA15' : '#906608',
        },
      },
      typography: {
        // using html { font-size: 62.5%; }, set this value so mui can adjust
        // its font sizes accordingly
        htmlFontSize: 10,
        h1: {
          fontWeight: 'bold',
          fontSize: '5rem',
          marginTop: 20,
          marginBottom: 40,
        },
      },
      overrides: {
        MuiCssBaseline: {
          '@global': {
            html: {
              fontSize: '62.5%',
              boxSizing: 'border-box',
            },
            li: {
              listStyle: 'none',
            },
          },
        },
      },
    });

    return nextTheme;
  }, [darkMode]);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
