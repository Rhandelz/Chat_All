import React, { Suspense, useContext, useEffect, useRef } from "react";
import { auth, db } from "../config/firebase.config";

import {
  collection,
  onSnapshot,
  setDoc,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
  FieldValue,
} from "firebase/firestore";
import List from "./List";
import { AuthContext } from "../context/AuthContext";
import { useLoaderData, useNavigate } from "react-router-dom";

export function loader() {
  const currentLogin = JSON.parse(localStorage.getItem("user"));

  return currentLogin;
}

const Chat = () => {
  const [data, setData] = React.useState([]);
  const [chat, setChat] = React.useState("");
  const [load, setLoad] = React.useState(false);

  const { currentLogin } = React.useContext(AuthContext);

  const anchor = useRef();

  function reload() {
    currentLogin ? null : nav("/login");
  }

  reload();

  const pay = {
    message: chat,
    name: auth?.currentUser?.displayName,
    uid: auth?.currentUser?.uid,
    createdAt: serverTimestamp(),
    url: auth?.currentUser?.photoURL,
    date: Date.now(),
  };

  const que = query(collection(db, "chat"), orderBy("createdAt", "ascending"));

  React.useEffect(() => {
    onSnapshot(
      query(collection(db, "chat"), orderBy("createdAt", "asc")),
      (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );

    setLoad((prev) => !prev);
  }, []);

  /* console.log(data); */

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "chat", id));
  };

  const listData = data.map((prev) => {
    return (
      <List
        key={prev.id}
        id={prev.uid}
        name={prev.name}
        message={prev.message}
        src={prev.url}
        time={prev.date}
        click={() => {
          deleteNote(prev.id);
        }}
      />
    );
  });

  /*  console.log(auth?.currentUser?.displayName); */

  const handleSubmi = async (e) => {
    e.preventDefault();

    if (chat) {
      await addDoc(collection(db, "chat"), pay);
      setChat("");
      anchor.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const intervalRef = useRef(null);
  const timeRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      timeRef.current.innerHTML = currentTime;
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const anchors = () => {
    anchor.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat">
      <span className="arrow material-symbols-outlined" onClick={anchors}>
        expand_more
      </span>
      <div className="top">
        <h2 ref={timeRef}></h2>
        <h4>Enjoy Your Chat , Be aware on your chat </h4>
      </div>

      <ul className="container">
        {listData}
        <div ref={anchor}></div>
      </ul>
      <form onSubmit={handleSubmi}>
        <input
          type="text"
          id="message"
          name="message"
          value={chat}
          onChange={(e) => {
            setChat(e.target.value);
          }}
        />
        <button>
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>
    </div>
  );
};

export default Chat;
