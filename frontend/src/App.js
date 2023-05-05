import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NoteList from "./pages/NoteListPage";
import TodoList from "./pages/TodoList";
import "./App.css";
import NoteListPage from "./pages/NoteListPage";
import NotePage from "./pages/NotePage";
import Pomodoro from "./components/Pomodoro";
import SoundCloudPlayer from "./components/musicPlayer";

function App() {
  return (
    <div className="container dark">
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" exact element={<NoteListPage />} />
          <Route path="/note/:id" element={<NotePage />} />
          <Route path="/todoList" element={<TodoList />} />
        </Routes>
      </div>
      
      <div className="App">
      <div className="timer-container">
        <Pomodoro />
      </div>
      <div className="music-player-container">
        <SoundCloudPlayer />
      </div>
      <div className="notes-list-container">
        <NoteListPage />
      </div>
    </div>

    </div>
  );
}

export default App;
