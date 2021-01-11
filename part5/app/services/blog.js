const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const getAllBlogs = async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
    });
    response.json(blogs);
};

const getBlog = async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id);
        if (blog) {
            response.json(blog);
        } else {
            response.status(404).end();
        }
    } catch (error) {
        next(error);
    }
};

const createBlog = async (request, response, next) => {
    const { body } = request;
    if (!body.title || !body.url) {
        return response.status(400).json({
            error: 'content missing',
        });
    }
    const token = request.token;
    console.log({ token });
    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log({ decodedToken });
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
        title: body.title || '',
        author: user.username,
        url: body.url || '',
        likes: body.likes || 0,
        user: user._id,
    });
    try {
        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        response.json(savedBlog);
    } catch (error) {
        next(error);
    }
};
const deleteBlog = async (request, response, next) => {
    const token = request.token;
    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'unlogin' });
    }
    try {
        const blog = await Blog.findById(request.params.id);
        const user = await User.findById(decodedToken.id);
        // 如果没有user的blog，也可以删去
        if (!blog.user || blog.user.toString() === user.id.toString()) {
            await Blog.findByIdAndRemove(request.params.id);
            response.status(204).end();
        } else {
            response.status(403).json({
                error: 'not your blog, you can not delete',
            });
        }
    } catch (error) {
        next(error);
    }
};
const updateBlog = async (request, response, next) => {
    const body = request.body;
    const blog = {
        ...body,
    };
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            blog,
            {
                new: true,
            }
        );
        response.json(updatedBlog);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    updateBlog,
};
