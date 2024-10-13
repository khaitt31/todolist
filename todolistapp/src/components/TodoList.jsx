import React from 'react';
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

function TodoList({ todoArr, toggleTask, deleteTask, setTodo, setEditId }) {
  const handleEditTodo = (todo) => {
    setEditId(todo.id);
    setTodo(todo.title); // Cập nhật giá trị input để người dùng chỉnh sửa
  };

  return (
    <div className="todo_list">
      {todoArr.map((todo) => (
        <div className={todo.complete ? "todo_item complete" : "todo_item"} key={todo.id}>
          <span onClick={() => toggleTask(todo.id)}>{todo.title}</span>
          <MdEdit onClick={() => handleEditTodo(todo)} />
          <FaTrash onClick={() => deleteTask(todo.id)} />
        </div>
      ))}
    </div>
  );
}

export default TodoList;
