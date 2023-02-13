import { NextUIProvider, createTheme } from '@nextui-org/react';
import { Theme } from '@nextui-org/react/types/theme';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

const light = createTheme({
  type: 'light',
  className: 'light-theme',
  theme: {},
} as Theme);

const dark = createTheme({
  type: 'dark',
  className: 'dark-theme',
} as Theme);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: light.className,
        dark: dark.className,
      }}
    >
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </ThemeProvider>
  );
}
