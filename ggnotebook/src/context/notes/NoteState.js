import NoteContext from "./noteContext";
import { useState, useEffect  } from "react";

const NoteState = (props) => {
    // const host = "http://localhost:5000";
    const host = "https://ggnotebook-backend.vercel.app";
    const authToken = localStorage.getItem('auth-token'); // Retrieve token from localStorage
    
    const [notes, setNotes] = useState([]);
    
     // Function to fetch notes
     const getNotes = async () => {
        if (!authToken) {
            console.error('No auth token found. Please log in first.');
            return;
        }
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken,
                },
            });
            const json = await response.json();
            setNotes(json);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    // Call getNotes when authToken changes
    useEffect(() => {
        if (authToken) {
            getNotes();
        }
    }, [authToken]);

    // if (!authToken) {
    //     console.error('No auth token found. Please log in first.');
    //     return;
    // }

    // // Get all notes 
    // const [notes, setNotes] = useState([]);
    // const getNotes = async () => {
    //     try{
    //         const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwNmM2ZmFhNGEwM2IwN2M2MzU3YjQwIn0sImlhdCI6MTcyODkyNzc2Mn0.mdyq7dqwuTfErWkmsIPww1xNImqmhS7Gec3zaaKckYw'
    //                 // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4NGVmZDE3Mjg2OTQ2OWNjY2NlY2M5In0sImlhdCI6MTczNzY1MDcxMX0.A73cdeW1FQIAqfDm4eWltRd6HDOmdZWeH9pneIN8mnU'
    //                 'auth-token': authToken,
    //             },
    //         });
    //         const json = await response.json();
    //         setNotes(json);
    //     }
    //     catch (error) {
    //         console.error('Error fetching notes:', error);
    //     }

    // }   

    // Delete note 
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwNmM2ZmFhNGEwM2IwN2M2MzU3YjQwIn0sImlhdCI6MTcyODkyNzc2Mn0.mdyq7dqwuTfErWkmsIPww1xNImqmhS7Gec3zaaKckYw'
                'auth-token': authToken,
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
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwNmM2ZmFhNGEwM2IwN2M2MzU3YjQwIn0sImlhdCI6MTcyODU2MjU3N30._8r9a562vPjsdiXBKJTGqwPS8IKj6dTb_vYAxH2udsg'
               'auth-token': authToken,
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
                    // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwNmM2ZmFhNGEwM2IwN2M2MzU3YjQwIn0sImlhdCI6MTcyODU2MjU3N30._8r9a562vPjsdiXBKJTGqwPS8IKj6dTb_vYAxH2udsg' // Get token from localStorage
                    'auth-token': authToken,
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
