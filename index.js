const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user.route");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// api
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res) => {
  res.send("No Route Found");
});

app.listen(port, () => {
  console.log(`Data listening on port ${port}`);
});
