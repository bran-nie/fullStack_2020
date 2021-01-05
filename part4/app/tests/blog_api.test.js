const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./blog_api.helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog);
        await blogObject.save();
    }
});

test('blog are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/);
});
test('blog 唯一标识符是id', async () => {
    const newBlog = {
        title: 'blog 3',
        author: 'bran',
        url: 'www',
        likes: 3,
    };
    const addBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    expect(addBlog.body.id).toBeDefined();
});

test('blog 可以新增', async () => {
    const oldBlogs = await api.get('/api/blogs');
    const newBlog = {
        title: 'blog 4',
        author: 'bran',
        url: 'www',
        likes: 3,
    };
    const addBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    const newBlogs = await api.get('/api/blogs');
    expect(newBlogs.body).toHaveLength(oldBlogs.body.length + 1);
    expect(addBlog.body.title).toEqual(newBlog.title);
});

test('blog likes default is 0', async () => {
    const newBlog = {
        title: 'blog 4',
        author: 'bran',
        url: 'www',
    };
    const addBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    expect(addBlog.body.likes).toBe(0);
});

test('blog need title & url', async () => {
    const newBlog = {
        author: 'bran',
    };
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);
});

afterAll(() => {
    mongoose.connection.close();
});
