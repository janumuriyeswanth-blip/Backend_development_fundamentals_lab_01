const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// Student Details
const STUDENT_INFO = {
    name: "Janumuri Yeswanth",
    registrationNumber: "252U1R9145",
    section: "CSE-GEN-AI 2C 112"
};

// 1. GET / - Home Route
app.get("/", (request, response) => {
    response.status(200).send("Welcome to my Node.js and Express Server!");
});

// 2. GET /about - About Route
app.get("/about", (request, response) => {
    response.status(200).send("Welcome to the About Page!");
});

// 3. GET /student - Student Details Route
app.get("/student", (request, response) => {
    response.status(200).send(`Student Name: ${STUDENT_INFO.name}`);
});

// 4. GET /contact - Contact Route
app.get("/contact", (request, response) => {
    response.status(200).send("Welcome to the Contact Page!");
});

// 5. GET /time - Current Date and Time Route
app.get("/time", (request, response) => {
    response.status(200).json({
        currentDateTime: new Date()
    });
});

// 6. Wildcard Route - Handle unknown routes (404)
app.use((request, response) => {
    response.status(404).send("404 - Page Not Found");
});

// Start server only when run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Express server running at http://localhost:${PORT}`);
    });
}

module.exports = app;
