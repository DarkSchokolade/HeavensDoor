const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: './api/config/config.env' });

const app = express();

// Logs information about all the requests.
if (process.env.NODE_ENV === 'development') {
  // Middleware used to log requests.
  app.use(morgan('dev'));
}

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.status('200').send({ status: 'active' });
});
app.use('/sso', require('./api/routes/sso'));

const PORT = process.env.PORT || 4000;
const SERVER_IP = process.env.SERVER_IP || 'localhost';

app.listen(
  PORT,
  SERVER_IP,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} of ${SERVER_IP}`
  )
);
