import "./App.css";
import { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import swal from "sweetalert";
import Check from "./assets/check.png";
import Delete from "./assets/delete.png";

function App() {
  const [todoList, settodoList] = useState(
    JSON.parse(localStorage.getItem("key")) || []
  );
  const [currentTask, setcurrentTask] = useState("");
  const [hide_table, setHideTable] = useState(true);
  const inputTask = useRef(null);

  useEffect(() => {
    localStorage.setItem("key", JSON.stringify(todoList));
    setHideTable(false);
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
      setHideTable(false);
    }
  };

  const deleteTask = (taskToDelete) => {
    settodoList(
      todoList.filter((val) => {
        return val.task !== taskToDelete;
      })
    );
    if (todoList === []) {
      setHideTable(false);
    }
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
      <h1 className="title is-1">Shopping List</h1>
      <div>
        <Container className="align-items-center">
          <Form>
            <Row className="justify-content-md-center">
              <Col xs="auto" className="my-1">
                <Form.Control
                  required
                  ref={inputTask}
                  type="text"
                  placeholder="Item..."
                  onKeyDown={(event) => {
                    if (event.keyCode === 13) {
                      event.preventDefault();
                      addTask();
                    }
                  }}
                  onChange={(event) => {
                    setcurrentTask(event.target.value);
                  }}
                ></Form.Control>
              </Col>
              <Col xs="auto" className="my-1">
                <Button
                  className="my-1"
                  variant="outline-info"
                  onClick={addTask}
                >
                  Add Item
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <hr></hr>
      <Row className="justify-content-md-center">
        <Table
          responsive="sm"
          bordered
          hover
          className={hide_table ? "hide" : ""}
        >
          <tbody>
            {todoList.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.task}</td>
                  <td>
                    <div className="icons">
                      <img
                      alt="check"
                        src={Check}
                        onClick={() => completeTask(val.task)}
                      ></img>
                      <img
                        alt="delete"
                        src={Delete}
                        onClick={() => deleteTask(val.task)}
                      ></img>
                    </div>
                  </td>
                  <td>{val.completed ? <p>Completed</p> : <p>Pending</p>}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default App;
