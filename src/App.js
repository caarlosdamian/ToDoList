import "./App.css";
import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { FcCheckmark, FcCancel } from "react-icons/fc";

function App() {
  const [todoList, settodoList] = useState([]);
  const [currentTask, setcurrentTask] = useState("");
  const [hide_table, setHideTable] = useState(false);
  const inputTask = useRef(null);

  const addTask = () => {
    setHideTable(true)
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
      <h1 className="title is-1">Shopping List</h1>
      <div>
        <Container className="align-items-center">
          <Form >
            <Row className="justify-content-md-center">
              <Col xs="auto" className="my-1">
                <Form.Control
                  required
                  ref={inputTask}
                  type="text"
                  placeholder="Item..."
                  onKeyDown={(event) => {
                    if (event.keyCode === 13){ 
                      event.preventDefault();
                      addTask()};
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
        <Table responsive="sm"  bordered hover  className={hide_table ? "" : "hide"}>
          <tbody>
            <tr>
              <th>Item </th>
              <th>Actions</th>
              <th>Status</th>
            </tr>
            {todoList.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.task}</td>
                  <td>
                    <div className="icons">
                      <FcCheckmark onClick={() => completeTask(val.task)} />
                   
                      <FcCancel onClick={() => deleteTask(val.task)} />
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
