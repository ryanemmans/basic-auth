'use strict';

require('dotenv').config();
const { db } = require('./src/auth/models/index.js');
const { start } = require('./src/server.js');
const PORT = process.env.PORT || 3000;

db.sync().then(() => {
  start(PORT);
});
