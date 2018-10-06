const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

// App initialization
const app = new express();

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("Database Connected..."))
  .catch(err => console.log(`Ops ${err}`));

// API Routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

app.get("/", (req, res) => res.send("Hello"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
