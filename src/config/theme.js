import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: 16,
          fontWeight: 500,
          // background: 'linear-gradient(90deg, #FF8329 11.75%, #D0428C 51.5%, #A200EE 91.26%)'
        }
      }
    }
  },
  palette: {
    // mode: 'dark',
    // primary: {
    //   main: '#4b0076',
    //   contrastText: '#fff'
    // },
    // secondary: {
    //   // dark: "rgb(22, 38, 60)",
    //   // light: "rgb(76, 95, 119)",
    //   main: '#ff7f02',
    //   contrastText: '#fff'
    // },
    gold: {
      main: '#fce8aa'
    },
    orange: {
      main: '#ff7f02'
    },
    mainPink: {
      dark: '#b23d43',
      main: '#ff5860',
      light: '#ff55a5',
      contrastText: '#fff'
    },
    oldPrimary: {
      dark: '#1565c0',
      light: '#42a5f5',
      main: '#1976d2',
      contrastText: '#fff'
    },
    oldSecondary: {
      dark: '#7b1fa2',
      light: '#ba68c8',
      main: '#9c27b0',
      contrastText: '#fff'
    },
    plainwhite: {
      main: '#fff',
      contrastText: '#535353'
    },
    grey20: {
      main: '#F5F6F7',
      contrastText: '#A0A4A8'
    },
    grey50: {
      main: '#9A9EA7',
      // contrastText: '#9A9EA7'
    },
    black60: {
      main: '#A0A4A8',
      contrastText: '#fff'
    },
    text: {
      primary: '#25282B',
      secondary: '#52575C'
    },
    tint: {
      black:{
        5: '#EEEEEE',
        10: '#E8E8E8',
        40: '#CACCCF',
        60: '#A0A4A8',
        80: '#52575C',
        100: '#25282B',
        bold: '#0D0A19',
        normal: 'rgba(8, 8, 9, 0.86)',
        custom: 'rgba(15, 14, 15, 0.75)',
      },
      white: '#ffffff',
      grey: {
        20: '#F5F6F7',
        40: '#9A9A9A',
        50: '#9A9EA7',
      },
    }
  },
  // shape: {
  //   borderRadius: 8
  // },
  typography:{
    fontFamily: "'Roboto','Helvetica','Arial',sans-serif"
  }
});