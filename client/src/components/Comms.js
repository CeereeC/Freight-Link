import "../App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import "./Component.css";

const socket = io.connect("/");

function Comms() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="ChatBox">
      <div>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="Name"
        ></input>
      </div>

      <div>
        <input
          type="text"
          placeholder="Room ID"
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        ></input>
      </div>

      <button onClick={joinRoom}>Join a Room</button>
      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default Comms;
