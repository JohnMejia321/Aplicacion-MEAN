const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Agrega esta línea

const app = express();
const port = process.env.PORT || 3000;

const atlasConnectionString =
  "mongodb+srv://admin:fredy555@cluster0.ozzfqlc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(atlasConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

const User = mongoose.model("User", {
  name: String,
  email: String,
});

app.use(bodyParser.json());

// Agrega el middleware de CORS antes de las rutas
app.use(cors());

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  await newUser.save();
  res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
