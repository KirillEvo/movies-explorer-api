const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes');
const { PORT, MONGO_URL } = require('./config');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(helmet());

app.use(express.json());

app.use(cookieParser());
app.use(cors);

mongoose.connect(MONGO_URL)
  .then(() => console.log('DB - OK'))
  .catch((err) => console.log(err));

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.use(errorHandler);
app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
