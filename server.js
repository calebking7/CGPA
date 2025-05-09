const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files (HTML, CSS, JS)
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// In-memory "database" for simplicity
const users = {};

// Routes
app.get("/", (req, res) => {
  if (req.session.user) {
    res.sendFile(__dirname + "/public/cgpa.html");
  } else {
    res.sendFile(__dirname + "/public/login.html");
  }
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    // Send error response as JSON
    return res.json({ success: false, message: "User already exists. Please log in." });
  }
  users[username] = password;
  req.session.user = username; // Automatically log in the user
  res.json({ success: true }); // Send success response
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    req.session.user = username;
    res.json({ success: true }); // Send success response
  } else {
    res.json({ success: false, message: "Invalid username or password." }); // Send error response
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Add a route to fetch the logged-in user's username
app.get("/username", (req, res) => {
  if (req.session.user) {
    res.json({ username: req.session.user });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
