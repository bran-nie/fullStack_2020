// const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');

const notesRouter = require('./controllers/notes');
const personsRouter = require('./controllers/phonebook');
const blogRouter = require('./controllers/blog');

const middleware = require('./utils/middleware');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);
app.use('/api/persons', personsRouter);
app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
