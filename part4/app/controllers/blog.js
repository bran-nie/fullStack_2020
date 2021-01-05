const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

const getAllBlogs = async (request, response) => {
    const blogs = await Blog.find({});
    logger.info('--- get all notes, length', blogs.length);
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

    const blog = new Blog({
        title: body.title || '',
        author: body.author || '',
        url: body.url || '',
        likes: body.likes || 0,
    });
    try {
        const savedBlog = await blog.save();
        response.json(savedBlog);
    } catch (error) {
        next(error);
    }
};
const deleteBlog = async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
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

blogRouter.get('/', getAllBlogs);
blogRouter.get('/:id', getBlog);
blogRouter.delete('/:id', deleteBlog);
blogRouter.put('/:id', updateBlog);
blogRouter.post('/', createBlog);

module.exports = blogRouter;
