import { useState } from "react";
import "../styles/style.css";

export default function User(props) {
  const [heart, setHeart] = useState("far fa-heart");
  const [color, setColor] = useState("black");

  function like() {
    setHeart(heart === "far fa-heart" ? "fa fa-heart" : "far fa-heart");
    setColor(color === "black" ? "rgba(255, 135, 135, 0.7)" : "black");
  }

  return (
    <div className="list-element">
      <img src={props.image} width="40px" />
      <div className="first" style={props.style}>
        {props.username}
        <i onClick={like} className={heart} style={{ color }}></i>
      </div>
      <div className="second">Content Creator</div>
    </div>
  );
}
