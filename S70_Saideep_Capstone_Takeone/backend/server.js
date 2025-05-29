require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const aiRoutes = require('./routes/aiRoutes');
const rateLimit = require('./middleware/rateLimiter');
const startCleanupJob = require('./cron/cleanupJob');
const passport = require("passport");
const { graphqlHTTP } = require("express-graphql");
const schema = require('./graphql/schema');
const root = require('./graphql/resolvers');
require("./passport"); // 🧠 Passport config file

const authRoutes = require("./routes/auth"); // 🔐 Auth routes
const user = require("./routes/user"); // 👤 User profile routes

const app = express(); // ✅ Move this up before any app.use()

startCleanupJob();

// 🧠 Middleware
app.use(express.json());
app.use(cors());

// 🛡️ Session middleware (for storing login session data)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use("/graphql",graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

// 🚀 Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// 🌐 Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// 🚪 Route middlewares
app.use('/api/auth',rateLimit);
app.use('/api/ai',aiRoutes);
app.use("/api/auth", authRoutes);   // Register/Login + Google OAuth
app.use("/api/users", user);  // Profile, Update, Me APIs

app.set("view engine", "ejs");

const movies = [
  { title: "Inception", director: "Christopher Nolan" },
  { title: "Interstellar", director: "Christopher Nolan" },
  { title: "The Social Network", director: "David Fincher" }
];

app.get("/", (req, res) => {
  res.render("index", { movies });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));