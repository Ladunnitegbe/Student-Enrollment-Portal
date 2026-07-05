// Central theme tokens. This is the single source of truth for color and
// spacing values. It is consumed two ways in this app:
//
//  1. Directly, by Header.jsx's styled-components ThemeProvider
//     (theme.colors.primary etc. inside styled.* templates).
//  2. As CSS custom properties, applied once in index.css
//     (var(--color-primary) etc.) so plain CSS / CSS Modules / Tailwind
//     (via arbitrary values) can all read the same palette.

export const theme = {
  colors: {
    primary: "#6c63ff",
    secondary: "#8b84ff",
    danger: "#f87171",
    success: "#4ade80",
    warning: "#fb923c",
    background: "#0f1117",
    surface: "#1a1d27",
    surfaceAlt: "#232637",
    text: "#f0f0f5",
    textMuted: "#9095aa",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  radius: {
    sm: "8px",
    md: "12px",
  },
};

export default theme;
