const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');

const PostController = require('../controllers/PostController');

router.post('/', isAuth, PostController.storePost); // TODO - tests
router.get('/', PostController.getAllPost); // TODO - tests
router.get('/:postId', PostController.getPostById); // TODO - tests
router.patch('/:postId', isAuth, PostController.updatePost); // TODO - tests
router.delete('/:postId', isAuth, PostController.deletePost); // TODO - tests

module.exports = router;
