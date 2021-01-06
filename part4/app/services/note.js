const jwt = require('jsonwebtoken');
const Note = require('../models/note');
const User = require('../models/user');
const logger = require('../utils/logger');

const getAllNotes = async (req, res) => {
    const notes = await Note.find({}).populate('user', {
        username: 1,
        name: 1,
    });
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
const deleteNote = async (req, res) => {
    await Note.findByIdAndRemove(req.params.id);
    res.status(204).end();
};
const createNote = async (req, res, next) => {
    const body = req.body;
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing',
        });
    }
    const token = req.token;
    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log({ decodedToken });
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        user: user._id,
    });
    try {
        const savedNote = await note.save();
        user.notes = user.notes.concat(savedNote._id);
        await user.save();

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

module.exports = {
    getAllNotes,
    getNote,
    deleteNote,
    createNote,
    updateNote,
};
