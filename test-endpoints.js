const http = require("http");
const app = require("./server");

const TEST_PORT = 3001;

function makeRequest(path) {
    return new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${TEST_PORT}${path}`, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        });
        req.on("error", reject);
    });
}

async function runTests() {
    const server = app.listen(TEST_PORT, async () => {
        console.log(`Test server running on port ${TEST_PORT}\n--- Running Tests ---`);
        let passed = 0;
        let total = 6;

        try {
            // Test 1: GET /
            const res1 = await makeRequest("/");
            console.log(`[TEST 1] GET / -> Status: ${res1.statusCode}, Body: "${res1.body}"`);
            if (res1.statusCode === 200 && res1.body.includes("Welcome to my Node.js and Express Server!")) {
                console.log("  PASS: Correct status 200 and home message.\n");
                passed++;
            }

            // Test 2: GET /about
            const res2 = await makeRequest("/about");
            console.log(`[TEST 2] GET /about -> Status: ${res2.statusCode}, Body: "${res2.body}"`);
            if (res2.statusCode === 200 && res2.body.includes("Welcome to the About Page!")) {
                console.log("  PASS: Correct status 200 and about message.\n");
                passed++;
            }

            // Test 3: GET /student
            const res3 = await makeRequest("/student");
            console.log(`[TEST 3] GET /student -> Status: ${res3.statusCode}, Body: "${res3.body}"`);
            if (res3.statusCode === 200 && res3.body.includes("Janumuri Yeswanth")) {
                console.log("  PASS: Correct status 200 and student name.\n");
                passed++;
            }

            // Test 4: GET /contact
            const res4 = await makeRequest("/contact");
            console.log(`[TEST 4] GET /contact -> Status: ${res4.statusCode}, Body: "${res4.body}"`);
            if (res4.statusCode === 200 && res4.body.includes("Welcome to the Contact Page!")) {
                console.log("  PASS: Correct status 200 and contact message.\n");
                passed++;
            }

            // Test 5: GET /time
            const res5 = await makeRequest("/time");
            console.log(`[TEST 5] GET /time -> Status: ${res5.statusCode}`);
            if (res5.statusCode === 200) {
                console.log("  PASS: Correct status 200 for /time.\n");
                passed++;
            }

            // Test 6: Unknown route
            const res6 = await makeRequest("/anything");
            console.log(`[TEST 6] GET /anything -> Status: ${res6.statusCode}, Body: "${res6.body}"`);
            if (res6.statusCode === 404 && res6.body.includes("404 - Page Not Found")) {
                console.log("  PASS: Correct status 404 for unknown route.\n");
                passed++;
            }

            console.log(`--- Test Summary: ${passed}/${total} passed ---`);
        } catch (err) {
            console.error("Test execution failed:", err);
        } finally {
            server.close(() => {
                console.log("Test server closed.");
            });
        }
    });
}

runTests();
