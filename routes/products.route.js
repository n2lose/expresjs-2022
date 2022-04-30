const express = require('express');

const router = express.Router();
const productController = require('../controllers/products.controller');

router.get('/', productController.index);
router.get('/?page=&action=', productController.index);

module.exports = router;
