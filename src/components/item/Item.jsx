import React from "react";
import Check from "../../assets/check.png";
import Delete from "../../assets/delete.png";
import "./Item.css";

export const Item = ({ item, completeTask, deleteTask }) => {
  const { task, completed } = item;
  return (
    <div className="item">
      <h3 className={`item-title ${completed ? "completed" : ""}`}>{task}</h3>
      <div className="item-icons">
        {!completed && (
          <img
            className="icon"
            alt="check"
            src={Check}
            onClick={() => completeTask(task)}
          />
        )}
        <img
          className="icon"
          alt="delete"
          src={Delete}
          onClick={() => deleteTask(task)}
        ></img>
      </div>
    </div>
  );
};
