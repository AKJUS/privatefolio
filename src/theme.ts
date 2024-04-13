import { ExpandMoreRounded } from "@mui/icons-material"
import { CssVarsThemeOptions, Fade } from "@mui/material"
import { blue, grey } from "@mui/material/colors"

export const MainFont = "'Roboto Flex', sans-serif"
export const SerifFont = "'Roboto Serif', serif"
export const MonoFont = "'IBM Plex Mono', monospace"

// export const bgColor = "rgb(232, 233, 237)"
export const bgColor = "rgb(237, 238, 242)"

// const cutCorners =
//   "polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)"

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    accent: true
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    accent: true
  }
}

declare module "@mui/material/Badge" {
  interface BadgePropsColorOverrides {
    accent: true
  }
}

declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    accent: true
  }
}

declare module "@mui/material/TableCell" {
  interface TableCellPropsVariantOverrides {
    clickable: true
  }
}

declare module "@mui/material" {
  interface TypeBackground {
    paperTransparent: string
  }
  interface Palette {
    accent: Palette["primary"]
  }

  interface PaletteOptions {
    accent?: PaletteOptions["primary"]
  }
}

declare module "@mui/material/Paper" {
  interface PaperOwnProps {
    /**
     * @default "on"
     */
    transparent?: string
  }
}
declare module "@mui/material/LinearProgress" {
  interface LinearProgressPropsColorOverrides {
    accent: true
  }
}

