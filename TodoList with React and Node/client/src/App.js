import React, { useEffect, useState } from "react";
import { Button, Checkbox, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";
import "./App.css";


function App() {
  const [todoName, setTodoName] = useState("");
  const [todoArr, setTodo] = useState([]);
  const [flag, setflag] = useState("allTask");
  const [spinnerflag, setSpinnerflag] = useState(false);
  var newArrayLength = 0;
  const baseURL = "http://localhost:9000";


  /*addToDo is used to add a new todoitem*/
  const addTodo = text => {
    setSpinnerflag(true)
    axios.post(`${baseURL}/addTask`, {
      taskName: text,
      completed: false,
      isActive: true
    })
      .then(function (response) {
        setTodo(response.data.data)
        setSpinnerflag(false)
      })
      .catch(function (error) {
        errorPopup();
      });
  };

  /*markToDo is used to check a todoitem*/
  const markTodo = (task, index, checkedValue, isActiveStatus) => {
    setSpinnerflag(true)
    axios.put(`${baseURL}/todo/${index}/update`, {
      taskName: task,
      completed: checkedValue,
      isActive: isActiveStatus
    })
      .then(function (response) {
        setTodo(response.data.data)
        setSpinnerflag(false)
      })
      .catch(function (error) {
        errorPopup();
      });
  };

  /*removeToDo is used to remove a todoitem*/
  const removeTodo = index => {
    setSpinnerflag(false)
    axios.delete(`${baseURL}/todo/${index}/delete`)
      .then(function (response) {
        setTodo(response.data.data)
        setSpinnerflag(false)
      })
      .catch(function (error) {
        errorPopup();
      });
  };

  /*removeAllCheckedTodo is used to remove all the checked todoitem*/
  const removeAllCheckedTodo = () => {
    setSpinnerflag(false)
    axios.delete(`${baseURL}/deleteAllChecked`)
      .then(function (response) {
        setTodo(response.data.data)
        setSpinnerflag(false)
      })
      .catch(function (error) {
        errorPopup();
      });
  };

  /*removeAllActiveTodo is used to remove all the active todoitem*/
  const removeAllActiveTodo = () => {
    setSpinnerflag(false)
    axios.delete(`${baseURL}/deleteAllActive`)
      .then(function (response) {
        setTodo(response.data.data)
        setSpinnerflag(false)
      })
      .catch(function (error) {
        errorPopup();
      });
  };

  /*activeTodo is used to mark a todoitem as active*/
  const activeTodo = (task, index, isActiveStatus) => {
    setSpinnerflag(true)
    axios.put(`${baseURL}/todo/${index}/update`, {
      taskName: task,
      completed: true,
      isActive: false
    })
      .then(function (response) {
        setTodo(response.data.data)
        setSpinnerflag(false)
      })
      .catch(function (error) {
        errorPopup();
      });
  };

  const submit = e => {
    e.preventDefault();
    if (!todoName) return;
    addTodo(todoName);
    setTodoName("")
  }

  const errorPopup = () => {
    toast.error("Something went wrong with 'Service'...!!! Please try again", {
      onClose: () => {
        setSpinnerflag(false)
      },
      autoClose: 5000
    })
  }

  /*useEffect is called on page load*/
  useEffect(() => {
    setSpinnerflag(true)
    axios.get(`${baseURL}/getTaskList`)
      .then(function (response) {
        setTodo(response.data.data)
        setSpinnerflag(false)
      })
      .catch(function (error) {
        errorPopup();
      });
  }, [])


  return (
    <div className="App">
      <div>
        <ToastContainer />
      </div>
      {spinnerflag && <div className="spinner">
        <CircularProgress color="secondary" />
      </div>}
      <h1>TodoApp - Using React & Node</h1>
      <form onSubmit={submit}>
        <TextField type="text" autoComplete="off" onChange={e => setTodoName(e.target.value)} value={todoName} placeholder="Enter Todo List" />
        <Button className="ml-2 mt-2" variant="contained" startIcon={<AddIcon />} type="button" onClick={submit}>Add </Button>
      </form>
      <div className="pt-2 pb-2">
      </div>
      <div>
        <Button className={`mr-2 ${flag === 'checked' ? "colorChange" : ""}`} variant="contained" onClick={() => { setflag("checked") }}>Checked</Button>
        <Button className={`mr-2 ${flag === 'active' ? "colorChange" : ""}`} variant="contained" onClick={() => { setflag("active") }}>Active</Button>
        <Button className={`mr-2 ${flag === 'allTask' ? "colorChange" : ""}`} variant="contained" onClick={() => { setflag("allTask") }}>All</Button>
        <Button className="mr-2" variant="contained" startIcon={<DeleteIcon />} onClick={() => { removeAllCheckedTodo() }}>Delete All Checked Item</Button>
        <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => { removeAllActiveTodo() }}>Delete All Active Item</Button>
      </div>

      {(() => {
        if (flag === 'checked') {
          return (
            <div className="px-5">You are viewing Checked Item </div>
          )
        }
        if (flag === 'active') {
          return (
            <div className="px-5">You are viewing Active Item </div>
          )
        }
        if (flag === 'allTask') {
          return (
            <div className="px-5">You are viewing All Item </div>
          )
        }
        return null;
      })()}


      <ul id="todo-list">
        {flag === "allTask" && todoArr.map((todo, index) => (
          <Todo
            key={index}
            id={index}
            todo={todo}
            activeTodo={activeTodo}
            markTodo={markTodo}
            removeTodo={removeTodo}
          />
        ))}
        {flag === "checked" && todoArr.map((todo, index) => {
          if (todo.completed === true) {
            newArrayLength++
            return <Todo
              key={index}
              id={index}
              todo={todo}
              activeTodo={activeTodo}
              markTodo={markTodo}
              removeTodo={removeTodo}
            />
          }
        })}
        {flag === "active" && todoArr.map((todo, index) => {
          if (todo.isActive === false) {
            newArrayLength++
            return <Todo
              key={index}
              id={index}
              todo={todo}
              activeTodo={activeTodo}
              markTodo={markTodo}
              removeTodo={removeTodo}
            />
          }
        })}
      </ul>

      <div>
        <span>Total List in Current Tab:{flag === "allTask" ? todoArr.length : newArrayLength}</span>
      </div>
    </div>
  );
}

const Todo = (props) => {
  return (
    <div className="all-item">
      <div className="todo-item">
        <div>
          <Checkbox className="todo-checkbox"
            type="checkbox"
            checked={props.todo.completed}
            onChange={e => props.markTodo(props.todo.taskName, props.todo.id, e.target.checked, props.todo.isActive)}
          />
        </div>
        <div className={`adjust ${!props.todo.isActive ? "checked" : ""}`}>
          {props.todo.taskName}
        </div>
        {(() => {
          if (props.todo.completed) {
            return (
              <div className="todo-item">
                <div>
                  <Button variant="outlined" startIcon={<RemoveIcon />} className="todo-remove mr-2" onClick={() => props.removeTodo(props.todo.id)}>
                    Remove
                  </Button>
                </div>
                {(() => {
                  if (props.todo.isActive) {
                    return (
                      <div>
                        <Button variant="contained" className={`todo-remove mr-2 ${!props.todo.isActive ? "colorChange" : ""}`} onClick={() => props.activeTodo(props.todo.taskName, props.todo.id, props.todo.isActive)}>
                          Active
                        </Button>
                      </div>
                    )
                  }
                })()}
              </div>
            )
          }
          return null
        })()}

      </div>
    </div>
  )
}

export default App;
