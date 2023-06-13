const Album = require("../model/Album");

const albums = async (req, res) => {
  const albums = await Album.find();

  res.render("albums", {
    title: "Mes albums",
    albums,
  });
};

const createAlbumForm = (req, res) => {
  res.render("new_album", {
    title: "Nouvel album",
    errors: req.flash("error"),
  });
};

const createAlbum = async (req, res) => {
  try {
    if (!req.body.albumTitle) {
      req.flash("error", "Le titre ne etre vide ");
      res.redirect("/albums/create");
      return;
    }
    await Album.create({
      title: req.body.albumTitle,
    });
    res.redirect("/");
  } catch (error) {
    req.flash("error", "Erreur lors de la creation de l'album");
    res.redirect("/albums/create");
  }
};

module.exports = {
  albums,
  createAlbumForm,
  createAlbum,
};
