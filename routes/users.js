const router = require('express').Router();

const { updateUserDataValid } = require('../middlewares/validators');
const { getUserData, updateUserData } = require('../controllers/users');

router.get('/me', getUserData);
router.patch('/me', updateUserDataValid, updateUserData);

module.exports = router;
