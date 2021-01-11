import React, { useState, useEffect } from 'react';
import Notification, {
    NotificationType,
} from '../../components/Notification/index';
import api from '../../services/notes';
import Note from './NoteItem';
import NoteForm from './NoteForm';

const NoteApp = () => {
    const [notes, setNotes] = useState([]);
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

    const addNote = async (data) => {
        try {
            const res = await api.create(data);
            console.log({ res });
            setNotes(notes.concat(res));
        } catch (error) {
            console.log(error);
        }
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
            <NoteForm createNote={addNote} />
        </div>
    );
};

export default NoteApp;
