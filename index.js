const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const albumRoute = require("./routes/album.routes");
const app = express();

const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/phototheque");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.render("album", { title: "Album" });
// });

app.use("/", albumRoute);

app.use((req, res) => {
  res.status(404);
  res.send("Page non trouvee");
});

app.listen(port, () => {
  console.log(`Application run in port ${port} 😃 `);
});
