const express = require('express');
const connect = require('./db/connectdb');
const scrapData = require('./db/scrap');
const productData = require('./models/products');
const cors = require('cors');
const productRoute = require('./routes/product');

// web server
const app = express();
app.use(express.json());

// dotenv environment setup
require('dotenv').config();

// connect to the database
server = async () => {
  await connect();
  await scrapData();
  //Db resets for every 12 hrs i.e:43200*1000;

  setInterval(async () => {
    // await productData.deleteMany({});
    await scrapData();
    console.log('data reseted sucessfully');
  }, 43200 * 1000);

  //to allow every application
  app.use(cors());

  app.use((req, res, next) => {
    console.log('logging middleware');
    next();
  });
};

// product routes
app.use('/api/product', productRoute);

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`The App is running on the port ${port}`);
});

server();
