import { ApolloServer } from '@apollo/server';
import resolvers from './resolver.js';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Schema
const typeDefs = gql(
    readFileSync(resolve(__dirname, '..', 'schema.graphql'), {
        encoding: 'utf-8',
    }),
);

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
