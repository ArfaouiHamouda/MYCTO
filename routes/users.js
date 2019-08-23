const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const User = require("../models").User;
const Favori = require("../models").Favori;
const Movie = require("../models").Movie;
// get list of all users
router.get("/", (req, res) =>
  User.findAll()
    .then(users => {
      console.log(users);
      res.status(200).send({
        users: users
      });
    })
    .catch(err => console.log(err))
);
// add movie to favorite
router.post("/favoris/:id", (req, res) => {
  if (!req.body.movieId) {
    res.sendStatus(500);
  }
  if (!req.params.id) {
    res.sendStatus(500);
  }
  Favori.create({
    userId: req.params.id,
    movieId: req.body.movieId
  })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err));
});
// Remove a movie from favorite
router.delete("/favoris/:id", (req, res) => {
  if (!req.body.movieId) {
    res.sendStatus(500);
  }
  if (!req.params.id) {
    res.sendStatus(500);
  }
  Favori.destroy({
    where: {
      userId: req.params.id,
      movieId: req.body.movieId
    }
  })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err));
});
// Get User Movies
/**
 * /users/5 , Get User w/ ID 5 and his favorite Movies
 */
router.get("/:id", (req, res) => {
  id = req.params.id;
  User.findOne({
    include: [
      {
        model: Movie,
        as: "movies",
        required: false
      }
    ],
    where: { id: id }
  })
    .then(user => {
      console.log(user);
      res.status(200).send({
        data: user
      });
    })
    .catch(err => console.log(err));
});
// Create new User w/out profile Picture
/**
 * username : string
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const createdUser = await User.create({
      username: req.body.username
    });
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        res.status(200).send({ data: user });
      })
      .catch(err => res.sendStatus(500));
  })
);

// Delete User
/**
 * users/5 , Delete User w/ ID 5
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({
      where: { id: id }
    });
    const movies = await user.getMovies();
    user.removeMovies(movies);

    User.destroy({
      where: { id: id }
    })
      .then(() => res.sendStatus(200))
      .catch(err => res.sendStatus(500));
  })
);

module.exports = router;
