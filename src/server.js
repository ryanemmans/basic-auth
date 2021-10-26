'use strict';

const express = require('express');
const cors = require('cors');

const app = express();

// const modelFinder = require('./middleware/model-finder');
// const _404 = require('./error-handlers/404');
// const _500 = require('./error-handlers/500');

const authRouter = require('./auth/router.js');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(201).send('Hello World');
});

app.use('/auth', authRouter);
// app.use(modelFinder);
// app.use(_404);
// app.use(_500);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log(`Server is running on PORT ${port}.`));
  },
};
