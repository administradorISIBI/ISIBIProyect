import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Función para crear el tema con parámetros
export const createCustomTheme = (
  primaryColor,
  secondaryColor,
  backgroundColor
) => {
  return createTheme({
    palette: {
      background: {
        main: backgroundColor.main,
      },
      primary: {
        main: primaryColor.main,
        light: primaryColor.light,
        dark: primaryColor.dark,
      },
      secondary: {
        main: secondaryColor.main,
        light: secondaryColor.light,
        dark: secondaryColor.dark,
        ultralight: secondaryColor.ultralight,
      },
      footer: {
        main: "#535353",
      },
      text: {
        main: "#ffffff",
        dark: "#333333",
      },
      error: {
        main: red.A700,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.text.dark,
            textTransform: "capitalize",
            padding: "10px 14px",
            margin: "5px",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.text.dark,
            },
          }),
          secondary: {
            border: "1px solid #DC2D22",
            color: "#dc2d22",
            backgroundColor: "white",
            margin: "5px",
            "&:hover": {
              color: "#fff",
              backgroundColor: "#dc2d22",
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: "10px",
            margin: "5px 0px",
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
              transition: "background-color 0.3s ease",
            },
          }),
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            color: "black",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.main,
            backgroundColor: theme.palette.primary.main,
          }),
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {},
          centered: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: "100%",
          },
          secondary: ({ theme }) => ({
            color: theme.palette.text.main,
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            textTransform: "capitalize",
            color: theme.palette.text.dark,
            backgroundColor: theme.palette.secondary.dark,
          }),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
              transition: "background-color 0.3s ease",
            },
          }),
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: "2rem",
            color: "secondary.dark",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.main,
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
              transition: "background-color 0.3s ease",
            },
          }),
        },
      },
    },
  });
};

// const primaryColor = {
//   main: "#196844",
//   light: "#25B322",
//   dark: "#013a06",
// };

// const secondaryColor = {
//   main: "#FFD400",
//   light: "#FFE106",
//   dark: "#FFAA00",
//   ultralight: "#FCF80A",
// };

// const backgroundColor = {
//   main: "#fafafa",
// };

// const primaryColorNight = {
//   main: "#0D3A2E",
//   light: "#1E6F51",
//   dark: "#001F1A",
// };

// const secondaryColorNight = {
//   main: "#FFC107",
//   light: "#FFD54F",
//   dark: "#FF8F00",
//   ultralight: "#FFEA00",
// };

// const backgroundColorNight = {
//   main: "#acacac",
// };

// // export const themeConfig = createCustomTheme(
// //   primaryColor,
// //   secondaryColor,
// //   background
// // );
// export const themeConfig = createCustomTheme(
//   primaryColorNight,
//   secondaryColorNight,
//   backgroundColorNight
// );
