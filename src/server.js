'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

const basicAuth = require('./middleware/basicAuth.js');
const { Users } = require('./models/users.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});

app.post('/signin', basicAuth, (req, res) => {
  console.log('You\'ve hit the signin route!!');
  res.send('OK');
});

app.get('/', (req, res) => {
  res.status(201).send('Hello World');
});

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log(`Server is running on PORT ${port}.`));
  },
};
