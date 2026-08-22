import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { Button, Card, Input } from './components';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

/**
 * Brand palette inspired by Colombian native ecosystems:
 * deep forest greens, sage tones and a warm sand accent for surfaces.
 */
const colors = {
  brand: {
    50: '#f2f5ef',
    100: '#dde4d4',
    200: '#c3cfb4',
    300: '#a7b892',
    400: '#8b9d73',
    500: '#6d7862', // primary
    600: '#576250',
    700: '#47533d',
    800: '#363c31',
    900: '#1e2017',
  },
  sand: '#feeee4',
  // Niveles de riesgo — derivados de la paleta verde-tierra (croma bajo, sin rojos de alerta).
  risk: {
    high: '#a33c2f', // riskLevel === 2
    medium: '#c8802e', // riskLevel === 1
    low: '#6d7862', // riskLevel === 0 (== brand.500)
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: `'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        bg: 'brand.50',
        color: 'brand.900',
        scrollBehavior: 'smooth',
      },
      '#root': {
        minHeight: '100vh',
      },
    },
  },
  components: {
    Button,
    Card,
    Input,
  },
});

export default theme;
