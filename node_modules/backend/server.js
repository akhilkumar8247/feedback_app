import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const CSV_FILE = "feedbacks.csv";

// Initialize CSV file with headers if not exists
if (!fs.existsSync(CSV_FILE)) {
  fs.writeFileSync(CSV_FILE, "Name,Email,Rating,Comments,Source\n", "utf8");
}

// POST route (normal feedback submission)
app.post("/feedback", (req, res) => {
  console.log("Received body:", req.body);

  const { name, email, rating, comments, source } = req.body;

  if (!name || !email || !rating || !comments || !source) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const safeComments = comments.replace(/"/g, '""');
  const entry = `"${name}","${email}","${rating}","${safeComments}","${source}"\n`;

  fs.appendFileSync(CSV_FILE, entry, "utf8");

  res.json({ success: true, message: "Feedback saved!" });
});

// 👉 NEW TEST ROUTE (for browser)
app.get("/test-feedback", (req, res) => {
  const entry = `"Test User","test@mail.com","5","This is a test feedback"\n`;
  fs.appendFileSync(CSV_FILE, entry, "utf8");

  res.send("✅ Test feedback saved to feedbacks.csv");
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
