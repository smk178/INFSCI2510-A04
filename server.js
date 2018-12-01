const mongoose = require("mongoose");

const express = require("express");

const cors = require("cors");

const Path = require("path");

const bodyParser = require("body-parser");

const passport = require('passport');

const internal_passport = require('./config/passport');

const app = express();

app.use(passport.initialize());

app.use('/static/',express.static(Path.join(__dirname + '/node_modules')));

app.use(express.static(Path.join(__dirname + '/public')));

const router = express.Router();

const appRoutes = require('./routes/user.routes')(router);

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use('/api', appRoutes);

const database = mongoose.connect('mongodb://localhost/quizup',{ useNewUrlParser: true });

app.listen(3000);