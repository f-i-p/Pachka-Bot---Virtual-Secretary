require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const express = require('express');
const apiRouter = require('./routers/api.router');
const scheduleTasks = require('../utils/scheduler')

const app = express();
const { PORT } = process.env;

const corsConfig = {
  //! Access-Control-Allow-Origin
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
};

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

scheduleTasks();

app.use('/api/v1', apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

