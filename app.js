const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const asyncHandler = require("express-async-handler");
const path = require("path");
const User = require("./models").User;
const Movie = require("./models").Movie;
const Favori = require("./models").Favori;
const app = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// File Upload
app.use(fileUpload());
//cross-origin ressources sharing to handle requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
// Router to Create User & Upload Profile Image
/**
 * file : image
 * username : string
 */
app.post(
  "/upload",
  asyncHandler(async (req, res) => {
    // File Check and Upload
    if (req.files === null) {
      return res.status(200).json({ message: "No File Was uploaded" });
    }
    const file = req.files.file;
    file.mv(`${__dirname}/dashboard/public/uploads/${file.name}`, err => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    });
    // If User Exist Return Error
    const foundUser = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    if (!foundUser) {
      console.log("User not found !!! ");
      createdUser = await User.create({
        avatar: file.name,
        username: req.body.username
      });
      // return the Created User
      User.findOne({
        where: {
          username: req.body.username
        }
      })
        .then(user => {
          res.status(200).send({ data: user });
        })
        .catch(err => res.sendStatus(500));
    } else {
      res.status(200).send({ message: "user already exists" });
    }
  })
);
// API Routes
app.use("/users", require("./routes/users"));
app.use("/movies", require("./routes/movies"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Started ON ${PORT}`));
