import React, { useState } from "react";
import { useEffect } from "react";

const Crud = () => {
  const [todo, setTodo] = useState([]);
  const [todos, setTodos] = useState("");
  const [editTodo, seteditTodo] = useState(null);
  const [editText, seteditText] = useState("");
  useEffect(() => {
    const temp = localStorage.getItem("toos");
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      setTodo(loadedTodos);
    }
  }, []);
  useEffect(() => {
    const memory = JSON.stringify(todo);
    localStorage.setItem("todo", memory);
  }, []);
  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todos,
      complited: false,
    };
    setTodo([...todo.concat(newTodo)]);
    setTodos("");
  }
  function deleteTodo(id) {
    const updateTodos = [...todo].filter((todos) => todos.id !== id);
    setTodo(updateTodos);
  }
  function newTodos(id) {
    const updatedTodos = [...todo].map((todos) => {
      if (todos.id == id) {
        todos.text = editText;
      }
      return todos;
    });
    setTodo(updatedTodos);
    seteditTodo(null);
    seteditText("");
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodos(e.target.value)}
          value={todos}
        />
        <button>Add Todo</button>
      </form>
      {todo.map((todos) => (
        <div className="todo">
          {editTodo == todos.id ? (
            <input
              type="text"
              onChange={(e) => seteditText(e.target.value)}
              value={editText}
            />
          ) : (
            <h1 key={todos.id}>{todos.text}</h1>
          )}
          <div className="todo-actions">
            {editTodo == todos.id ? (
              <button onClick={() => newTodos(todos.id)}>Submit</button>
            ) : (
              <button onClick={() => seteditTodo(todos.id)}>Edit</button>
            )}
            <button onClick={() => deleteTodo(todos.id)}>delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Crud;
