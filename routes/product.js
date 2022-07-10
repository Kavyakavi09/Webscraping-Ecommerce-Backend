const route = require('express').Router();
const productData = require('../models/products');

//to get paginated get api.
route.get('/', (request, response) => {
  response.send('Welcome to my web scrapping app😊');
});

route.get('/mobiles', (req, res) => {
  try {
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
      .find((err, data) => {
        if (err) {
          res.status(403).json('An error accured while getting products');
        } else {
          res.status(200).json({ page, size, data: data });
        }
      })
      .limit(limit)
      .skip(skip);
  } catch (error) {
    res.status(500).json('Internal server error');
    console.log('something went wrong', error);
  }
});

//to get products based on search
route.get('/search-mobile', async (req, res) => {
  try {
    var search = req.query.search;
    const product_data = await productData.find({
      title: { $regex: '.*' + search + '.*', $options: 'i' },
    });
    if (product_data.length > 0) {
      res.status(200).json({ message: 'product details', data: product_data });
    } else {
      res.status(200).json({ message: 'product not found' });
    }
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
});
module.exports = route;
