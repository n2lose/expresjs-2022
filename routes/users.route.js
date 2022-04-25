const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.get('/', userController.index);
router.get('/search', userController.search);

module.exports = router;
