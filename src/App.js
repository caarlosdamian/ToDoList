import "./App.css";
import { useState, useRef } from "react";

function App() {
  const [todoList, settodoList] = useState([]);
  const [currentTask, setcurrentTask] = useState("");
  const inputTask = useRef(null);

  const addTask = () => {
    settodoList([...todoList, { task: currentTask, completed: false }]);
    inputTask.current.value = "";
    setcurrentTask("");
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

  return (
    <div className="App">
      <h1>To Do List</h1>
      <div>
        <input
          ref={inputTask}
          type="text"
          placeholder="Task..."
          onKeyDown={(event) => {
            if (event.keyCode === 13) addTask();
          }}
          onChange={(event) => {
            setcurrentTask(event.target.value);
          }}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <hr></hr>
      <ul>
        {todoList.map((val, key) => {
          return (
            <div className="task">
              <li key={key}>{val.task}</li>
              <button onClick={() => completeTask(val.task)}>Completed</button>
              <button onClick={() => deleteTask(val.task)}>X</button>
              {val.completed ? (
                <h1>Task Completed</h1>
              ) : (
                <h1>task not completed</h1>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
