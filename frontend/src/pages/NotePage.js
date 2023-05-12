import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = ({}) => {
  let { id } = useParams();

  let [note, setNote] = useState(null);

  const history = createBrowserHistory();

  // let note = notes.find((note) => note.id === Number(id)); //Number() to ensure that the id is numeric
  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    console.log("note is here: ", note);
    if (id == "new") return;
    let response = await fetch(`http://127.0.0.1:8000/api/notes/${id}/`, {});
    console.log("status is here: ", response.status);
    let data = await response.json();
    setNote(data);
  };

  const createNote = async () => {
    await fetch(`http://127.0.0.1:8000/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  const updateNote = async () => {
    await fetch(`http://127.0.0.1:8000/api/notes/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  const deleteNote = async () => {
    const result = await fetch(`http://127.0.0.1:8000/api/notes/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    history.push("/");
    window.location.reload(); //TODO: fix history.push("/") not reloading the page. Replace window.location.reload()
  };

  let handleSubmit = () => {
    if (id != "new" && !note.body) {
      deleteNote();
    } else if (id != "new") {
      updateNote();
    } else if (id == "new" && note !== null) {
      createNote();
    }

    history.push("/");
    window.location.reload(); //TODO: fix history.push("/") not reloading the page. Replace window.location.reload()
  };

  let goBackHandler = () => {
    //TODO: handle pop up message whether to save note or not
    let save = window.confirm("Are you sure to execute this action?");
    if (save) {
      updateNote();
    }
    history.push("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={goBackHandler} />
          </Link>
        </h3>
        {id != "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        placeholder="Edit note"
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
