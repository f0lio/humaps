import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";

import "@styles/globals.css";
import "@styles/styles.css";
import { SearchProvider } from "@contexts/index";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </NextUIProvider>
  );
}

export default MyApp;
