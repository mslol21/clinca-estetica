export interface ThemeConfig {
  colors: {
    primary: string;       // main brand color (e.g. soft gold)
    secondary: string;     // auxiliary brand color (e.g. dark gold/bronze)
    accent: string;        // highlight color (e.g. champagne shimmer)
    backgroundLight: string;
    backgroundDark: string;
  };
  fonts: {
    heading: string;       // font family for headers (e.g. Cormorant Garamond, Georgia, Playfair Display)
    body: string;          // font family for body text (e.g. Montserrat, Inter, Roboto)
  };
  styles: {
    button: "rounded" | "square" | "pill";
    card: "glass" | "flat" | "bordered";
  };
}

export const themeConfig: ThemeConfig = {
  colors: {
    primary: "#c5a880",       // Luxe Gold
    secondary: "#b0926a",     // Darker Gold
    accent: "#e8d9c7",        // Cream Nude
    backgroundLight: "#fafafa",
    backgroundDark: "#110e0c",
  },
  fonts: {
    heading: "var(--font-serif)", // Map to loaded Google Serif Font
    body: "var(--font-sans)",     // Map to loaded Google Sans Font
  },
  styles: {
    button: "pill",
    card: "glass",
  },
};
