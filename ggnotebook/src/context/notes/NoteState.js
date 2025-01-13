import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";

    // Get all notes 
    const [notes, setNotes] = useState([]);
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwNmM2ZmFhNGEwM2IwN2M2MzU3YjQwIn0sImlhdCI6MTcyODkyNzc2Mn0.mdyq7dqwuTfErWkmsIPww1xNImqmhS7Gec3zaaKckYw'
            },
        });
        const json = await response.json();
        setNotes(json);
    }   
    // Delete note 
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwNmM2ZmFhNGEwM2IwN2M2MzU3YjQwIn0sImlhdCI6MTcyODkyNzc2Mn0.mdyq7dqwuTfErWkmsIPww1xNImqmhS7Gec3zaaKckYw'
            },
        });
        const json = await response.json();
        console.log(json);
    }
    // Update/Edit note 
    const updateNote = async (id, title, description, tag) => {
        // API call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwNmM2ZmFhNGEwM2IwN2M2MzU3YjQwIn0sImlhdCI6MTcyODU2MjU3N30._8r9a562vPjsdiXBKJTGqwPS8IKj6dTb_vYAxH2udsg'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);
    }
    // Add note 
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwNmM2ZmFhNGEwM2IwN2M2MzU3YjQwIn0sImlhdCI6MTcyODU2MjU3N30._8r9a562vPjsdiXBKJTGqwPS8IKj6dTb_vYAxH2udsg' // Get token from localStorage
                },
                body: JSON.stringify({ title, description, tag })
            });

            const newNote = await response.json();
            setNotes([...notes, newNote]);
        } catch (error) {
            console.error('Error adding note:', error);
        }
    }
    

    return (
        <NoteContext.Provider value={{ notes, deleteNote, updateNote, addNote, getNotes }} >
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteState;
