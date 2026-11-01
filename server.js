const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Student details configuration (edit as needed)
const STUDENT_INFO = {
    name: process.env.STUDENT_NAME || "Yeswanth",
    registrationNumber: process.env.STUDENT_REG_NO || "252U1R9145",
    section: process.env.STUDENT_SECTION || "CSE-GEN-AI 2C"
};

// 1. GET / - Welcome Route
app.get("/", (request, response) => {
    response.status(200).send("Welcome to my Lab 1 server!");
});

// 2. GET /about - Student Info Route
app.get("/about", (request, response) => {
    response.status(200).json({
        name: STUDENT_INFO.name,
        section: STUDENT_INFO.section
    });
});

// 3. GET /time - Current Date and Time Route
app.get("/time", (request, response) => {
    response.status(200).json({
        currentDateTime: new Date()
    });
});

// 4. Wildcard Route - Handle unknown routes (404)
app.use((request, response) => {
    response.status(404).send("404 - Page Not Found");
});

// Start server only when run directly (enables clean testing/importing)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Express server running at http://localhost:${PORT}`);
    });
}

module.exports = app;
