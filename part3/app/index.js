const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {
    createNote,
    deleteNote,
    getNote,
    getAllNotes,
    updateNote,
} = require('./controllers/note');
const {
    getAllPersons,
    getInfo,
    getPerson,
    deletePerson,
    createPerson,
} = require('./controllers/phonebook');

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

app.get('/api/notes', getAllNotes);
app.get('/api/notes/:id', getNote);
app.delete('/api/notes/:id', deleteNote);
app.put('/api/notes/:id', updateNote);
app.post('/api/notes', createNote);

app.get('/phonebook/info', getInfo);
app.get('/api/persons', getAllPersons);
app.get('/api/persons/:id', getPerson);
app.delete('/api/persons/:id', deletePerson);
app.post('/api/persons', createPerson);

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
