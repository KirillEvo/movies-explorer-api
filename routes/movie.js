const router = require('express').Router();

const { getAllSaveMoviesUser, addMovie, deleteMovie } = require('../controllers/movies');
const { addMovieValidator, delMovieValidator } = require('../middlewares/validators');

router.get('/', getAllSaveMoviesUser);
router.post('/', addMovieValidator, addMovie);
router.delete('/:_id', delMovieValidator, deleteMovie);

module.exports = router;
