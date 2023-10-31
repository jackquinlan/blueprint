import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}"],
    // custom tailwind colors and other theme variables
    theme: {
        container: {
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
            center: true,
        },
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                sidebar: "hsl(var(--sidebar))",

                primary: "hsl(var(--primary))",
                "primary-foreground": "hsl(var(--primary-foreground))",

                secondary: "hsl(var(--secondary))",
                "secondary-foreground": "hsl(var(--secondary-foreground)",

                accent: "hsl(var(--accent))",
                "accent-foreground": "hsl(var(--accent-foreground)",

                muted: "hsl(var(--muted))",
                "muted-foreground": "hsl(var(--muted-foreground)",

                card: "hsl(var(--card))",
                "card-foreground": "hsl(var(--card-foreground)",

                popover: "hsl(var(--popover))",
                "popover-foreground": "hsl(var(--popover-foreground)",

                warning: "hsl(var(--warning))",
                "warning-foreground": "hsl(var(--warning-foreground)",

                destructive: "hsl(var(--destructive))",
                "destructive-foreground": "hsl(var(--destructive-foreground)",

                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
            },
            borderRadius: {
                lg: `var(--radius)`,
                md: `calc(var(--radius) - 2px)`,
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)"],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
