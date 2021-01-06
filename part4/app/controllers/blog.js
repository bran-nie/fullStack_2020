const blogRouter = require('express').Router();
const BlogServices = require('../services/blog');

blogRouter.get('/', BlogServices.getAllBlogs);
blogRouter.get('/:id', BlogServices.getBlog);
blogRouter.delete('/:id', BlogServices.deleteBlog);
blogRouter.put('/:id', BlogServices.updateBlog);
blogRouter.post('/', BlogServices.createBlog);

module.exports = blogRouter;
