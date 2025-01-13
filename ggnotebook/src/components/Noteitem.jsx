import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import Editmodal from './EditModal';

function Noteitem() {
    const context = useContext(NoteContext);
    const { notes, deleteNote, getNotes } = context;

    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        getNotes();
    }, [getNotes]);

    const handleEditClick = (note) => {
        setSelectedNote(note);
    };

    if (!notes) {
        return <div>Loading...</div>;
    }

    return (
        <div className="row">
            {notes.length > 0 ? (
                notes.map((note) => (
                    <div className="col-lg-3 col-md-4 col-xs-12 mb-3" key={note._id}>
                        <div className="card noteitem-card">
                            <div className="card-body">
                                <div className="edit-icons">
                                    <i className="icons-to-edit fas fa-edit mx-2" data-bs-toggle="modal" data-bs-target="#editModalNote1" onClick={() => handleEditClick(note)}></i>
                                    <i className="icons-to-delete fas fa-trash-alt mx-2" onClick={() => deleteNote(note._id)}></i>
                                </div>
                                <h5 className="card-title">{note.title}</h5>
                                <p className="card-text">{note.description}</p>
                                <small className="d-block text-muted text-end m-0">{new Date(note.date).toLocaleDateString()}</small>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-12">No notes available.</div>
            )}
            {<Editmodal note={selectedNote} />}
        </div>
    );
}

export default Noteitem;