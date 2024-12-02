import express from 'express';
var { ruruHTML } = require("ruru/server");
import { createHandler } from 'graphql-http/lib/use/http';

import { makeExecutableSchema } from '@graphql-tools/schema';
import 'graphql-import-node';

import typeDefs from './schema/schema.graphql';
import { resolvers } from './resolvers/story.resolver';

const app = express();
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

app.get("/", (_req, res) => {
    res.type("html");
    res.end(ruruHTML({ endpoint: "/graphql" }));
});
const graphqlHandler = createHandler({ schema });
app.use('/graphql',graphqlHandler);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running at http://localhost:3000/graphql');
});