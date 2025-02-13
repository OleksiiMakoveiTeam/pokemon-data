import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

// some custom theme in case if we want to extend and/or override default theme
// ideally we would have a design system with a set of colors, typography, etc.
// also a good idea to have a tool to see existing components with the new theme
export const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  cssVariables: true,
  components: {
    MuiContainer: {
      defaultProps: {
        disableGutters: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "5px !important",
          padding: "10px 15px 10px 20px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "0px !important",
          border: "none !important",
        },
      },
    },
  },
  // Colors ideally should be stored in a separate file for a better accessibility
  // Might move it to a separate file in the future
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});
