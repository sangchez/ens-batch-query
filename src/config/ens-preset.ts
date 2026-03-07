// https://primevue.org/

import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

export default definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: "0",
      xs: "4px",
      sm: "6px",
      md: "8px",
      lg: "12px",
      xl: "16px",
    },
  },

  semantic: {
    primary: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
      950: "#2e1065",
    },

    colorScheme: {
      light: {
        surface: {
          0: "#ffffff",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
      },

      dark: {
        surface: {
          0: "#030712",
          50: "#030712",
          100: "#111827",
          200: "#1f2937",
          300: "#374151",
          400: "#4b5563",
          500: "#6b7280",
          600: "#9ca3af",
          700: "#d1d5db",
          800: "#e5e7eb",
          900: "#f3f4f6",
          950: "#f9fafb",
        },

        primary: {
          50: "#1a103f",
          100: "#2e1065",
          200: "#4c1d95",
          300: "#5b21b6",
          400: "#6d28d9",
          500: "#8b5cf6",
          600: "#a78bfa",
          700: "#c4b5fd",
          800: "#ddd6fe",
          900: "#ede9fe",
          950: "#f5f3ff",
        },
      },
    },
  },

  components: {},
});
