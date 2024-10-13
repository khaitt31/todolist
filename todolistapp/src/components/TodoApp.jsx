import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoApp() {
  const [todo, setTodo] = useState(""); // Dùng state để lưu công việc nhập
  const [todoArr, setTodoArr] = useState([]); // Mảng công việc
  const [editId, setEditId] = useState(null); // Lưu ID của công việc đang được chỉnh sửa

  // Thêm hoặc cập nhật công việc
  const submitData = () => {
    if (todo.trim() === "") return; // Kiểm tra chuỗi rỗng
  
    if (editId !== null) {
      // Nếu đang chỉnh sửa, cập nhật công việc
      const updatedTodos = todoArr.map((item) =>
        item.id === editId ? { ...item, title: todo } : item
      );
      setTodoArr(updatedTodos);
      setEditId(null); // Reset chế độ chỉnh sửa về null sau khi cập nhật
    } else {
      // Nếu không trong chế độ chỉnh sửa, thêm công việc mới
      const todoObj = {
        id: Math.floor(Math.random() * 10000),
        title: todo,
        complete: false, // Khởi tạo thuộc tính complete
      };
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
