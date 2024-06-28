import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
      borderRadius: {
        'tremor-small': 'calc(var(--radius) - 2px)',
        'tremor-default': 'var(--radius)',
        'tremor-full': 'var(--radius)',

        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontSize: {
        'tremor-label': ['0.75rem', { lineHeight: '1.25' }],
        'tremor-default': ['1rem', { lineHeight: '1.5' }],
        'tremor-title': ['1.25rem', { lineHeight: '1.375' }],
        'tremor-metric': ['1.5rem', { lineHeight: '1.25rem' }]
      },
      colors: {
        tremor: {
          brand: {
            faint: 'hsl(var(--foreground))',
            muted: 'hsl(var(--foreground))',
            subtle: 'hsl(var(--foreground))',
            DEFAULT: 'hsl(var(--foreground))',
            emphasis: 'hsl(var(--foreground))',
            inverted: 'hsl(var(--foreground))'
          },
          background: {
            muted: 'hsl(var(--background))',
            subtle: 'hsl(var(--background))',
            DEFAULT: 'hsl(var(--background))',
            emphasis: 'hsl(var(--background))'
          },
          border: {
            DEFAULT: 'hsl(var(--border))'
          },
          ring: {
            DEFAULT: 'hsl(var(--ring))'
          },
          content: {
            subtle: 'hsl(var(--muted-foreground))',
            DEFAULT: 'hsl(var(--muted-foreground))',
            emphasis: 'hsl(var(--foreground))',
            strong: 'hsl(var(--foreground))',
            inverted: 'hsl(var(--foreground))'
          }
        },
        'accent-100': {
          light: 'hsl(var(--accent-100))',
          DEFAULT: 'hsl(var(--accent-100))',
          dark: 'hsl(var(--accent-100))'
        },
        'accent-200': {
          light: 'hsl(var(--accent-200))',
          DEFAULT: 'hsl(var(--accent-200))',
          dark: 'hsl(var(--accent-200))'
        },

        brand: 'hsl(var(--brand))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          '100': 'hsl(var(--accent-100))',
          '200': 'hsl(var(--accent-200))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected']
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected']
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected']
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    },
    ...['accent-100', 'accent-200'].flatMap(customColor => [
      `bg-${customColor}`,
      `border-${customColor}`,
      `hover:bg-${customColor}`,
      `hover:border-${customColor}`,
      `hover:text-${customColor}`,
      `fill-${customColor}`,
      `ring-${customColor}`,
      `stroke-${customColor}`,
      `text-${customColor}`,
      `ui-selected:bg-${customColor}`,
      `ui-selected:border-${customColor}`,
      `ui-selected:text-${customColor}`
    ])
  ],
  plugins: [require('tailwindcss-animate'), require('@headlessui/tailwindcss')]
} satisfies Config;

export default config;
