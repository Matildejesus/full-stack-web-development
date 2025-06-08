import { createClient } from "graphql-ws";

const wsClient = createClient({
  url: "ws://localhost:4001/graphql",
});

export default wsClient;
