const router = require('express').Router();
const { signUpValidator, signInValidator } = require('../middlewares/validators');
const { createUser, login } = require('../controllers/auth');

router.post('/signup', signUpValidator, createUser);
router.post('/signin', signInValidator, login);

module.exports = router;
