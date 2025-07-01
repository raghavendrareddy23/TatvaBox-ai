const axios = require("axios");
const Tatva = require("../models/tatvaModel");

exports.askTatva = async (req, res) => {
  const { tatvaId, question } = req.body;

  if (!tatvaId || !question) {
    return res
      .status(400)
      .json({ message: "tatvaId and question are required." });
  }

  try {
    const tatva = await Tatva.findById(tatvaId);
    if (!tatva) {
      return res.status(404).json({ message: "Tatva not found." });
    }

    const prompt = `
- Title: ${tatva.title}
- Meaning: ${tatva.description}
The user now asks: "${question}"

`;

    const groqResponse = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = groqResponse.data.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error("Groq AI Error:", err.response?.data || err.message);
    res
      .status(500)
      .json({ message: "Failed to generate AI response", error: err.message });
  }
};
