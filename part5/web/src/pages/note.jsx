import React, { useState, useEffect } from 'react';
import Note from '../components/Note';
import api from '../services/notes';
import Notification, { NotificationType } from '../components/Notification';

const NoteApp = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [errMsg, setErrMsg] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const res = await api.getAll();
            setNotes(res);
        };
        getData();
        return () => {};
    }, []);

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        };

        api.create(noteObject).then((response) => {
            console.log(response);
            setNotes(notes.concat(response.data));
            setNewNote('');
        });
    };
    const toggleImportanceOf = (id) => {
        return () => {
            console.log(`importance of ${id} needs to be toggled`);

            const note = notes.find((n) => n.id === id);
            const changedNote = { ...note, important: !note.important };

            api.update(id, changedNote)
                .then((response) => {
                    setNotes(
                        notes.map((note) =>
                            note.id !== id ? note : response.data
                        )
                    );
                })
                .catch((error) => {
                    setErrMsg(
                        `Note "${note.content}" was already removed from server`
                    );
                    setTimeout(() => {
                        setErrMsg(null);
                    }, 5000);
                    setNotes(notes.filter((n) => n.id !== id));
                });
        };
    };

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };
    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important);

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errMsg} type={NotificationType.Error} />
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all'}
            </button>
            <ul>
                {notesToShow.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={toggleImportanceOf(note.id)}
                    />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    placeholder="a new note..."
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    );
};

export default NoteApp;
