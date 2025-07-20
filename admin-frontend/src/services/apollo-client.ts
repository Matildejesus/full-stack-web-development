import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://full-stack-web-development-k1qn.vercel.app/graphql",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
