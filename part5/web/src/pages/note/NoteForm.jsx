import React, { useState } from 'react';

const NoteForm = (props) => {
    const { createNote } = props;

    const [newNote, setNewNote] = useState('');

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    const addNote = (event) => {
        event.preventDefault();
        createNote({
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        });
        setNewNote('');
    };

    return (
        <form onSubmit={addNote}>
            <input
                value={newNote}
                placeholder="a new note..."
                onChange={handleNoteChange}
            />
            <button type="submit">save</button>
        </form>
    );
};

export default NoteForm;
