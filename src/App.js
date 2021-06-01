import "./App.css";
import { useState } from "react";

function App() {
  const [todoList, settodoList] = useState([""]);
  const [currentTask, setcurrentTask] = useState("");

  const addTask = () => {
    settodoList([...todoList, currentTask]);
    console.log(todoList)
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Task..."
          onChange={(event) => {
            setcurrentTask(event.target.value);
          }}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <hr></hr>
      <ul>
        {todoList.map((val,key)=>{
          return <li key={key}>{val}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
