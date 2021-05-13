/* Load NodeJS Modules */
const express = require('express');
const path = require('path');

/* Load Local Modules */
const dogs = require('./modules/dogs');
const db = require('./modules/db');

//Configure express app
const app = express();
app.use(express.static('public'));

db.Connect();

//EndPoint to Retrieve Environment Variables
app.get('/Environment', function (req, res) {
    console.log(process.env)
    var data = {
        DOG_BREED: process.env.DOG_BREED,
        DOG_SUBBREED: process.env.DOG_SUBBREED,
        CF_INSTANCE_INDEX: (process.env.CF_INSTANCE_INDEX * 1) + 1,
        HOME: process.env.HOME
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
})
//EndPoint to Retrieve Random Dog from Dog Service
app.get('/Dogs', function (req, res) {
    dogs.Get12Dogs().then((data) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
    .catch((error) => {
        console.error("Error getting dogs")
        res.send({msg: error});
    })
})

//Retrieve Dogs from app DB
app.get('/Collection', function (req, res) {
    db.Select().then((data) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
    .catch((error) => {
        console.error("Error getting dog collection")
        res.send({msg: error});
    })
})

//EndPoint to Main page 
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));

var port = process.env.PORT || 8080

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
