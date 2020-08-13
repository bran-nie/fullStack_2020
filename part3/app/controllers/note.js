const data = require('./note.json')['data'];
let notes = data;

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    return maxId + 1;
};

const getAllNotes = (req, res) => {
    res.json(notes);
};
const getNote = (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find((note) => note.id === id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
};
const deleteNote = (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter((note) => note.id !== id);

    response.status(204).end();
};
const createNote = (req, res) => {
    const body = req.body;
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing',
        });
    }
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    };
    notes = notes.concat(note);

    res.json(note);
};
const updateNote = (req, res) => {
    const body = req.body;
    console.log(body);
    // if (!body.important) {
    //     return res.status(400).json({
    //         error: 'important missing',
    //     });
    // }
    const note = {
        ...body,
        date: new Date(),
    };

    notes = notes.map((n) => (n.id === note.id ? note : n));

    res.json(note);
};

const controller = () => {
    return {
        getAllNotes,
        getNote,
        deleteNote,
        updateNote,
        createNote,
    };
};

module.exports = controller;
