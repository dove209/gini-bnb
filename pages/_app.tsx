import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import { SessionProvider } from 'next-auth/react';
import Header from "../components/Header";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </SessionProvider>
  );
}

export default App;