import React, { useState } from 'react';
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import { SessionProvider } from 'next-auth/react';
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


import Header from "../components/Header";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <GlobalStyle />
          <Header />
          <Component {...pageProps} />
          <div id="root-modal" />
        </SessionProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>

  );
}

export default App;