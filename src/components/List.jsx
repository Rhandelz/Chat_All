import React from "react";
import { auth } from "../config/firebase.config";

const List = (props) => {
  const [d, sets] = React.useState(new Date(props.time));

  return (
    <li>
      <span>
        <img src={props.src} alt="" />
      </span>
      <span>
        <h1>{props.name}</h1>
        <h5>{d.toString().slice(0, d.toString().indexOf(":") + 3)}</h5>
        <p>{props.message}</p>
      </span>
      {auth?.currentUser?.uid === props.id ? (
        <span
          className="delete material-symbols-outlined"
          onClick={props.click}
        >
          delete
        </span>
      ) : (
        <></>
      )}
    </li>
  );
};

export default List;
