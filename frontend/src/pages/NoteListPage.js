import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";
import PomodoroTimer from "../components/Pomodoro";

const NotesListPage = () => {
  let [notes, setNotes] = useState([]);
  let [soundCloudPlayer, setSoundCloudPlayer] = useState("");

  useEffect(() => {
    getNotes();
    setSoundCloudPlayer(
      '<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/PLAYLIST_ID&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>'
    );
  }, []);

  let getNotes = async () => {
    let response = await fetch("http://localhost:8000/notes");
    let data = await response.json();
    setNotes(data);
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <div
          className="soundcloud-player"
          dangerouslySetInnerHTML={{ __html: soundCloudPlayer }}
        ></div>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      {/* <PomodoroTimer />
      <AddButton /> */}
    </div>
  );
};

export default NotesListPage;
