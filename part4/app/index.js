require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const notesController = require('./controllers/note')();
const phonebookController = require('./controllers/phonebook')();

const logger = morgan(function (tokens, req, res) {
    let body = '';
    if (req.method === 'POST') {
        body = JSON.stringify(req.body);
    }
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
        body,
    ].join(' ');
});

const app = express();

app.use(express.static('build'));

app.use(express.json());
app.use(logger);
app.use(cors());

const requestLogger = (req, res, next) => {
    // console.log('---');
    // console.log('Method:', req.method);
    // console.log('Path:  ', req.path);
    // console.log('Body:  ', req.body);
    // console.log('---');
    next();
};

app.use(requestLogger);

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', notesController.getAllNotes);
app.get('/api/notes/:id', notesController.getNote);
app.delete('/api/notes/:id', notesController.deleteNote);
app.put('/api/notes/:id', notesController.updateNote);
app.post('/api/notes', notesController.createNote);

app.get('/phonebook/info', phonebookController.getInfo);
app.get('/api/persons', phonebookController.getAllPersons);
app.get('/api/persons/:id', phonebookController.getPerson);
app.delete('/api/persons/:id', phonebookController.deletePerson);
app.put('/api/persons/:id', phonebookController.updatePerson);
app.post('/api/persons', phonebookController.createPerson);

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.error('--- ', error.message);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }

    next(error);
};
app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
