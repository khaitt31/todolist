import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoApp() {
  const [todo, setTodo] = useState(""); // Dùng state để lưu công việc nhập
  const [todoArr, setTodoArr] = useState([]); // Mảng công việc
  const [editId, setEditId] = useState(null); // Lưu ID của công việc đang được chỉnh sửa

  // Thêm hoặc cập nhật công việc
  const submitData = () => {
    if (todo.trim() === "") return; 

    if (editId !== null) {
      // Nếu đang chỉnh sửa, cập nhật công việc
      console.log("Updating todo with id:", editId); // Debug
      /*
      Hàm map() được dùng để lặp qua mảng todoArr (mảng chứa tất cả các công việc) 
      và trả về một mảng mới với các phần tử đã được chỉnh sửa hoặc giữ nguyên.
      */
      const updatedTodos = todoArr.map((item) =>
        item.id === editId ? { ...item, title: todo } : item
      );
      setTodoArr(updatedTodos);
      setEditId(null); // Reset chế độ chỉnh sửa về null sau khi cập nhật
      console.log("Reset editId to null"); // Debug
    } else {
      // Nếu không trong chế độ chỉnh sửa, thêm công việc mới
      const todoObj = {
        id: Math.floor(Math.random() * 10000),
        title: todo,
        complete: false,
      };
      console.log("Adding new todo:", todoObj); // Debug
      setTodoArr([todoObj, ...todoArr]);
    }

    setTodo(""); // Xóa trường nhập liệu sau khi thêm/cập nhật
  };

  // Đổi trạng thái hoàn thành của công việc
  const toggleTask = (todoid) => {
    setTodoArr(
      todoArr.map((td) => (td.id === todoid ? { ...td, complete: !td.complete } : td))
    );
  };

  // Xóa công việc
  const deleteTask = (todoid) => {
    setTodoArr(todoArr.filter((td) => td.id !== todoid));
    if (editId === todoid) {
      // Nếu đang chỉnh sửa công việc này, reset editId
      setEditId(null);
      setTodo("");
    }
  };

  return (
    <div className='todoapp'>
      <h1>Todolist App</h1>
      <TodoForm
        submitData={submitData}
        setTodo={setTodo}
        todo={todo}
        editId={editId}
      />
      <TodoList
        todoArr={todoArr}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        setTodo={setTodo}
        setEditId={setEditId}
      />
    </div>
  );
}

export default TodoApp;
