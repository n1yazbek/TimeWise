import React from "react";
// import Notes from './Notes';
import Pomodoro from "../components/Pomodoro3";
// import BackgroundMusic from './BackgroundMusic';
import "./Dashboard.css"; // Import the CSS file for styling
import NotesListPage from "./NoteListPage";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Personal Tool Dashboard</h1>
      <div className="dashboard-grid">
        <div className="notes">{<NotesListPage />}</div>
        <div className="pomodoro">
          <Pomodoro />
        </div>
        <div className="background-music">
          {/* <BackgroundMusic /> */}
          askjhdsakjhaskjd
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
