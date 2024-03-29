import React from "react";
import { Link } from "react-router-dom";

let getTitle = (note) => {
  const title = note.title;

  if (title.length > 45) {
    return title.slice(0, 45);
  }
  return title;
};

let getDate = (note) => {
  return new Date(note.updated_at).toLocaleDateString();
};

let getContent = (note) => {
  let title = getTitle(note);
  let content = note.content.replaceAll("\n", " ");
  content = content.replaceAll(title, "");
  if (content.length > 25) {
    return content.slice(0, 25);
  } else {
    return content;
  }
};
const ListItem = ({ note }) => {
  // console.log("PROPS: ", note);
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          <span>{getDate(note)}</span>
          {getContent(note)}
        </p>
      </div>
    </Link>
  );
};

export default ListItem;
