const express = require("express");
const app = express();
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/artist", (req, res) => {
  console.log('querying artist');
  db.artist.findAll().then(function (artists){
    console.log(artists);
    response.send(artists);
  });
});

app.get('/artist/:id', (req, res) => {
  db.artist.findByPk(req.params.id).then( (artist) => {
    res.send(artist);
  });
})

app.put("/artist/:id", (req, res) => {
  console.log('updating artist: ' + req.params.id);
  let updateValues = {};

  if(req.body.name) {
    updateValues.name = req.body.name;
  }

  if(req.body.dob) {
    updateValues.dob = req.body.dob;
  }

  console.log(updateValues);

  db.artist.update(updateValues, { where: { id: req.params.id } })
  .then(function (updated) {
    console.log('updated success');
    console.log(updated);
    response.send(updated);
  });
});

app.post("/artist", (req, res) => {
  console.log('creating artist');
  console.log(req.body);
  db.artist.create({name: req.body.name, dob: req.body.dob})
  .then(function (artist){
    console.log(artist);
    response.send("new artist created with id: " + artist.id);
  });
});

app.listen(3000, function(){
  console.log('server listening on port 3000');
})