const BadRequest = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');

const getAllSaveMoviesUser = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  console.log(req.body);
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movies) => res.status(201).send(movies))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params._id;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найдена');
      } else if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нету прав доступа'));
      } else {
        return Movie.findByIdAndRemove(movieId)
          .then(() => {
            res.send({ message: 'Фильм был успешно удален' });
          });
      }
    })
    .catch(next);
};

module.exports = {
  getAllSaveMoviesUser,
  addMovie,
  deleteMovie,
};
