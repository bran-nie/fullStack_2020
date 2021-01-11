import React, { useEffect, useState } from 'react';
import api from '../../services/blog';
import './index.scss';
import Notification, { NotificationType } from '../../components/Notification';
import Toggleabel from '../../components/Toggleable';

const transformBlogs = (data) => {
    return data.sort((a, b) => a.likes - b.likes);
};
const BlogItem = (props) => {
    const { blog, update, deleteBlog } = props;
    const { id, author, title, url, likes } = blog;
    const [show, setShow] = useState(false);

    const handleBlogShow = () => {
        setShow(!show);
    };
    const handleUpdate = () => {
        console.log(update);
        update(id, { ...blog, likes: likes + 1, user: blog?.user?.id });
    };
    const handleDelete = () => {
        const r = window.confirm(
            `remove blog '${title}' by '${author}', are you sure?`
        );
        if (r) {
            deleteBlog(id);
        } else {
            console.log('cancel');
        }
    };
    return (
        <div className="blog-item">
            <div className="title">
                {title}{' '}
                <button onClick={handleBlogShow}>
                    {show ? 'hide' : 'view'}
                </button>
            </div>
            <div style={{ display: show ? 'block' : 'none' }}>
                <div className="url">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="title"
                    >
                        {url}
                    </a>
                </div>
                <div className="like">
                    likes {likes} <button onClick={handleUpdate}>like</button>
                </div>
                <div className="author">{author}</div>
                <button onClick={handleDelete}>remove</button>
            </div>
        </div>
    );
};
const CreateBlog = (props) => {
    const { create } = props;
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const handleCreate = () => {
        console.log({ title, author, url });
        if (title && author && url) {
            const data = { title, author, url };
            create(data);
        }
    };
    return (
        <>
            <h4>Create new</h4>
            <div className="new-blog">
                <div className="item">
                    <span className="label">title: </span>
                    <input
                        type="text"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div className="item">
                    <span className="label">author: </span>
                    <input
                        type="text"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div className="item">
                    <span className="label">url: </span>
                    <input
                        type="text"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
            </div>
            <button onClick={handleCreate}>create</button>
        </>
    );
};

const BlogApp = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [msgObj, setMsgObj] = useState({
        message: '',
        type: NotificationType.Success,
    });

    const create = async (data) => {
        try {
            const res = await api.create(data);
            console.log({ res });
            setMsgObj({
                message: `a new blog ${res.title} by ${res.author}`,
                type: NotificationType.Success,
            });
            setBlogs(transformBlogs(blogs.concat(res)));
            console.log('parent created');
        } catch (error) {
            console.log(error);
            setMsgObj({
                message: `Error`,
                type: NotificationType.Error,
            });
        }
    };

    const update = async (id, data) => {
        try {
            console.log({ id, data });
            const res = await api.update(id, data);
            const _blogs = blogs.map((item) => (item.id === id ? res : item));
            setBlogs(transformBlogs(_blogs));
            setMsgObj({
                message: 'update success',
                type: NotificationType.Success,
            });
        } catch (error) {}
    };

    const deleteBlog = async (id) => {
        try {
            await api.deleteBlog(id);
            const _blogs = blogs.filter((blog) => blog.id !== id);
            setMsgObj({
                message: `delete success`,
                type: NotificationType.Success,
            });
            setBlogs(_blogs);
        } catch (error) {
            console.log({ error });
            console.log(error.response.data);
            setMsgObj({
                message: error.response.data.error,
                type: NotificationType.Error,
            });
        }
    };

    useEffect(() => {
        const getData = async () => {
            const res = await api.getAll();
            setBlogs(transformBlogs(res));
        };
        getData();
        return () => {};
    }, []);
    return (
        <div>
            <h2>blogs</h2>
            <Toggleabel buttonLabel="create new blog">
                <CreateBlog create={create} />
            </Toggleabel>
            {blogs.map((blog) => {
                return (
                    <BlogItem
                        key={blog.id}
                        blog={blog}
                        update={update}
                        deleteBlog={deleteBlog}
                    />
                );
            })}
            <Notification {...msgObj} />
        </div>
    );
};

export default BlogApp;
