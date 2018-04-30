var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var morgan = require('morgan');
const cors = require('cors');
var apptools = require('./apptools');


var app = express();

mongoose.Promise = require('bluebird');
mongoose.connect(apptools.connectionString); // connect to database


app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json());

app.use(
    cors({
        origin: ['http://localhost'],
        methods: ["PUT, GET, POST, DELETE, OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "x-access-token"],
        credentials: true
    })
);

require('./routes/auth')(app);


app.use(morgan('dev'));

var app_port = 3000;
var server = http.createServer(app);
server.listen(app_port, function () {
    console.log('API running on localhost:' + app_port)
});
