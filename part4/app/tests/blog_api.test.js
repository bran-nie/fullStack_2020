const mongoose = require('mongoose');
const supertest = require('supertest');
// const Blog = require('../models/blog');
const app = require('../app');

const api = supertest(app);

// beforeEach(async () => {
//     await Blog.deleteMany({});

//     let blogObject = new Blog();
//     await blogObject.save();
// });

test('blog are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/);
});

afterAll(() => {
    mongoose.connection.close();
});
