const express = require("express");
const app = express();
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/generate",async (req, res) => {
  const { prompt } = req.body;

  try {
      const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest", 
    });

    const result = await model.generateContent(
      `You are an expert senior frontend developer and designer.  
Your job: generate **fully functional, production-ready** code for a website or web app described as: "${prompt}".

Must include:
- Complete HTML document: <!DOCTYPE html>, <html>, <head>, <body>
- Modern CSS: mobile-first, responsive layout, colorful design, gradients, shadows, transitions
- Fully working JavaScript: add real functionality, proper event listeners, input validation
- All code must work immediately when opened in the browser (no missing logic, no placeholders)

UI / Visual design:
- Use bright, modern, professional color palette (vibrant accent colors, gradients)
- Add smooth animations and hover effects
- Use consistent spacing, clean typography, and good contrast
- Add shadows and rounded corners for depth
- Make UI feel polished, interactive, and real
- Use flexbox or grid for layout
- Include a clear header, main content, and footer

HTML structure:
- Must start with <!DOCTYPE html> and include meta viewport
- Use semantic elements: header, nav, main, section, footer
- Add aria-labels and alt text for accessibility
- Include all required elements for requested functionality (buttons, inputs, forms, etc.)

CSS details:
- CSS reset or normalize
- CSS variables for colors
- Gradients, shadows, modern fonts
- Smooth transitions & subtle animations
- Responsive layout (mobile, tablet, desktop)
- Proper use of flexbox/grid for sections
- Make the app look beautiful and high quality

⚡ JavaScript functionality:
- Use modern ES6+ syntax (const, let, arrow functions, template literals)
- Proper DOM selection and event listeners (no inline handlers)
- Input validation and graceful error handling
- Use localStorage for persistence if needed (e.g., todo list)
- Fully implement core functionality (e.g., add, delete, calculate, fetch)
- No dummy functions, no "TODO" placeholders

Best practices:
- Code must be clean, indented, readable
- Must actually work when copied to files
- Avoid inline CSS; put styling into separate CSS section
- No external libraries or frameworks

OUTPUT FORMAT:
Return ONLY a single JSON object, exactly like this (no extra text, markdown, or comments):
{"html":"...complete HTML...","css":"...complete CSS...","js":"...complete JavaScript..."}

NEVER include:
- Explanations, markdown, comments, or code fences
- Partial or dummy code
- External dependencies or links

Your goal: generate a **beautiful, fully functional, production-level web app** that really works and looks amazing.  
Generate now.`
    );

    const text = await result.response.text();

    // console.log("AI response text:", text);

    const cleanText = text.replace(/```json|```/g, "").trim();

    try {
      const json = JSON.parse(cleanText);
      // console.log("Parsed JSON:", json);
      res.json(json);
    } catch (err) {
      console.error("Failed to parse JSON from AI response text:", cleanText);
      res.status(500).send("Failed to parse JSON from AI response");
    }
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).send("Failed to generate code");
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});
