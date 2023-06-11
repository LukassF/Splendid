import { useState, useRef } from "react";
import "../../styles/style.css";
import IndividualComment from "./individualComment";

export default function Comments(props) {
  const commentsRef = useRef();
  const commentInput = useRef();
  const [opinion, setOpinion] = useState("");
  const [list, setList] = useState([]);
  const [commentQuantity, setCommentQuantity] = useState(
    Math.floor(Math.random() * 3000)
  );

  function addComment(e) {
    e.preventDefault();
    const newComment = {
      id:
        commentQuantity > 999
          ? `${commentQuantity.toString()[0]},${commentQuantity.toString()[1]}k`
          : commentQuantity,
      key: Math.random(),
      content: opinion,
    };
    setList([...list, newComment]);
    commentInput.current.value = "";
    setOpinion("");
    setCommentQuantity(Math.floor(Math.random() * 3000));
  }
  return (
    <article id="comment-section" ref={commentsRef}>
      <div className="comment-section-header">
        {props.comment}K comments
        <i onClick={props.close} className="fa fa-close"></i>
      </div>
      <div className="comment-section-content">
        {list.length !== 0 &&
          list.map((comment) => {
            return (
              <IndividualComment
                commentQuantity={comment.id}
                comment={comment.content}
                key={comment.id}
              />
            );
          })}
      </div>
      <form id="comment-input">
        <input
          ref={commentInput}
          type="text"
          placeholder="Comment what you've seen"
          onChange={(e) => setOpinion(e.target.value)}
        ></input>
        <button onClick={(e) => addComment(e)}>
          <i className="far fa-message"></i>
        </button>
      </form>
    </article>
  );
}
