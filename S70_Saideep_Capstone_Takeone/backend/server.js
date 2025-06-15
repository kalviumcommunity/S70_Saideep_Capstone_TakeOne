// server.js
require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const { Server } = require("socket.io");
const axios = require("axios");
const passport = require("passport");
const { graphqlHTTP } = require("express-graphql");

const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const rateLimit = require("./middleware/rateLimiter");
const startCleanupJob = require("./cron/cleanupJob");
const schema = require("./graphql/schema");
const root = require("./graphql/resolvers");

require("./passport"); // passport config

const app = express();
const server = http.createServer(app);

// 💡 Setup WebSocket server
const io = new Server(server, {
  cors: {
    origin: "*", // ✅ Allow frontend connections
    methods: ["GET", "POST"],
  },
});

// 🔌 WebSocket real-time logic
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Listen for user messages from the chatbot frontend
  socket.on("userMessage", async (prompt) => {
    console.log("💬 Prompt received from user:", prompt);

    try {
      // Call internal AI route to get LLM response
      const res = await axios.get("http://localhost:5000/api/ai/reply", {
        params: { prompt },
      });

      const reply = res.data.response;
      console.log("🤖 AI Response:", reply);

      // Send reply back to frontend in real time
      socket.emit("botReply", reply);
    } catch (err) {
      console.error("❌ Error calling LLM:", err.message);
      socket.emit("botReply", "⚠️ Sorry, something went wrong.");
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// 🧼 Start cleanup cron job (optional)
startCleanupJob();

// 📦 Middleware
app.use(cors());
app.use(express.json());

// 🔐 Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// 🧠 Passport setup
app.use(passport.initialize());
app.use(passport.session());

// 🚀 Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB Connected"))
  .catch((err) => console.error("🔴 MongoDB Connection Error:", err));

// 🧠 GraphQL API
app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

// 🛡️ API Routes
app.use("/api/ai", aiRoutes);             // AI reply route
app.use("/api/auth", rateLimit);          // Rate limiting for auth
app.use("/api/auth", authRoutes);         // Register, login, Google OAuth
app.use("/api/users", userRoutes);        // User profile routes
app.use("/uploads", express.static("uploads")); // Static uploads

// 📺 Sample frontend view (optional)
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const movies = [
    { title: "Inception", director: "Christopher Nolan" },
    { title: "Interstellar", director: "Christopher Nolan" },
    { title: "The Social Network", director: "David Fincher" }
  ];
  res.render("index", { movies });
});

// 🚀 Start server with both HTTP and WebSocket
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});