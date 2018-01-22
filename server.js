const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const router = require('./routes');


const { NODE_ENV, API_PORT, MONGODB_URI } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', (req, res) => { res.json({ message: 'API Initialized!' }); });
app.use('/', router);

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(API_PORT, () => {
    console.log(`Connected to MongoDB, api running on port ${API_PORT}`);
  });
}, err => console.log(err));