import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router-dom';
import theme from './theme';
import { LangProvider } from './i18n/lang';

/**
 * Renders a component wrapped in the providers the app relies on
 * (Chakra UI theme + React Router context) so components using hooks
 * like useNavigate/useSearchParams can be tested in isolation.
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <ChakraProvider theme={theme}>
        <LangProvider>
          <MemoryRouter>{children}</MemoryRouter>
        </LangProvider>
      </ChakraProvider>
    ),
    ...options,
  });
}

export * from '@testing-library/react';
