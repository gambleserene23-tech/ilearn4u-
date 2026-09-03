/**
 * THEME / BRAND COLOURS — documentation reference
 * =============================================================================
 * The ACTUAL colour values used by the app live as CSS variables in
 * `src/app/globals.css` inside the `:root` and `@theme inline` blocks, because
 * Tailwind v4 reads its theme from CSS. This file mirrors those same values
 * so a developer can see the full palette in one place without hunting
 * through CSS.
 *
 * To change the brand palette: edit the hex values in `globals.css`
 * (`:root { --brand-* }`) — every component uses the Tailwind classes below
 * (e.g. `bg-brand-green`, `text-brand-orange`) so a single edit updates the
 * whole site.
 * =============================================================================
 */

export const themeConfig = {
  colors: {
    brandGreen: "#0F3D2E", // primary brand colour — nav, headings, primary buttons
    brandGreenDark: "#0A2B20", // hover/active state for green
    brandWhite: "#FFFFFF", // primary background
    brandTan: "#F1E6D8", // secondary background / accent
    brandTanDark: "#E4D3BC", // borders / hover on tan
    brandOrange: "#E8792C", // CTA / accent colour
    brandOrangeDark: "#CC661F", // hover state for orange
    ink: "#1F2A24", // body text
    inkSoft: "#5B6862", // secondary/muted text
  },
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1.25rem",
  },
} as const;
