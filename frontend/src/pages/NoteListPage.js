import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

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
    let response = await fetch("http://127.0.0.1:8000/api/notes/"); // API is changed lready
    let data = await response.json();
    setNotes(data);
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>

        <p className="notes-count">{notes.length}</p>
      </div>
      <div>
        <h1>My SoundCloud Playlist</h1>
        {/* <SoundCloudPlayer playlistId="1523959897" width="100%" height="450" /> */}
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
