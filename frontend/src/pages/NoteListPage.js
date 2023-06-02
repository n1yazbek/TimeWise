import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

import { API_URL } from "../constants";

const NotesListPage = () => {
  let [notes, setNotes] = useState(null);

  useEffect(() => {
    getNotes();
    console.log("====================================");
    console.log("Fetching notes...");
    console.log("====================================");
    getNotes();
  }, []);

  let getNotes = () => {
    fetch(`${API_URL}/api/notes/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch notes");
      })
      .then((data) => {
        setNotes(data);
      });
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>

        <p className="notes-count">{notes?.length}</p>
      </div>
      <div className="notes-list">
        {notes?.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
