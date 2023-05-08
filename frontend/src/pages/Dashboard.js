import React from "react";
import Pomodoro from "../components/Pomodoro";
import SoundCloudPlayer from "../components/musicPlayer";
import NotesListPage from "./NoteListPage";
function Dashboard() {
  return (
    <div className="App">
      <div className="timer-container">
        <Pomodoro />
      </div>
      <div className="music-player-container">
        <SoundCloudPlayer />
      </div>
      <div className="notes-list-container">
        <NotesListPage />
      </div>
    </div>
  );
}

export default Dashboard;
