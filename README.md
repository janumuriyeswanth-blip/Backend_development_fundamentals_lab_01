# Lab 1: Node.js and Express Server

## Student Details

- **Name:** Janumuri Yeswanth
- **Registration Number:** 252U1R9145
- **Section:** CSE-GEN-AI 2C 112
- **Course:** Backend Development Fundamentals
- **Lab Number:** 01
- **GitHub Repository:** [Backend_development_fundamentals_lab_01](https://github.com/janumuriyeswanth-blip/Backend_development_fundamentals_lab_01)

---

## Objective

To set up a Node.js project, build a basic HTTP server using the built-in `http` module, and implement an Express.js server with multiple REST routes, appropriate HTTP status codes, and error fallback handling.

---

## Technologies Used

- **Node.js** (v24.x)
- **Express.js** (v4.x / v5.x)
- **JavaScript / CommonJS**
- **npm** (Node Package Manager)

---

## Project Structure

```text
backend-fundamentals-lab-01/
├── screenshots/
│   ├── home.png                    # GET / response screenshot
│   ├── about.png                   # GET /about response screenshot
│   ├── student.png                 # GET /student response screenshot
│   ├── not-found.png               # 404 Not Found response screenshot
│   └── time.png                    # GET /time response screenshot
├── server-http.js                  # Built-in Node.js HTTP server
├── server.js                       # Express application server
├── test-endpoints.js               # Automated test script
├── package.json                    # Project configuration and dependencies
├── .gitignore                      # Git ignore rules
└── README.md                       # Lab documentation
```

---

## Installation and Setup

### Prerequisites

- Node.js and npm installed on your machine.
- Terminal / command prompt (PowerShell, Bash, or Command Prompt).

### Steps to Run

1. **Navigate to the project folder:**
   ```bash
   cd backend-fundamentals-lab-01
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Express server:**
   ```bash
   npm start
   # or: node server.js
   ```

4. **Access the server in your browser:**
   - Home: [http://localhost:3000/](http://localhost:3000/)
   - About: [http://localhost:3000/about](http://localhost:3000/about)
   - Student: [http://localhost:3000/student](http://localhost:3000/student)
   - Contact: [http://localhost:3000/contact](http://localhost:3000/contact)
   - Time: [http://localhost:3000/time](http://localhost:3000/time)
   - Unknown Route: [http://localhost:3000/anything](http://localhost:3000/anything)

### Run the Basic HTTP Server

```bash
npm run start:http
# or: node server-http.js
```

### Run Automated Tests

```bash
npm test
```

---

## Endpoints

| Method | Endpoint | Description | Expected Status |
|---|---|---|---|
| **GET** | `/` | Returns the server welcome message | `200 OK` |
| **GET** | `/about` | Returns the about page greeting | `200 OK` |
| **GET** | `/student` | Returns the student name | `200 OK` |
| **GET** | `/contact` | Returns the contact page message | `200 OK` |
| **GET** | `/time` | Returns current date and time | `200 OK` |
| **GET** | `/*` (undefined) | Fallback handler for unknown routes | `404 Not Found` |

---

## Screenshots

### 1. Home Route (`/`)
Displays the welcome message.

![Home route response](screenshots/home.png)

### 2. About Route (`/about`)
Displays the about page message.

![About route response](screenshots/about.png)

### 3. Student Route (`/student`)
Displays the student's name.

![Student route response](screenshots/student.png)

### 4. Unknown Route (`/anything`)
Displays the 404 Page Not Found error message.

![404 route response](screenshots/not-found.png)

---

## HTTP Status Codes

- **`200 OK`:** The request succeeded and the server returned the requested resource.
- **`404 Not Found`:** The server could not find a matching route for the requested URL path.

---

## Viva Questions & Answers

### 1. What is the difference between `package.json` and `node_modules`?
- **`package.json`:** Contains project metadata, script commands, and defines project dependencies and version ranges. It is small, version-controlled, and shared across collaborators.
- **`node_modules`:** Contains the actual installed package code and third-party dependencies downloaded by npm. It is machine-specific and excluded from version control via `.gitignore`.

### 2. What does `app.listen()` do?
`app.listen()` binds the Express server to a specified network port and starts listening for incoming HTTP connections and client requests.

### 3. What do `request` and `response` represent?
- **`request` (`req`):** Encapsulates the incoming HTTP request data sent by the client (HTTP method, headers, URL query parameters, route parameters, body).
- **`response` (`res`):** Used by the server to construct and return the HTTP response back to the client, including HTTP status codes, response headers, and response payloads.

---

## Problems Faced and Solutions

1. **Port Collision (EADDRINUSE):**
   - *Problem:* Running multiple server instances resulted in `Error: listen EADDRINUSE: address already in use :::3000`.
   - *Solution:* Terminated the previous node process using `Stop-Process -Name node -Force` or `Ctrl + C` before restarting the server.

2. **Git Remote URL Syntax:**
   - *Problem:* Including angle brackets `<>` in the remote URL caused `fatal: unable to access ... returned error: 400`.
   - *Solution:* Updated the remote URL to the direct format without placeholder symbols: `https://github.com/janumuriyeswanth-blip/Backend_development_fundamentals_lab_01.git`.
