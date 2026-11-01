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
        let total = 4;

        try {
            // Test 1: GET /
            const res1 = await makeRequest("/");
            console.log(`[TEST 1] GET / -> Status: ${res1.statusCode}, Body: "${res1.body}"`);
            if (res1.statusCode === 200 && res1.body.includes("Welcome to my Lab 1 server!")) {
                console.log("  PASS: Correct status 200 and welcome message.\n");
                passed++;
            } else {
                console.error("  FAIL: Unexpected response for GET /\n");
            }

            // Test 2: GET /about
            const res2 = await makeRequest("/about");
            console.log(`[TEST 2] GET /about -> Status: ${res2.statusCode}, Body: ${res2.body}`);
            const aboutData = JSON.parse(res2.body);
            if (res2.statusCode === 200 && aboutData.name && aboutData.section) {
                console.log("  PASS: Correct status 200 and JSON with name and section.\n");
                passed++;
            } else {
                console.error("  FAIL: Unexpected response for GET /about\n");
            }

            // Test 3: GET /time
            const res3 = await makeRequest("/time");
            console.log(`[TEST 3] GET /time -> Status: ${res3.statusCode}, Body: ${res3.body}`);
            const timeData = JSON.parse(res3.body);
            if (res3.statusCode === 200 && timeData.currentDateTime) {
                console.log("  PASS: Correct status 200 and JSON with currentDateTime.\n");
                passed++;
            } else {
                console.error("  FAIL: Unexpected response for GET /time\n");
            }

            // Test 4: Unknown route (GET /random-unknown-endpoint)
            const res4 = await makeRequest("/random-unknown-endpoint");
            console.log(`[TEST 4] GET /random-unknown-endpoint -> Status: ${res4.statusCode}, Body: "${res4.body}"`);
            if (res4.statusCode === 404 && res4.body.includes("404 - Page Not Found")) {
                console.log("  PASS: Correct status 404 for unknown route.\n");
                passed++;
            } else {
                console.error("  FAIL: Expected 404 status code for unknown route.\n");
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
