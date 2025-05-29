// graphql/schema.js
const typeDefs = `
  type Query {
    hello: String
    getUser(id: ID!): User
  }

  type Mutation {
    addUser(name: String!, email: String!): User
  }

  type Subscription {
    userAdded: User
  }

  type User {
    id: ID!
    name: String
    email: String
  }
`;

module.exports = typeDefs;