require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const express = require('express');
const apiRouter = require('./routers/api.router');

const app = express();
const { PORT } = process.env;

const corsConfig = {
  //! Access-Control-Allow-Origin
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(bodyParser.json());

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

