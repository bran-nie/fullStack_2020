import React, { useEffect, useState } from 'react';
import api from '../services/blog';

const Blog = (props) => {
    const { author, title, url } = props.blog;
    return (
        <div className="blog-item">
            <div className="title">{title}</div>
            <div className="author">{author}</div>
            <a href={url} className="link">
                Link
            </a>
        </div>
    );
};

const BlogApp = (props) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await api.getAll();
            setBlogs(res);
        };
        getData();
        return () => {};
    }, []);
    return (
        <div>
            <h2>blogs</h2>
            {blogs.map((blog) => {
                return <Blog key={blog.id} blog={blog} />;
            })}
        </div>
    );
};

export default BlogApp;
