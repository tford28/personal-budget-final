const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const dbName = require("./config/config").mongoURI;
const mongoose = require("mongoose");
const users = require("./routes/users");
const budget = require("./routes/budget_db");
const cors = require("cors");
const app = express();

app.use((req,res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://206.189.228.159");
    res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
    next();
});

app.use(cors());
app.use(bodyParser.json());

mongoose
.connect(dbName)
.then(() => console.log("Connected to Database"))
.catch(() => console.log(err));

app.get("/", (req,res) => {
    res.send("This is from rest API");
});

app.use("/users", users);
app.use("/budget", budget);

const port = 3000;
app.listen(port, () => {
    console.log(`API served at ${port}`);
});