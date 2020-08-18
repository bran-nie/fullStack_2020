const notesRouter = require('express').Router();
const Note = require('../models/note');
const logger = require('../utils/logger');

const getAllNotes = async (req, res) => {
    const notes = await Note.find({});
    logger.info('--- get all notes, length', notes.length);
    res.json(notes);
};
const getNote = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note) {
            res.json(note);
        } else {
            res.status(404).end();
        }
    } catch (error) {
        next(error);
    }
};
const deleteNote = async (req, res, next) => {
    try {
        await Note.findByIdAndRemove(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};
const createNote = async (req, res, next) => {
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
    try {
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        next(error);
    }
};
const updateNote = async (req, res, next) => {
    const body = req.body;

    const note = {
        ...body,
    };

    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, {
            new: true,
        });
        res.json(updatedNote);
    } catch (error) {
        next(error);
    }
};

notesRouter.get('/', getAllNotes);
notesRouter.get('/:id', getNote);
notesRouter.delete('/:id', deleteNote);
notesRouter.put('/:id', updateNote);
notesRouter.post('/', createNote);

module.exports = notesRouter;
