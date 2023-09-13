const path = require('path');
const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const PORT = 8000;

const MONGO_URI = process.env.MY_URI;

app.use(cors({ origin: 'http://localhost:3000' }));

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'recipe-query',
  })
  .then(() => {
    console.log('Connected to Mongo DB.');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
      res.send('Server is active!');
    });

    const apiRouter = require('./routes/api');
    app.use('/api', apiRouter);

    app.use((err, req, res, next) => {
      const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
      };
      const errorObj = Object.assign({}, defaultErr, err);
      console.log(errorObj.log);
      return res.status(errorObj.status).json(errorObj.message);
    });

    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

module.exports = app;
