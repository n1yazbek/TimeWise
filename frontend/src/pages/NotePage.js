import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";

import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  let { id } = useParams();

  let [note, setNote] = useState(null);

  const history = createBrowserHistory();

  console.log(id);
  // let id = 1;
  // console.log("params:", id);

  // let note = notes.find((note) => note.id === Number(id)); //Number() to ensure that the id is numeric
  useEffect(() => {
    if (id === "new") {
      history.push("/");
    } else {
      getNote();
    }
  }, [id]);

  let getNote = async () => {
    if (note.id === "new") return;
    let response = await fetch(`http://localhost:8000/notes/${id}`, {});
    console.log(response.status);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    await fetch(`http://localhost:8000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  let updateNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  let deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    history.push("/");
  };

  // let handleSubmit = () => {
  //   console.log("handlingSubmit");
  //   console.log(note);
  //   if (note !== null && note.id !== "new" && !note.body) {
  //     deleteNote();
  //   } else if (note.id !== null && note.id !== "new") {
  //     updateNote();
  //   } else if (note !== null && note.id === "new") {
  //     createNote();
  //   }
  //   history.push("/");
  // };

  let handleSubmit = () => {
    if (id != "new" && !note.body) {
      deleteNote();
    } else if (id != "new") {
      updateNote();
    } else if (id === "new" && note !== null) {
      createNote();
    }

    history.push("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
