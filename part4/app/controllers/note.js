const notesRouter = require('express').Router();
const noteServices = require('../services/note');

notesRouter.get('/', noteServices.getAllNotes);
notesRouter.get('/:id', noteServices.getNote);
notesRouter.delete('/:id', noteServices.deleteNote);
notesRouter.put('/:id', noteServices.updateNote);
notesRouter.post('/', noteServices.createNote);

module.exports = notesRouter;
