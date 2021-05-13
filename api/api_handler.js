const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

// const GraphQLDate = require('./graphql_date.js');
const about = require('./about.js');
const item = require('./item.js');

const resolvers = {
  Query: {
    about: about.getMessage,
    itemList: item.list,
    item: item.get,
  },
  Mutation: {
    setAboutMessage: about.setMessage,
    itemAdd: item.add,
    itemUpdate: item.update,
    itemDelete: item.delete,
  },
  // GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installHandler };
