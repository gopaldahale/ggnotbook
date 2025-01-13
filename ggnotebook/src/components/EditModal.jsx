import React, { useState, useContext, useEffect } from 'react';
import NoteContext from '../context/notes/noteContext';

const Editmodal = ({ note }) => {
    const context = useContext(NoteContext);
    const { updateNote } = context;

    const [editedNote, setEditedNote] = useState({ id: "", title: "", description: "", tag: "" });

    useEffect(() => {
        if (note) {
            setEditedNote({
                id: note._id,
                title: note.title,
                description: note.description,
                tag: note.tag || "general"
            });
        }
    }, [note]);

    const handleChange = (e) => {
        setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateNote(editedNote.id, editedNote.title, editedNote.description, editedNote.tag);
        // Close the modal
        document.getElementById('editModalNote1').querySelector('.btn-close').click();
    }

    return (
        <>
            <div className="modal fade" id="editModalNote1" tabindex="-1" aria-labelledby="editModalNote1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit your note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-2" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="noteTitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="noteTitle" name="title" placeholder="Example input placeholder" onChange={handleChange} value={editedNote.title || ""} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="noteDescription" className="form-label">Note</label>
                                    <textarea type="text" className="form-control" id="noteDescription" name="description" placeholder="Another input placeholder" rows="6" onChange={handleChange} value={editedNote.description || ""} required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="noteTag" className="form-label">Tag</label>
                                    <select className="form-select" id="noteTag" name="tag" onChange={handleChange} value={editedNote.tag || ""} >
                                        <option value="" disabled>Select a tag</option>
                                        <option value="general">General</option>
                                        <option value="work">Work</option>
                                        <option value="personal">Personal</option>
                                    </select>
                                </div>
                                <div className="col-lg-12 col-md-12 col-xs-12">
                                    <button type="submit" className="btn btn-primary" disabled={editedNote.title.length<5 ||editedNote.description.length<5} >Update</button>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Editmodal;
