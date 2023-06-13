const Album = require("../model/Album");
const catchAsync = require("../helpers/catchAsync");
const path = require("path");
const fs = require("fs");
const { rimraf } = require("rimraf");

const albums = catchAsync(async (req, res) => {
  const albums = await Album.find();

  res.render("albums", {
    title: "Mes albums",
    albums,
  });
});

const album = catchAsync(async (req, res) => {
  try {
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum);

    res.render("album", {
      title: `Mon album ${album.title}`,
      album,
      errors: req.flash("error"),
    });
  } catch (error) {
    res.redirect("/404");
  }
});

const addImage = catchAsync(async (req, res) => {
  const idAlbum = req.params.id;
  const album = await Album.findById(idAlbum);

  if (!req?.files?.image) {
    req.flash("error", "Aucun ficheir mis en ligne");
    res.redirect(`/albums/${idAlbum}`);
    return;
  }

  const image = req.files.image;
  if (image.mimetype !== "image/jpeg" && image.mimetype !== "image/png") {
    req.flash("error", "Fichiers JPG et PNG accepté uniquement");
    res.redirect(`/albums/${idAlbum}`);
    return;
  }

  const folderPath = path.join(__dirname, "../public/uploads", idAlbum);
  fs.mkdirSync(folderPath, { recursive: true });

  const imageName = image.name;
  const localPath = path.join(folderPath, imageName);
  await req.files.image.mv(localPath);

  album.images.push(imageName);
  album.save();

  res.redirect(`/albums/${idAlbum}`);
});

const createAlbumForm = catchAsync((req, res) => {
  res.render("new_album", {
    title: "Nouvel album",
    errors: req.flash("error"),
  });
});

const createAlbum = catchAsync(async (req, res) => {
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
});

const deleteImage = catchAsync(async (req, res) => {
  const idAlbum = req.params.id;
  const album = await Album.findById(idAlbum);

  const imageIndex = req.params.imageIndex;
  const image = album.images[imageIndex];
  if (!image) {
    res.redirect(`/albums/${idAlbum}`);
    return;
  }

  album.images.splice(imageIndex, 1);
  await album.save();

  const imagePath = path.join(__dirname, "../public/uploads", idAlbum, image);
  fs.unlinkSync(imagePath);

  res.redirect(`/albums/${idAlbum}`);
});

const deleteAlbum = catchAsync(async (req, res) => {
  const idAlbum = req.params.id;
  await Album.findByIdAndDelete(idAlbum);

  const albumPath = path.join(__dirname, "../public/uploads", idAlbum);
  rimraf(albumPath);
  res.redirect("/albums");
});

module.exports = {
  albums,
  album,
  addImage,
  createAlbumForm,
  createAlbum,
  deleteImage,
  deleteAlbum,
};
