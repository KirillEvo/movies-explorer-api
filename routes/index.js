const router = require('express').Router();

const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

// Импорт роутеров
const userRoutes = require('./users');
const movieRoutes = require('./movie');
const authRoutes = require('./auth');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use(authRoutes);
// Защита аутенфикацией
router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Некорректный путь'));
});

module.exports = router;
