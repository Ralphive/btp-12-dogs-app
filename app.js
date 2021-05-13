/* Load NodeJS Modules */
const express = require('express');
const path = require('path');

/* Load Local Modules */
const dogs = require('./modules/dogs');

//Configure express app
const app = express();
app.use(express.static('public'));

//EndPoint to Retrieve Environment Variables
app.get('/Environment', function (req, res) {
    res.send("RETURN ENVIRONMENT VARIABLES");
})

//EndPoint to Retrieve Environment Variables
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


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));

var port = process.env.PORT || 8080

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
