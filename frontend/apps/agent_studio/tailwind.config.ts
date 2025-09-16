import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter, -apple-system, BlinkMacSystemFont, PingFang SC, Hiragino Sans GB, noto sans, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif',
      },
      colors: {
        background: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          scrim: 'var(--bg-scrim)',
          elevated: {
            primary: 'var(--bg-elevated-primary)',
            secondary: 'var(--bg-elevated-secondary)',
          },
          status: {
            warning: 'var(--bg-status-warning)',
            error: 'var(--bg-status-error)',
          },
        },

        foreground: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          inverted: {
            DEFAULT: 'var(--text-inverted)',
            static: 'var(--text-inverted-static)',
          },
          accent: 'var(--text-accent)',
          status: {
            warning: 'var(--text-status-warning)',
            error: 'var(--text-status-error)',
          },
        },
      },

      borderColor: {
        default: 'var(--border-default)',
        heavy: 'var(--border-heavy)',
        light: 'var(--border-light)',
        status: {
          warning: 'var(--border-status-warning)',
          error: 'var(--border-status-error)',
        },
        select: 'var(--border-select)',
      },
    },
  },
};

export default config;
