import React, { useMemo, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import './App.css'

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keyword, setKeyword] = useState("");
  const [notes, setNotes] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("name");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });


  useEffect(() => {
    // storing input name
    localStorage.setItem("name", JSON.stringify(notes));
  }, [notes]);



  const add = (e) => {
    e.preventDefault();
    setNotes((notes) => [
      ...notes,
      {
        id: uuidv4(),
        title,
        description
      }
    ]);
    setTitle("");
    setDescription("");
  };

  const remove = (index) => {
    setNotes((notes) => notes.filter((_, i) => i !== index));
  };

  const filteredNotes = useMemo(() => {
    if (!keyword) {
      return notes;
    }
    return notes.filter(({ title, description }) => {
      return title.includes(keyword) || description.includes(keyword);
    });
  }, [keyword, notes]);

  return (
    <div className="main">
      <h1>Notes App</h1>
      <div className="header">
        <div className="notesinput">
          <form onSubmit={add}>
            <h3>Add Note</h3>
            <div>
              <label>Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button type="submit">Add</button>
          </form>
        </div >
        <br />
        <form className="search">
          <h3>Search</h3>
          <div>
            <label>Keyword</label><br />
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          </div>
        </form>
      </div><br /><br />
      <h1>Notes</h1>
      {filteredNotes && filteredNotes.map((note, index) => {
        return (

          <div className="noteslist" key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            <button type="button" onClick={() => remove(index)}>
              remove
            </button>
          </div>



        );
      })}
    </div>
  );
}