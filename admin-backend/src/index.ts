import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { expressMiddleware } from "@apollo/server/express4";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const app = express();
const PORT = process.env.PORT || 4001;
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});

async function startServer() {
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });

    const serverCleanup = useServer({ schema }, wsServer);
    
    const apolloServer = new ApolloServer({
        schema, 
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    }
                }
            }
        ]
    });

    await apolloServer.start();


    app.use("/graphql", expressMiddleware(apolloServer));

    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    httpServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
        console.log(`Subscription ready at ws://localhost:${PORT}/graphql`)
    });
}

startServer().catch((error) =>
    console.log("Error during server initialization:", error)
);
