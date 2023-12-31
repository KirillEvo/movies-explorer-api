const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequest = require('../errors/BadRequest');

const validateUrl = (url) => {
  const validate = validator.isURL(url);
  if (validate) {
    return url;
  }
  throw new BadRequest('Некорректный URL');
};

const validateID = (id) => {
  if (/^[0-9a-fA-F]{24}$/.test(id)) {
    return id;
  }
  throw new BadRequest('Некорректный ID');
};

const signUpValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const signInValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserDataValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

const addMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(1),
    director: Joi.string().min(1),
    duration: Joi.number().required(),
    year: Joi.string().min(1),
    description: Joi.string().min(1),
    image: Joi.string().custom(validateUrl),
    trailerLink: Joi.string().custom(validateUrl),
    thumbnail: Joi.string().custom(validateUrl),
    movieId: Joi.number(),
    nameRU: Joi.string().min(1),
    nameEN: Joi.string().min(1),
  }),
});

const delMovieValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().custom(validateID),
  }),
});

module.exports = {
  signUpValidator,
  signInValidator,
  updateUserDataValid,
  addMovieValidator,
  delMovieValidator,
};
