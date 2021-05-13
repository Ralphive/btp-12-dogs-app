/* Load NodeJS Modules */
const express = require('express');
const path = require('path');


//Configure express app
const app = express();
app.use(express.static('public'));

//EndPoint to Retrieve Environment Variables
app.get('/Environment', function (req, res) {
    res.send("RETURN ENVIRONMENT VARIABLES");
})


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));

var port = process.env.PORT || 8080

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
