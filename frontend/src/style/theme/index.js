import { createTheme } from "@mui/material/styles";
// import { darken, lighten } from "polished";

export const DrawerWidth = 250;

// https://mui.com/material-ui/customization/color/
export const Colors = {
  primary: "#00838f",
//   "#5f2c3e",
  secondary: "#b39ddb",
//   "#d1adcc",
  success: "#51d657",
  info: "#00a2ff",
  danger: "#ff2222",
  warning: "#FFC107",
  dark: "#008ba2",
  light: "#62eeff",
  muted: "#abafb3",
  border: "#DDDFE1",
  inverse: "#2F3D4A",
  shaft: "#333",
  ///////////////
  // Grays
  ///////////////
  dim_grey: "#696969",
  dove_gray: "#d5d5d5",
  body_bg: "#f3f6f9",
  light_gray: "rgb(230,230,230)",
  ///////////////
  // Solid Color
  ///////////////
  white: "#fff",
  black: "#000",
};

const theme = createTheme({
    palette: {
        primary: {
        main: Colors.primary,
        },
        secondary: {
        main: Colors.secondary,
        },
    },
    // divider: {
    //     // Theme Color, or use css color in quote.
    //     background: Colors.secondary. divider,
    // }
//   components: {
//     MuiButton: {
//       defaultProps: {
//         disableRipple: true,
//         disableElevation: true,
//       },
//     },
//     MuiTooltip: {
//       defaultProps: {
//         arrow: true,
//       },
//       styleOverrides: {
//         tooltip: {
//           background: Colors.primary,
//         },
//         arrow: {
//           color: Colors.primary,
//         },
//       },
//     },
//     MuiDrawer: {
//       styleOverrides: {
//         paper: {
//           width: DrawerWidth,          
//           background: Colors.primary,
//           color: Colors.secondary,
//           borderRadius: '0px 100px 0px 0px',
//           borderRight: `1px solid ${Colors.primary}`
//         }
//       }
//     },
//     MuiDivider: {
//       styleOverrides: {
//         root: {
//           borderColor: lighten(0.2, Colors.primary)
//         }
//       }
//     },
//     MyShopButton: {
//       styleOverrides: {
//         root: {
//           color: Colors.white,
//         },
//         primary: {
//           background: Colors.primary,
//           "&:hover": {
//             background: lighten(0.05, Colors.primary),
//           },
//         },
//         secondary: {
//           background: `${Colors.secondary}`,
//           "&:hover": {
//             background: lighten(0.05, Colors.primary),
//           },
//         },
//       },
//     },
//   },
});

export default theme;