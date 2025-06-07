import { createClient } from "graphql-ws";

const wsClient = createClient({
  url: "ws://localhost:4000/graphql",
});
