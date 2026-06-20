export interface ThemeConfig {
  colors: {
    primary: string;       // main brand color
    secondary: string;     // auxiliary brand color
    accent: string;        // highlight color
    backgroundLight: string;
    backgroundDark: string;
  };
  fonts: {
    heading: string;       // font family for headers
    body: string;          // font family for body text
  };
  styles: {
    button: "rounded" | "square" | "pill";
    card: "glass" | "flat" | "bordered";
  };
}

export const themePresets = {
  luxo: {
    colors: {
      primary: "#c5a880",       // Luxe Gold
      secondary: "#110e0c",     // Dark Black
      accent: "#e8d9c7",        // Cream Nude
      backgroundLight: "#fafafa",
      backgroundDark: "#110e0c",
    },
    fonts: {
      heading: "var(--font-serif)",
      body: "var(--font-sans)",
    },
    styles: {
      button: "pill" as const,
      card: "glass" as const,
    },
  },
  rose: {
    colors: {
      primary: "#e5b0a3",       // Rose Gold
      secondary: "#6e5a56",     // Soft Brownish Rose
      accent: "#fcf8f2",        // Pale Beige
      backgroundLight: "#ffffff",
      backgroundDark: "#1a1615",
    },
    fonts: {
      heading: "var(--font-sans)",
      body: "var(--font-sans)",
    },
    styles: {
      button: "rounded" as const,
      card: "glass" as const,
    },
  },
  modern: {
    colors: {
      primary: "#0f4c81",       // Professional Blue
      secondary: "#ffffff",     // White
      accent: "#f3f4f6",        // Light Gray
      backgroundLight: "#ffffff",
      backgroundDark: "#0b0f19",
    },
    fonts: {
      heading: "var(--font-sans)",
      body: "var(--font-sans)",
    },
    styles: {
      button: "rounded" as const,
      card: "bordered" as const,
    },
  },
};

export const themeConfig: ThemeConfig = themePresets.luxo;
