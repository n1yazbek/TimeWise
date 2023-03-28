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
import NoteList from "./pages/NoteList";
import TodoList from "./pages/TodoList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/">{NoteList}</Route>
          <Route path="/todo">{TodoList}</Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
