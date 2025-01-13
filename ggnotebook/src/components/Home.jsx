import React, { useState, useContext } from 'react';
import NoteItem from './Noteitem';
import NoteContext from '../context/notes/noteContext';

function Home() {
  const context = useContext(NoteContext);

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: ""
  }); 

  const handleChange = (e) => {
    setNote({...note, [e.target.name]:e.target.value});
    // setNote({title: e.target.value, description: e.target.value});
  }

  const handleTagChange = (e) => {
    setNote({...note, tag: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    context.addNote(note.title, note.description , note.tag);
    setNote({title: "", description: "", tag: ""});
    setTimeout(() => {
      e.target.reset();
    }, 200);
    console.log('note added');
  } 

  return (
    <>
      <div className='container-fluid'>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xs-12 my-5">
            <h1>Welcome to GGnoteBook</h1>
          </div>
          <div className="col-lg-12 col-md-12 col-xs-12">
            <form className="row g-2" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="noteTitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="noteTitle" name="title" placeholder="Example input placeholder" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="noteDescription" className="form-label">Note</label>
                <textarea type="text" className="form-control" id="noteDescription" name="description" placeholder="Another input placeholder" rows="6" onChange={handleChange} required/>
              </div>

              <div className="mb-3">
                <label htmlFor="noteTag" className="form-label">Tag</label>
                <select className="form-select" id="noteTag" name="tag" onChange={handleTagChange} value={note.tag}>
                  <option value="" disabled>Select a tag</option>
                  <option value="general">General</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                </select>
              </div>
              <div className="col-lg-12 col-md-12 col-xs-12">
                <button type="submit" className="btn btn-primary" disabled={note.title.length<5 || note.description.length<5}>Send</button>
              </div>
            </form>
          </div>
        </div>

        <div className="row"> 
            <h1 className='text-center my-5'>Your Notes</h1>
            <NoteItem />
        </div>
      </div>
      {/* <EditModal /> */}
    </>


  )
}

export default Home;
