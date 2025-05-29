const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();
const USERS = [];
let idCounter = 1;

const resolvers = {
  Query: {
    hello: () => "Hello from GraphQL!",
    getUser: (_, { id }) => USERS.find(user => user.id === id)
  },
  Mutation: {
    addUser: (_, { name, email }) => {
      const newUser = { id: String(idCounter++), name, email };
      USERS.push(newUser);
      pubsub.publish("USER_ADDED", { userAdded: newUser });
      return newUser;
    }
  },
  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator(["USER_ADDED"])
    }
  }
};

module.exports = resolvers;