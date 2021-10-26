'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');

const username = 'Ryan';
const password = 'supersecret';

const userpass = `${username}:${password}`;

const encoded = base64.encode(userpass);
console.log(encoded);

const decoded = base64.decode(encoded);

// Encrypt!
const [ user, pass ] = decoded.split(':');
const complexity = 5;
bcrypt.hash(pass, complexity).then(hashedPassword => {
  console.log(hashedPassword);

  let checkpassword = 'supersecret';

  bcrypt.compare(checkpassword, hashedPassword).then(isCorrect => {
    console.log(isCorrect);
  });
});

console.log(user, pass);
