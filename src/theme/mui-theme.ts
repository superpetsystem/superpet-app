import { createTheme } from "@mui/material/styles";

// 🎨 Paleta Oficial — Super Pet System
const palette = {
  teal: "#0E6A6B",        // Primária: botões, header, menus
  tealLight: "#1A8A8D",    // Hover estados
  tealDark: "#0A4A4B",     // Estados ativos
  
  orange: "#E47B24",       // Secundária: destaques, ícones, CTA
  orangeLight: "#E8984A",  
  orangeDark: "#B85D1D",  
  
  iceWhite: "#F8F5EE",     // Texto principal (branco gelo)
  offWhite: "#F2EBDD",     // Fundo neutro externo
  darkBlack: "#1E1E1E",    // Texto escuro secundário
};

// Align MUI palette with official Super Pet colors
export const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: palette.teal,
      light: palette.tealLight,
      dark: palette.tealDark,
      contrastText: palette.iceWhite,
    },
    secondary: {
      main: palette.orange,
      light: palette.orangeLight,
      dark: palette.orangeDark,
      contrastText: palette.iceWhite,
    },
    background: {
      default: palette.offWhite,
      paper: palette.iceWhite,
    },
    text: {
      primary: palette.darkBlack,
      secondary: "#6B6B6B",
    },
    error: { 
      main: "#DC2626",
      contrastText: palette.iceWhite,
    },
    success: { main: "#16A34A", contrastText: "#FFFFFF" },
    warning: { main: palette.orange, contrastText: palette.iceWhite },
    info: { main: palette.teal, contrastText: palette.iceWhite },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Geist", "Geist Fallback", sans-serif',
    h1: { fontWeight: 700, fontSize: "2.5rem" },
    h2: { fontWeight: 700, fontSize: "2rem" },
    h3: { fontWeight: 600, fontSize: "1.5rem" },
    h4: { fontWeight: 600, fontSize: "1.25rem" },
    h5: { fontWeight: 600, fontSize: "1.125rem" },
    h6: { fontWeight: 600, fontSize: "1rem" },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" },
  },
  spacing: 8,
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 10,
          padding: "8px 24px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});


