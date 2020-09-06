const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');

const UserController = require('../controllers/UserController');

router.get('/', UserController.getAllUsers);
router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

router.get('/me', isAuth, UserController.getSelf);
router.patch('/me', isAuth, UserController.updateSelf);

router.get('/:username/exists', UserController.checkUsername);
//  router.get('/:identifier', UserController.getByIdentifier);  --> TODO - change ID to UUID

router.post('/:followedId/follow', isAuth, UserController.followUser);
router.post('/:followedId/unfollow', isAuth, UserController.unfollowUser);

module.exports = router;
