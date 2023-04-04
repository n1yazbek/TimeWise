import React from "react";
import { useParams } from "react-router-dom";

import notes from "../assets/data";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = (props) => {
  let { id } = useParams();
  // console.log("params:", id);

  let note = notes.find((note) => note.id === Number(id)); //Number() to ensure that the id is numeric

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft />
          </Link>
        </h3>
      </div>
      <p>{note?.body}</p>
    </div>
  );
};

export default NotePage;
