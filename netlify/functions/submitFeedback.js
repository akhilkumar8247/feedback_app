const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "GET") {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Function is working!" }),
      };
    }

    if (event.httpMethod === "POST") {
  const data = JSON.parse(event.body);

  // Validate fields
  const requiredFields = ["name", "email", "rating", "feedback", "appName"];
  for (const field of requiredFields) {
    if (!data[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: `Missing field: ${field}` }),
      };
    }
  }

  // Ensure tmp folder exists
  const tmpDir = path.join(__dirname, "..", "..", "tmp");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  // Write CSV
  const filePath = path.join(tmpDir, "feedback.csv");
  const csvLine = `${data.name},${data.email},${data.rating},${data.feedback},${data.appName}\n`;
  fs.appendFileSync(filePath, csvLine, "utf8");

  console.log(`Saved feedback to ${filePath}`);

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, message: "Feedback saved!" }),
  };
}


    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
