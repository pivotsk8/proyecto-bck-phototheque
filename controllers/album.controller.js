const Album = require("../model/Album");

const createAlbumForm = (req, res) => {
  res.render("new_album", { title: "Nouvel album" });
};

const createAlbum = async (req, res) => {
  try {
    await Album.create({
      title: req.body.albumTitle,
    });
    res.redirect("/");
  } catch (error) {
    res.redirect("/album/create");
  }
};

module.exports = {
  createAlbumForm,
  createAlbum,
};
