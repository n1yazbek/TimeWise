import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import notes from "../assets/data";
=======
// import notes from "../assets/data";
>>>>>>> 70b7ab2 (not working)
import ListItem from "../components/ListItem";

const NotesListPage = () => {
  let [notes, setNotes] = useState([]);
<<<<<<< HEAD

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("http://localhost:8000/notes");
    let data = await response.json();
    // console.log("data", data);
    setNotes(data);
  };

=======
>>>>>>> 70b7ab2 (not working)
  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NotesListPage;
