import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { MongoClient } from 'mongodb';
const client = new MongoClient("mongodb://root:example@localhost:27017/");
try {
    await client.connect();
}
catch (err) {
    console.log(err);
    throw err;
}
const students = client.db("students");
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        students: () => books,
    },
    Mutation: {
        studentCreate: async (input) => {
            const now = new Date();
            await students.collection('students').insertOne({
                name: input.name,
                isActive: true,
                availableHours: input.availableHours,
                createdAt: now,
                updatedAt: now,
            });
        },
        studentUpdate: async (input) => {
            const now = new Date();
            await students.collection('students').updateOne({
                name: input.name,
            }, {
                isActive: input.isActive,
                addedHours: input.addedHours,
            });
        },
        teacherCreate: async (input) => {
            const now = new Date();
            await students.collection('students').insertOne({
                name: input.name,
                isActive: true,
                hourlyPay: input.hourlyPay,
                deferredPay: input.deferredPay,
                createdAt: now,
                updatedAt: now,
            });
        },
        teacherUpdate: async (input) => {
            const now = new Date();
            await students.collection('students').updateOne({
                name: input.name,
            }, {
                isActive: input.isActive,
                hourlyPay: input.hourlyPay,
                deferredPay: input.deferredPay,
            });
        },
    }
};
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
