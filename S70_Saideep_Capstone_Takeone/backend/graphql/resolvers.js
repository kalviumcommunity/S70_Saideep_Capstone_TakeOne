// Mock users data
const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
  { id: "3", name: "Charlie", email: "charlie@example.com" }
];

let nextId = 4; // To simulate unique ID for new users

const root = {
  hello: () => "GraphQL API working ✅",

  getUser: ({ id }) => {
    return users.find(user => user.id === id);
  },

  addUser: ({ name, email }) => {
    const newUser = {
      id: String(nextId++),
      name,
      email
    };
    users.push(newUser);
    return newUser;
  }
};

module.exports = root;