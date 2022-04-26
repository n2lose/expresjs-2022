const express = require('express');
const { route } = require('express/lib/application');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads' })

const router = express.Router();
const userController = require('../controllers/users.controller');
const validateUser = require('../middlewares/validateUser.middleware');

router.get('/', userController.index);
router.get('/search', userController.search);
router.get('/:id([0-9a-f]{24})', userController.getUserDetails);
router.get('/create', userController.create);
router.post('/create', 
    upload.single('avatar'),
    validateUser.createUser,
    userController.postCreateUser
);

module.exports = router;