export const theme: CssVarsThemeOptions = {
  colorSchemes: {
    dark: {
      overlays: [
        undefined,
        "linear-gradient(rgba(255 255 255 / 0.05), rgba(255 255 255 / 0.05))",
        "linear-gradient(rgba(255 255 255 / 0.07), rgba(255 255 255 / 0.07))",
        "linear-gradient(rgba(255 255 255 / 0.08), rgba(255 255 255 / 0.08))",
        undefined, // "linear-gradient(rgba(255 255 255 / 0.09), rgba(255 255 255 / 0.09))",
        "linear-gradient(rgba(255 255 255 / 0.10), rgba(255 255 255 / 0.10))",
        "linear-gradient(rgba(255 255 255 / 0.11), rgba(255 255 255 / 0.11))",
        "linear-gradient(rgba(255 255 255 / 0.11), rgba(255 255 255 / 0.11))",
        "linear-gradient(rgba(255 255 255 / 0.12), rgba(255 255 255 / 0.12))",
        "linear-gradient(rgba(255 255 255 / 0.12), rgba(255 255 255 / 0.12))",
        "linear-gradient(rgba(255 255 255 / 0.13), rgba(255 255 255 / 0.13))",
        "linear-gradient(rgba(255 255 255 / 0.13), rgba(255 255 255 / 0.13))",
        "linear-gradient(rgba(255 255 255 / 0.14), rgba(255 255 255 / 0.14))",
        "linear-gradient(rgba(255 255 255 / 0.14), rgba(255 255 255 / 0.14))",
        "linear-gradient(rgba(255 255 255 / 0.14), rgba(255 255 255 / 0.14))",
        "linear-gradient(rgba(255 255 255 / 0.14), rgba(255 255 255 / 0.14))",
        "linear-gradient(rgba(255 255 255 / 0.15), rgba(255 255 255 / 0.15))",
        "linear-gradient(rgba(255 255 255 / 0.15), rgba(255 255 255 / 0.15))",
        "linear-gradient(rgba(255 255 255 / 0.15), rgba(255 255 255 / 0.15))",
        "linear-gradient(rgba(255 255 255 / 0.15), rgba(255 255 255 / 0.15))",
        "linear-gradient(rgba(255 255 255 / 0.16), rgba(255 255 255 / 0.16))",
        "linear-gradient(rgba(255 255 255 / 0.16), rgba(255 255 255 / 0.16))",
        "linear-gradient(rgba(255 255 255 / 0.16), rgba(255 255 255 / 0.16))",
        "linear-gradient(rgba(255 255 255 / 0.16), rgba(255 255 255 / 0.16))",
        "linear-gradient(rgba(255 255 255 / 0.16), rgba(255 255 255 / 0.16))",
      ],
      palette: {
        Avatar: {
          defaultBg: grey[800],
        },
        Skeleton: {
          bg: "rgb(50, 50, 50)",
        },
        TableCell: {
          border: "rgba(255,255,255, 0.05)",
        },
        accent: {
          // main: "rgb(136, 101, 160)",
          dark: blue[800],
          light: blue[400],
          main: blue[600],
        },
        background: {
          default: "rgb(30, 30, 30)",
          paper: "rgb(40, 40, 40)",
          paperTransparent: "rgba(60, 60, 60, 0.33)", // derived from default + paper
        },
        info: {
          main: blue[400],
        },
        primary: {
          main: "rgb(240,240,240)",
        },
        secondary: {
          main: "rgb(160, 160, 160)",
        },
        text: {
          secondary: "rgba(255, 255, 255, 0.55)",
        },
      },
    },
    light: {
      overlays: [
        undefined,
        // Toggle these for elevation 1 though 3
        // "linear-gradient(rgba(255 255 255 / 0.05), rgba(255 255 255 / 0.05))",
        // "linear-gradient(rgba(255 255 255 / 0.07), rgba(255 255 255 / 0.07))",
        // "linear-gradient(rgba(255 255 255 / 0.08), rgba(255 255 255 / 0.08))",
        undefined,
        undefined,
        undefined,
        "linear-gradient(rgba(255 255 255 / 1), rgba(255 255 255 / 1))",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      palette: {
        Skeleton: {
          bg: "rgb(225, 225, 230)",
        },
        TableCell: {
          border: "rgba(0,0,0, 0.05)",
        },
        accent: {
          // main: "rgb(136, 101, 160)",
          dark: blue[800],
          light: blue[400],
          main: blue[600],
        },
        background: {
          default: bgColor,
          paper: "rgb(249 249 250)", // derived from default + paper
          paperTransparent: "rgba(255, 255, 255, 0.55)",
        },
        // divider: "rgba(0,0,0,0.15)",
        info: {
          main: blue[600],
        },
        primary: {
          main: "rgb(80, 80, 80)",
        },
        secondary: {
          main: "rgb(120, 120, 120)",
        },
        text: {
          secondary: "rgba(0, 0, 0, 0.6)",
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
    MuiBackdrop: {
      styleOverrides: {
        root: {
          "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
            "&:not(.MuiBackdrop-invisible)": {
              backdropFilter: "blur(1px)",
              // backgroundColor: "transparent",
              // backgroundColor: "var(--mui-palette-background-default)",
            },
          },
          // "html[data-mui-color-scheme='light'] &": {
          //   background: "rgba(255, 255, 255, 0.33)",
          // },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // outlined: {
        //   borderColor: "var(--mui-palette-divider) !important",
        // },
        // textSecondary: {
        //   "&:hover": {
        //     color: "var(--mui-palette-primary-main)",
        //   },
        // },
        root: {
          "&.MuiButton-textSecondary:hover, &.MuiButton-outlinedSecondary:hover": {
            color: "var(--mui-palette-primary-main)",
          },
          borderRadius: "32px",
          boxShadow: "unset !important",
          textTransform: "none",
          transition: "none !important",
        },
        sizeSmall: {
          lineHeight: 1.2,
          minWidth: "unset",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
      styleOverrides: {
        root: {
          "&:active:not(.MuiMenuItem-root):not(.MuiListItemButton-root)": {
            transform: "translateY(1px)",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "& svg": {
            height: 16,
            width: 16,
          },
          padding: "6px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
        sizeMedium: {
          fontSize: "0.875rem",
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        PaperProps: {
          elevation: 4,
          transparent: "on",
        },
        fullScreen: true,
      },
      styleOverrides: {
        container: {
          transition: "none !important",
        },
        paper: {
          "&.MuiDialog-paperFullScreen": {
            border: 0,
            margin: 0,
            maxWidth: "100%",
            width: "100%",
          },
          "&:not(.MuiDialog-paperFullScreen)": {
            marginBottom: 100,
          },
        },
      },
    },
    MuiDrawer: {
      defaultProps: {
        PaperProps: {
          elevation: 4,
          transparent: "on",
        },
        anchor: "right",
      },
      styleOverrides: {
        paperAnchorBottom: {
          borderBottom: "none",
          borderLeft: "none",
          borderRight: "none",
        },
        paperAnchorLeft: {
          borderBottom: "none",
          // borderBottomRightRadius: 16,
          borderLeft: "none",
          borderTop: "none",
          // borderTopRightRadius: 16,
          left: 0,
        },
        paperAnchorRight: {
          borderBottom: "none",
          // borderBottomLeftRadius: 16,
          borderRight: "none",
          borderTop: "none",
          // borderTopLeftRadius: 16
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.MuiIconButton-colorSecondary:hover": {
            color: "var(--mui-palette-primary-main)",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        bar: {
          borderRadius: 2,
        },
        root: {
          borderRadius: 2,
        },
      },
    },
    MuiList: {
      defaultProps: {
        disablePadding: true,
      },
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          padding: "4px",
        },
      },
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: {
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          marginRight: "16px",
          minWidth: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover, &.Mui-selected": {
            background: "var(--mui-palette-action-hover)",
            color: "var(--mui-palette-text-primary)",
          },
          borderRadius: "4px",
          color: "var(--mui-palette-text-secondary)",
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        PaperProps: {
          elevation: 1,
        },
      },
      styleOverrides: {
        root: {
          maxHeight: "50vh",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover, &.Mui-selected": {
            background: "var(--mui-palette-action-hover)",
            color: "var(--mui-palette-text-primary)",
          },
          borderRadius: "4px",
          color: "var(--mui-palette-text-secondary)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px !important",
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        transparent: "on",
      },
      styleOverrides: {
        elevation1: {
          "html[data-mui-color-scheme='dark'] &": {
            boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 3px 0px rgba(0,0,0,0.12)",
          },
          "html[data-mui-color-scheme='light'] &": {
            boxShadow: "0px 2px 0px -1px rgba(0,0,0,0.2)",
          },
        },
        elevation4: {
          "html[data-mui-color-scheme='light'] &": {
            boxShadow: "0px 2px 0px -1px rgba(0,0,0,0.2)",
          },
        },
        root: {
          border: "1px solid var(--mui-palette-divider)",
        },
      },
      variants: [
        {
          props: { transparent: "on" },
          style: {
            "&:not(.MuiPaper-elevation0)": {
              backgroundColor: "var(--mui-palette-background-paperTransparent)",
            },
            "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
              backdropFilter: "blur(12px)",
            },
          },
        },
      ],
    },
    MuiPopover: {
      defaultProps: {
        TransitionComponent: Fade,
        slotProps: {
          paper: {
            elevation: 1,
            transparent: "on",
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreRounded,
        MenuProps: {
          PaperProps: {
            elevation: 1,
            transparent: "on",
          },
          sx: {
            marginTop: 0.5,
          },
        },
      },
      styleOverrides: {
        root: {
          "& .MuiSvgIcon-root": {
            fontSize: "1.25rem",
          },
          "&.MuiInputBase-colorSecondary fieldset": {
            borderColor: "rgba(var(--mui-palette-secondary-mainChannel) / 0.5)",
          },
          "&.MuiInputBase-colorSecondary:active fieldset": {
            background:
              "rgba(var(--mui-palette-secondary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
            borderColor: "var(--mui-palette-secondary-main)",
          },
          "&.MuiInputBase-colorSecondary:hover fieldset": {
            background:
              "rgba(var(--mui-palette-secondary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
            borderColor: "var(--mui-palette-secondary-main)",
          },
          "&.MuiInputBase-colorSecondary:not(:hover) *": {
            color: "var(--mui-palette-secondary-main)",
          },
          "&:active:not(.MuiMenuItem-root):not(.MuiListItemButton-root)": {
            transform: "translateY(1px)",
          },
          borderRadius: "50px",
          fontSize: "0.875rem",
        },
        select: {
          paddingBottom: 4,
          paddingTop: 4,
        },
      },
    },
    MuiSkeleton: {
      defaultProps: {
        animation: "wave",
      },
    },
    MuiSwipeableDrawer: {
      defaultProps: {
        elevation: 4,
      },
    },
    MuiSwitch: {
      defaultProps: {
        focusVisibleClassName: ".Mui-focusVisible",
      },
      styleOverrides: {
        // TODO this needs work
        root: ({ theme }) => ({
          "& .MuiSwitch-switchBase": {
            "&.Mui-checked": {
              "& + .MuiSwitch-track": {
                // backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
                border: 0,
                opacity: 1,
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
              },
              color: "#fff",
              transform: "translateX(16px)",
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              color:
                theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
              border: "6px solid #fff",
              color: theme.palette.accent.main,
            },
            margin: 2,
            padding: 0,
            transitionDuration: "300ms",
          },
          "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            height: 22,
            width: 22,
          },
          "& .MuiSwitch-track": {
            background: "var(--mui-palette-background-default)",
            borderRadius: 26 / 2,
            opacity: 1,
            transition: theme.transitions.create(["background-color"]),
          },
          height: 26,
          padding: 0,
          width: 42,
        }),
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          // https://stackoverflow.com/questions/33318207/max-width-not-working-for-table-cell
          tableLayout: "fixed",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          padding: "4px 16px 6px 16px",
        },
        root: {
          "tbody tr:last-of-type &": {
            borderBottom: "none",
          },
        },
        stickyHeader: {
          "&:first-of-type": {
            borderTopLeftRadius: "var(--priv-border-radius)",
          },
          "&:last-of-type": {
            borderTopRightRadius: "var(--priv-border-radius)",
          },
          background: "var(--mui-palette-background-paper)",
        },
      },
      variants: [
        {
          props: { variant: "clickable" },
          style: {
            "& > *": {
              display: "block",
              padding: "6px 16px",
            },
            "&:hover": {
              outline: "1px dashed rgba(var(--mui-palette-secondary-mainChannel) / 0.5)",
              outlineOffset: -1,
            },
            "html[data-mui-color-scheme='dark'] &:hover": {
              outline: "1px dashed rgba(var(--mui-palette-primary-mainChannel) / 0.33)",
            },
            padding: 0,
          },
        },
      ],
    },
    MuiTablePagination: {
      styleOverrides: {
        displayedRows: {
          margin: 0,
        },
        root: {
          overflow: "unset",
        },
        toolbar: {
          minHeight: "38px !important",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        head: {
          borderTopLeftRadius: "var(--priv-border-radius)",
          borderTopRightRadius: "var(--priv-border-radius)",
        },
        root: {
          "&.MuiTableRow-hover:hover": {
            background: "rgba(var(--mui-palette-secondary-mainChannel) / 0.075) !important",
          },
          "html[data-mui-color-scheme='dark'] &.MuiTableRow-hover:hover": {
            background: "rgba(var(--mui-palette-primary-mainChannel) / 0.05) !important",
          },
        },
      },
    },
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
        TransitionProps: { timeout: 0 },
        arrow: true,
        disableInteractive: true,
        enterDelay: 100,
        followCursor: true,
      },
      styleOverrides: {
        arrow: {
          color: "var(--mui-palette-grey-900)",
          "html[data-mui-color-scheme='dark'] &": {
            color: "var(--mui-palette-grey-200)",
          },
        },
        tooltip: {
          "& .secondary": {
            color: "var(--mui-palette-grey-400)",
          },
          background: "var(--mui-palette-grey-900)",
          border: "1px solid var(--mui-palette-background-default)",
          borderRadius: 0,
          fontSize: "0.8rem",
          fontWeight: 400,
          "html[data-mui-color-scheme='dark'] &": {
            background: "var(--mui-palette-grey-200)",
            color: "var(--mui-palette-common-black)",
          },
          "html[data-mui-color-scheme='dark'] & .secondary": {
            color: "var(--mui-palette-grey-600)",
          },
          maxWidth: 360,
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
  // shadows: [
  //   "none",
  //   "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
  //   "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
  //   "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
  //   "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
  //   "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
  //   "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
  //   "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
  //   "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
  //   "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
  //   "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
  //   "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
  //   "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
  //   "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
  //   "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
  //   "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
  //   "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
  //   "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
  //   "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
  //   "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
  //   "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
  //   "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
  //   "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
  //   "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
  //   "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
  // ],
  shape: {
    borderRadius: 8, // Change in index.css too
  },
  typography: {
    caption: {
      letterSpacing: "0.05rem",
    },
    fontFamily: MainFont,
  },
}
