'use strict';

const supertest = require('supertest');
const app = require('../index.js');
const { db } = require('../src/models');
const base64 = require('base-64');

const request = supertest(app);

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('Testing authentication routes', () => {
  it('Should be able to create a new User.', async () => {
    const response = await request.post('/signup').send({
      username: 'Jacob',
      password: 'test',
    });

    expect(response.status).toBe(403);
    expect(response.body.username).toBe('Ryan');
  });

  it ('Should be able to sign with an encoded auth header.', async () => {
    let encodedUserPass = base64.encode(`Ryan:test`);
    
    const response = await request.post('/signin').set({
      Authorization: `Basic ${encodedUserPass}`,
    });

    expect(response.status).toEqual(403);
  });
});
