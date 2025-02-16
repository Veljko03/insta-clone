const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => res.send("hello"));

app.listen(3000, () => console.log("app running on port 3000"));
