import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NoteList from "./pages/NoteListPage";
import TodoList from "./pages/TodoList";
import "./App.css";
import NoteListPage from "./pages/NoteListPage";
import NotePage from "./pages/NotePage";

import Dashboard from "./pages/Dashboard";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  return (
    <div className="container dark">
      <div className="app">
        <Header />
        <Routes>
          <Route path="/notes" exact element={<NoteListPage />} />
          <Route path="/note/:id" element={<NotePage />} />
          <Route path="/note/create" element={<NotePage />} />
          <Route path="/todoList" element={<TodoList />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/player" element={<MusicPlayer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
