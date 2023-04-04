// import React from 'react';
// import Header from './Header';
// import NoteList from './NoteList';
// import TodoList from './TodoList';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>Hi World</p>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NoteList from "./pages/NoteListPage";
import TodoList from "./pages/TodoList";
import "./App.css";
import NoteListPage from "./pages/NoteListPage";
import NotePage from "./pages/NotePage";

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
    </div>
  );
}

export default App;
