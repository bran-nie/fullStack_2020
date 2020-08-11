const express = require('express');
const {
    createNote,
    deleteNote,
    getNote,
    getAllNotes,
} = require('./controller/note');
const {
    getAllPersons,
    getInfo,
    getPerson,
    deletePerson,
    createPerson,
} = require('./controller/phonebook');
const app = express();

app.use(express.json());

const requestLogger = (request, response, next) => {
    console.log('---');
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
};

app.use(requestLogger);

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', getAllNotes);
app.get('/api/notes/:id', getNote);
app.delete('/api/notes/:id', deleteNote);
app.post('/api/notes', createNote);

app.get('/phonebook/info', getInfo);
app.get('/api/persons', getAllPersons);
app.get('/api/persons/:id', getPerson);
app.delete('/api/persons/:id', deletePerson);
app.post('/api/persons', createPerson);

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
