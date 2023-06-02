import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { API_URL } from "../constants";

const NotePage = ({}) => {
  const { id } = useParams();

  const [note, setNote] = useState(null);

  const navigate = useNavigate();

  // let note = notes.find((note) => note.id === Number(id)); //Number() to ensure that the id is numeric
  useEffect(() => {
    getNote(id);
  }, [id]);

  const getNote = (noteId) => {
    if (!noteId) {
      return;
    }
    fetch(`${API_URL}/api/notes/${noteId}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch notes");
      })
      .then((data) => {
        setNote(data);
      })
      .catch((error) => {
        console.log("Failed to fetch notes:", error);
      });
  };

  const createNote = () => {
    console.log("Creating note:", note);
    fetch(`${API_URL}/api/notes/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(note),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to create note");
      })
      .then((data) => {})
      .catch((error) => {
        console.log("Failed to create note:", error);
      });
  };

  const updateNote = () => {
    fetch(`${API_URL}/api/notes/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(note),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to update note");
      })
      .then((data) => {})
      .catch((error) => {
        console.log("Failed to update note:", error);
      });
  };

  const deleteNote = () => {
    fetch(`${API_URL}/api/notes/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status !== 204) {
          throw new Error("Failed to delete note");
        }
      })
      .catch((error) => {
        console.log("Failed to delete note:", error);
      });
    navigate("/");
  };

  let handleSubmit = () => {
    if (!note.title && note.content) {
      note.title = note.content.slice(0, 10) + "...";
    }
    if (id && !note.content) {
      console.log("deleting", id, note);
      deleteNote();
    } else if (id) {
      console.log("updating");
      updateNote();
    } else if (!id && note.content) {
      console.log("creating");
      createNote();
    }
    // if (id !== "new" && note.body === "") {
    //   deleteNote();
    // } else if (id !== "new") {
    //   updateNote();
    // } else if (id === "new" && note !== null) {
    //   createNote();
    // }

    navigate("/");
    // window.location.reload(); //TODO: fix history.push("/") not reloading the page. Replace window.location.reload()
  };

  let goBackHandler = () => {
    //TODO: handle pop up message whether to save note or not
    let save = window.confirm("Are you sure to execute this action?");
    if (save) {
      updateNote();
    }
    navigate("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {id ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, content: e.target.value });
        }}
        placeholder="Edit note"
        value={note?.content}
      ></textarea>
    </div>
  );
};

export default NotePage;
