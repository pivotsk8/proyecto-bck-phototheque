const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const flash = require("connect-flash");
const path = require("path");
const mongoose = require("mongoose");
const albumRoute = require("./routes/album.routes");
const app = express();

const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/phototheque");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  res.redirect("/albums");
});

app.use("/", albumRoute);

app.use((err, req, res, next) => {
  res.status(500).send("Erreur interne du serveur");
});

app.use((req, res) => {
  res.status(404);
  res.send("Page non trouvee");
});

app.listen(port, () => {
  console.log(`Application run in port ${port} 😃 `);
});
