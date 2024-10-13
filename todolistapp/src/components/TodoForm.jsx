import React from 'react';

function TodoForm({ submitData, setTodo, todo, editId }) {
  const onChangeHandler = (e) => {
    setTodo(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    submitData();
  };

  return (
    <div>
      <form action="" onSubmit={onSubmitHandler}>
        <input
          type="text"
          onChange={onChangeHandler}
          value={todo}
          placeholder="Nhập gì đó đi"
        />
        <button>{editId === null ? "Add todo" : "Update todo"}</button>
      </form>
    </div>
  );
}

export default TodoForm;
