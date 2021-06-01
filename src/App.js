import "./App.css";
import { useState, useRef } from "react";
import { FcCheckmark,FcCancel } from "react-icons/fc";

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
      <h1>Shopping List</h1>
      <div>
        <input
          ref={inputTask}
          type="text"
          placeholder="Item..."
          onKeyDown={(event) => {
            if (event.keyCode === 13) addTask();
          }}
          onChange={(event) => {
            setcurrentTask(event.target.value);
          }}
        />
        <button onClick={addTask}>Add Item</button>
      </div>
      <hr></hr>
      <ul>
        {todoList.map((val, key) => {
          return (
            <div className="task">
              <li key={key}>{val.task}</li>
              <FcCheckmark onClick={() => completeTask(val.task)}/>
              <FcCancel onClick={() => deleteTask(val.task)}/>
              {val.completed ? (
                <p>Completed</p>
              ) : (
                <p>Pending</p>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
