import { CssVarsThemeOptions, Fade } from "@mui/material"
import { blue, grey } from "@mui/material/colors"

export const MainFont = "'Roboto Flex', sans-serif"
export const SerifFont = "'Roboto Serif', serif"
export const MonoFont = "'IBM Plex Mono', monospace"

export const bgColor = "rgb(242, 242, 245)"

// const cutCorners =
//   "polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)"

export const theme: CssVarsThemeOptions = {
  colorSchemes: {
    dark: {
      palette: {
        Avatar: {
          defaultBg: grey[800],
        },
        TableCell: {
          // border: "none",
          border: "rgba(255,255,255, 0.05)",
        },
        // Tooltip: {
        //   bg: "rgb(240, 240, 240)",
        // },
        background: {
          default: "rgb(40, 40, 40)",
          paper: "rgb(45, 45, 45)",
        },
        // secondary: {
        //   main: "rgb(0, 211, 149)",
        // },
        info: {
          main: blue.A100,
        },
        primary: {
          main: "rgb(136, 101, 160)",
        },
        secondary: {
          main: "rgb(160, 160, 160)",
        },
        text: {
          secondary: "rgba(255, 255, 255, 0.5)",
        },
      },
    },
    light: {
      palette: {
        TableCell: {
          border: "rgba(0,0,0, 0.05)",
        },
        background: {
          default: bgColor,
          paper: "rgb(255, 255, 255)",
        },
        info: {
          main: blue.A400,
        },
        primary: {
          main: "rgb(136, 101, 160)",
        },
        secondary: {
          main: "rgb(120, 120, 120)",
        },
      },
    },
  },
  // transitions: {
  //   easing: {
  //     // sharp: "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
  //   },
  // },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
            backdropFilter: "blur(20px)",
          },
        },
      },
    },
    // MuiBackdrop: {
    //   styleOverrides: {
    //     root: {
    //       "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
    //         backdropFilter: "blur(8px)",
    //         backgroundColor: "var(--mui-palette-background-backdrop)",
    //       },
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "32px",
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
            backdropFilter: "blur(20px)",
          },
          border: "1px solid var(--mui-palette-divider)",
          boxShadow: "unset",
          // clipPath: cutCorners,
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        TransitionComponent: Fade,
      },
    },
    // MuiTableRow: {
    //   styleOverrides: {
    //     root: {
    //       "&:nth-of-type(odd)": {
    //         backgroundColor: "rgba(45, 45, 45, 0.5)",
    //       },
    //     },
    //   },
    // },
    MuiTooltip: {
      defaultProps: {
        PopperProps: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 16],
              },
            },
          ],
        },
        TransitionComponent: Fade,
        arrow: true,
        disableInteractive: true,
        enterDelay: 0,
        followCursor: true,
      },
      styleOverrides: {
        arrow: {
          color: "rgba(0,0,0,1)",
        },
        tooltip: {
          background: grey[900],
          border: "1px solid rgba(0,0,0,1)",
          borderRadius: 0,
          fontSize: "0.8rem",
          fontWeight: 300,
          maxWidth: 320,
          paddingBottom: 8,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 8,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          lineHeight: 1.25,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    body1: {
      fontWeight: 300,
    },
    body2: {
      fontWeight: 300,
    },
    caption: {
      fontWeight: 300,
      letterSpacing: "0.05rem",
    },
    fontFamily: MainFont,
  },
}
