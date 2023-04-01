import React from "react";
import { useParams } from "react-router-dom";

const NotePage = (props) => {
  let { id } = useParams();
  console.log("params:", params);
  return (
    <div>
      <h1>This is a single Note Page</h1>
    </div>
  );
};

export default NotePage;
