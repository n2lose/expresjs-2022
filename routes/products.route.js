const express = require('express');

const router = express.Router();
const productController = require('../controllers/products.controller');

router.get('/', productController.index);
router.get('/?page=&action=', productController.index);
router.get('/search', productController.search);

module.exports = router;
