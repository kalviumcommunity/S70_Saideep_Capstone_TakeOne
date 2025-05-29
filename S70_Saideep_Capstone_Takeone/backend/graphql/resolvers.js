// Mock users data
const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
  { id: "3", name: "Charlie", email: "charlie@example.com" }
];

const root = {
  hello: () => "GraphQL API working ✅",

  getUser: ({ id }) => {
    return users.find(user => user.id === id);
  }
};

module.exports = root;