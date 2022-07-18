const route = require('express').Router();
const productData = require('../models/products');

//to get paginated get api.
route.get('/', (request, response) => {
  response.send('Welcome to my web scrapping app😊');
});

route.get('/mobiles', (req, res) => {
  try {
    var search = req.query.search;
    let { page, size } = req.query;
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }
    const limit = parseInt(size);
    const skip = (page - 1) * size;

    productData
      .find(
        {
          title: { $regex: '.*' + search + '.*', $options: 'i' },
        },
        (err, data) => {
          if (err) {
            res.status(403).json('product not found');
          } else {
            res.status(200).json({
              page,
              size,
              data: data,
            });
          }
        }
      )
      .limit(limit)
      .skip(skip);
  } catch (error) {
    res.status(500).json('Internal server error');
    console.log('something went wrong', error);
  }
});

module.exports = route;
