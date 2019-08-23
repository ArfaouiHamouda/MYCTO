const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const User = require("../models").User;
const Favori = require("../models").Favori;
const Movie = require("../models").Movie;

// Get All Movies
router.get("/", (req, res) =>
  Movie.findAll()
    .then(movies => {
      console.log(movies);
      res.status(200).send({
        movies: movies
      });
    })
    .catch(err => console.log(err))
);

// Create New Movie
/**
 * title : string
 * image : string
 */
router.post("/", (req, res) => {
  Movie.create({
    title: req.body.title,
    image: req.body.image
  }).then(() => res.sendStatus(200));
});

module.exports = router;
