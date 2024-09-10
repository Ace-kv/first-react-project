/** @type {import('tailwindcss').Config} */

// for integrating inter
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // This covers all JavaScript/TypeScript files in src
    // './index.html', // Include any other paths where Tailwind classes are used
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        neutral: {
          black: '#263238',
          d_grey: '#4D4D4D',
          grey: '#717171',
          l_grey: '#89939E',
          grey_blue: '#A8BED1',
          silver: '#F5F7FA',
          white: '#FFFFFF',
        },
        primary: '#28CB8B',
        secondary: '#263238',
        info: '#2194F3',
        colorShade: {
          shade1: '#43A046',
          shade2: '#388E3B',
          shade3: '#237D31',
          shade4: '#1B5E1F',
          shade5: '#103E13',
        },
        colorTint: {
          tint1: '#66BB69',
          tint2: '#81C784',
          tint3: '#A5D6A7',
          tint4: '#C8E6C9',
          tint5: '#E6F5EE',
        },
        action: {
          warning: '#FBC02D',
          error: '#E53835',
          success: '#2E7D31',
        },
      },
      fontSize: {
        // Headlines
        'headline-1': ['64px', { lineHeight: '76px', fontWeight: 600 }],
        'headline-2': ['36px', { lineHeight: '44px', fontWeight: 600 }],
        'headline-3': ['28px', { lineHeight: '36px', fontWeight: 600 }],
        'headline-4': ['20px', { lineHeight: '28px', fontWeight: 600 }],
        // Body Regular
        'body-1-regular': ['18px', { lineHeight: '28px' }],
        'body-2-regular': ['16px', { lineHeight: '24px' }],
        'body-3-regular': ['14px', { lineHeight: '20px' }],
        'body-4-regular': ['12px', { lineHeight: '16px' }],
        // Body Medium
        'body-1-medium': ['18px', { lineHeight: '28px', fontWeight: 500 }],
        'body-2-medium': ['16px', { lineHeight: '24px', fontWeight: 500 }],
        'body-3-medium': ['14px', { lineHeight: '20px', fontWeight: 500 }],
        'body-4-medium': ['12px', { lineHeight: '16px', fontWeight: 500 }],
      },
      // fontWeight: {
      //   // Adjust the weights for specific needs
      //   'semi-bold': 600,
      //   regular: 400,
      //   medium: 500,
      // },
    },
  },
  plugins: [],
}

