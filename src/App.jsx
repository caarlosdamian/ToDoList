import { useState, useRef, useEffect } from "react";
import swal from "sweetalert";
import { Item } from "./components/item/Item";
import "./App.css";

function App() {
  const [todoList, settodoList] = useState(
    JSON.parse(localStorage.getItem("key")) || []
  );
  const [currentTask, setcurrentTask] = useState("");
  const inputTask = useRef(null);

  useEffect(() => {
    localStorage.setItem("key", JSON.stringify(todoList));
  }, [todoList]);

  const addTask = () => {
    if (currentTask === "") {
      swal("Item can’t be empty", {
        icon: "warning",
      });
    } else {
      settodoList([...todoList, { task: currentTask, completed: false }]);
      localStorage.setItem(
        "key",
        JSON.stringify([...todoList, { task: currentTask, completed: false }])
      );
      inputTask.current.value = "";
      setcurrentTask("");
    }
  };

  const deleteTask = (taskToDelete) => {
    settodoList(
      todoList.filter((val) => {
        return val.task !== taskToDelete;
      })
    );
  };

  const completeTask = (taskToComplete) => {
    settodoList(
      todoList.map((val) => {
        return val.task === taskToComplete
          ? { task: taskToComplete, completed: true }
          : { task: val.task, completed: val.completed ? true : false };
      })
    );
  };

  const resetTodo = () => {
    settodoList([]);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="app-header">Shopping List 🐈‍⬛</h1>
        <div className="app-form">
          <input
            required
            className="app-input"
            ref={inputTask}
            type="text"
            placeholder="Add Item...🐈"
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                event.preventDefault();
                addTask();
              }
            }}
            onChange={(event) => {
              setcurrentTask(event.target.value);
            }}
          />
          <div className="app-controls">
            <button
              className="app-button success"
              variant="outline-info"
              onClick={addTask}
              style={{ minWidth: todoList.length === 0 && "100%" }}
            >
              Add Item
            </button>
            {todoList.length !== 0 && (
              <button
                className="app-button danger"
                variant="outline-info"
                onClick={resetTodo}
              >
                Reset
              </button>
            )}
          </div>
        </div>
        <hr></hr>
        {todoList.map((val, key) => {
          return (
            <Item
              key={`${val.task}-${key}`}
              item={val}
              completeTask={completeTask}
              deleteTask={deleteTask}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
