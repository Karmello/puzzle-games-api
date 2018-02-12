const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const router = express.Router();
require('./routes')(router);


const { NODE_ENV, MONGODB_URI } = process.env;
const port = process.env.PORT || 3001;

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

if (NODE_ENV === 'development') {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(port, () => {
    console.log(`Connected to MongoDB, api running on port ${port}`);
  });
}, err => console.log(err));