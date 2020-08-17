const notesRouter = require('express').Router();
const Note = require('../models/note');
const logger = require('../utils/logger');

const getAllNotes = (req, res) => {
    Note.find({}).then((notes) => {
        logger.info('--- get all notes, length', notes.length);
        res.json(notes);
    });
};
const getNote = (req, res, next) => {
    Note.findById(req.params.id)
        .then((note) => {
            if (note) {
                res.json(note);
            } else {
                res.status(404).end();
            }
        })
        .catch((error) => next(error));
};
const deleteNote = (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch((error) => next(error));
};
const createNote = (req, res, next) => {
    const body = req.body;
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing',
        });
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    });
    note.save()
        .then((savedNote) => {
            res.json(savedNote);
        })
        .catch((error) => next(error));
};
const updateNote = (req, res, next) => {
    const body = req.body;

    const note = {
        ...body,
    };

    Note.findByIdAndUpdate(req.params.id, note, { new: true })
        .then((updatedNote) => {
            res.json(updatedNote);
        })
        .catch((error) => next(error));
};

notesRouter.get('/', getAllNotes);
notesRouter.get('/:id', getNote);
notesRouter.delete('/:id', deleteNote);
notesRouter.put('/:id', updateNote);
notesRouter.post('/', createNote);

module.exports = notesRouter;
