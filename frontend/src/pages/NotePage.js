import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = (props) => {
  let [note, setNote] = useState(null);

  let { id } = useParams();
  console.log(id);
  // let id = 1;
  // console.log("params:", id);

  // let note = notes.find((note) => note.id === Number(id)); //Number() to ensure that the id is numeric

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    let response = await fetch`(http://localhost:8000/notes/${id})`;

    let data = await response.json();
    setNote(data);

    return (
      <div className="note">
        <div className="note-header">
          <h3>
            <Link to="/">
              <ArrowLeft />
            </Link>
          </h3>
        </div>
        {/* <p>{note?.body}</p> */}
        <textarea value={note?.body}></textarea>
      </div>
    );
  };
};

export default NotePage;
