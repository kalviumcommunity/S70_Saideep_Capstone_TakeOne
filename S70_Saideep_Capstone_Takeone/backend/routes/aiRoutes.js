const express = require("express");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { HumanMessage } = require("langchain/schema");

require("dotenv").config();

const router = express.Router();

router.get("/reply", async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  const chat = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.7,
  });

  try {
    const response = await chat.call([new HumanMessage(prompt)]);
    res.json({ response: response.text });
  } catch (error) {
    res.status(500).json({ error: "LLM call failed" });
  }
});

module.exports = router;