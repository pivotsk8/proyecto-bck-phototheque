const Album = require("../model/Album");

const createAlbumForm = (req, res) => {
  res.render("new_album", { title: "Nouvel album" });
};

const createAlbum = async (req, res) => {
  await Album.create({
    title: req.body.albumTitle,
  });
  res.redirect("/");
};

module.exports = {
  createAlbumForm,
  createAlbum,
};
