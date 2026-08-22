import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import router from './components/routes';
import theme from './theme';
import { LangProvider } from './i18n/lang';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <LangProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </LangProvider>
  </ChakraProvider>
);
