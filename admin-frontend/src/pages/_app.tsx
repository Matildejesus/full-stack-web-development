import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../services/apollo-client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <main className="container mx-auto p-4">
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}
