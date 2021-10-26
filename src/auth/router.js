'user strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const { Users } = require('./models');

const app = express();
app.use(express.json());

const Collection = require('./models/lib/Collection.js');

const modelMap = {
  users: new Collection(Users),
};

router.use('/:model', function (req, res, next) {
  const model = modelMap[req.params.model];
  console.log(model);

  if (!model) {
    next('No Model Found');
  }

  req.model = model;
  next();
});

router.use(express.urlencoded({ extended: true }));

Users.beforeCreate(async (user) => {
  console.log(user);
  let encryptedPassword = await bcrypt.hash(user.password, 10);
  user.password = encryptedPassword;
  // console.log(user);
});

router.post('/signup', async (req, res, next) => {
  let userData = req.body;
  try {
    userData.password = await bcrypt.hash(userData.password, 10);
    const record = await Users.create({
      username: userData.username,
      password: userData.password,
    });
    res.status(200).json(record);
  } catch (e) {
    res.status(403).send('Error Creating User');
    next(e.message);
  }
});

router.post('/signin', async (req, res, next) => {
  console.log(req);
  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const user = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    }
    else {
      throw new Error('Invalid User');
    }
  } catch (e) {
    res.status(403).send('Invalid Login');
    next(e.message);
  }
});

module.exports = router;
