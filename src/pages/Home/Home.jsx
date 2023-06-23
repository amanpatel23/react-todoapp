import { useEffect, useContext, useState } from "react";
import { todoContext } from "../../contexts/todoContext";
import TodoItem from "../../components/TodoItem/TodoItem";
import styles from "./Home.module.css";

function Home() {
  // state for storing the todo title
  const [inputTodo, setInputTodo] = useState("");

  // getting states and functions from todoContext
  const {
    todoItems,
    addTodoItem,
    editingMode,
    setEditingMode,
    clickedTodo,
    setClickedTodo,
    updateTodoItem,
    deleteTodoItem,
  } = useContext(todoContext);

  // function to add new todo to the list
  const addTodoHandler = () => {
    const newTodoItem = { title: inputTodo, userId: 1, completed: false };
    addTodoItem(newTodoItem);
    setInputTodo("");
  };

  // function to update the todo
  const updateTodoHandler = () => {
    const todoData = {
      completed: clickedTodo.completed,
      id: clickedTodo.id,
      title: inputTodo,
      userId: clickedTodo.userId,
    };

    updateTodoItem(clickedTodo.todoId, todoData);
    setInputTodo("");
    setEditingMode(false);
    setClickedTodo({});
  };

  // function to delete the todo
  const deleteTodoHandler = () => {
    deleteTodoItem(clickedTodo);
  };

  return (
    <>
      <div className={styles.todo__outer}>
        <div className={styles.todo__inner}>
          <div className={styles.todo__addTask}>
            <div className={styles.inputField}>
              {/* input box for typing a new todo item */}
              <input
                placeholder="What's In Your Mind Today?"
                value={inputTodo}
                onChange={(event) => setInputTodo(event.target.value)}
                type="text"
                required
              />
            </div>
            <div className={styles.addBtn}>
              {/* button to add and update the todo item */}
              <button
                onClick={editingMode ? updateTodoHandler : addTodoHandler}
              >
                {editingMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
          <div className={styles.todo__tasksList}>
            {/* looping through todo items and displaying each item on the screen */}
            {todoItems.map((todo) => (
              <TodoItem
                key={todo.todoId}
                todo={todo}
                setInputTodo={setInputTodo}
                deleteTodoHandler={deleteTodoHandler}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
