// we can use import when we defined type: "module" on package.json
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// defined a schema, that is what client can call
// add comment by #
// "#graphql" is a optional for extendsion can aware that is graphql code
const typeDefs = `#graphql
    # schema {
    #   query: Query
    # }

    type Query {
        greeting: String
    }
`;

// resolvers is how to return the values. it is implementation the schema
const resolvers = {
  Query: {
    greeting: () => {
      return "Hello World";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  // share the context for all resolvers
  context: ({ req }) => {
    return { token: req.headers.token };
  },
  listen: { port: 9000 }, // can open to test by http://localhost:9000/
});

console.log(`Server running at ${url}`);

// The way client call to server
// the example request is:
// query { // the query here is point to "type Query" in the typeDefs. It should be q not Q, but by default, on typeDefs has the underground defination
//   greeting
// }
//
// then apollo server call to resolvers to return the data. the type Query in the typeDefs is mapping with Query in the resolver. They must be the same

// Through HTTP: default function is POST instead of GET like Restful
// Client send the request with json data and
// the serber is response with json data back
