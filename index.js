const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("ok");
});

app.use((req, res) => {
  res.status(404);
  res.send("Page non trouvee");
});

app.listen(port, () => {
  console.log(`Application run in port ${port} 😃 `);
});
