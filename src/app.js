const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const usersRoutes = require("./routes/users.routes");
const postsRoutes = require("./routes/posts.routes");
const commentsRoutes = require("./routes/comments.routes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/comments", commentsRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {console.log("Server is running successfully");});