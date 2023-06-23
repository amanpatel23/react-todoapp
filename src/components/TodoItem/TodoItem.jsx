import { useState, useContext } from "react";
import { todoContext } from "../../contexts/todoContext";
import styles from "./TodoItem.module.css";

function TodoItem({ todo, setInputTodo, deleteTodoHandler }) {
  const [taskCompleted, setTaskCompleted] = useState(todo.completed);

  const { setClickedTodo, setEditingMode, deleteTodoItem } =
    useContext(todoContext);

  const toggleTaskCompleted = (todo) => {
    setTaskCompleted(!taskCompleted);
  };

  const clickedEditButton = () => {
    setEditingMode(true);
    setClickedTodo(todo);
    setInputTodo(todo.title);
  };

  const clickedDeleteButton = () => {
    deleteTodoItem(todo);
  };

  const pClassName = taskCompleted ? `${styles.completed}` : "";

  return (
    <>
      <div className={styles.item__outer}>
        <div className={styles.item__inner}>
          <div className={styles.item__text}>
            {/* add dynamic className when task is completed */}
            <p className={pClassName}>{todo.title}</p>
          </div>
          <div className={styles.action__btns}>
            <div className={styles.check}>
              {/* <i className="fa-solid fa-circle-check"></i> */}
              <input
                type="checkbox"
                checked={taskCompleted}
                onChange={() => toggleTaskCompleted(todo)}
              />
            </div>
            <div onClick={clickedEditButton} className={styles.edit}>
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <div onClick={clickedDeleteButton} className={styles.delete}>
              <i className="fa-solid fa-trash-can"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoItem;
