import { alpha } from "@mui/material";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const LIGHT_THEME_TEXT = "rgb(57, 65, 73)";
const DARK_THEME_TEXT = "rgb(255,255,255)";

export const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        Avatar: {
          defaultBg: DARK_THEME_TEXT,
        },
        mode: "dark",
        primary: {
          main: DARK_THEME_TEXT,
        },
        // text: {
        //   primary: LIGHT_THEME_TEXT,
        // },
        // secondary: {
        //   main: "rgb(212,212,212)",
        // },
      },
    },
    light: {
      // https://colorhunt.co/palette/ff6d60f7d060f3e99f98d8aa
      palette: {
        Avatar: {
          defaultBg: LIGHT_THEME_TEXT,
        },
        TableCell: {
          border: alpha(LIGHT_THEME_TEXT, 0.33),
        },
        background: {
          default: "#c8bb9b",
        },
        primary: {
          main: LIGHT_THEME_TEXT,
        },
        text: {
          primary: LIGHT_THEME_TEXT,
        },
      },
    },
  },
  typography: {
    // "Roboto Mono",
    fontFamily: [
      "monospace",
      "system-ui",
      // "Roboto",
    ].join(","),
  },
});

// components: {
//   MuiButton: {
//     styleOverrides: {
//       root: {
//         background: "rgb(255,255,255, 0.15)",
//         textTransform: "none",
//       },
//     },
//   },
// },
// components: {
//   MuiButton: {
//     styleOverrides: {
//       root: {
//         background: "rgb(0,0,0, 0.05)",
//         textTransform: "none",
//       },
//     },
//   },
// },
