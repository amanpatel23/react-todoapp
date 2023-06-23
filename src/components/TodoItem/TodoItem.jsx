import { useState, useContext } from "react";
import { todoContext } from "../../contexts/todoContext";
import styles from "./TodoItem.module.css";

function TodoItem({ todo, setInputTodo, deleteTodoHandler }) {
  
  // state for storing information about the task completion
  const [taskCompleted, setTaskCompleted] = useState(todo.completed);

  // getting functions from todoContext
  const { setClickedTodo, setEditingMode, deleteTodoItem } =
    useContext(todoContext);

  // function for toggling the task completion
  const toggleTaskCompleted = () => {
    setTaskCompleted(!taskCompleted);
  };

  // when edit button is clikced
  const clickedEditButton = () => {
    setEditingMode(true);
    setClickedTodo(todo);
    setInputTodo(todo.title);
  };

  // when delete button is clicked, calling the deleteTodoItem function of the context
  const clickedDeleteButton = () => {
    deleteTodoItem(todo);
  };

  // dynamic class to add style for complete task
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
              {/* checkbox to toggle the task completion */}
              <input
                type="checkbox"
                checked={taskCompleted}
                onChange={toggleTaskCompleted}
              />
            </div>
            {/* edit button */}
            <div onClick={clickedEditButton} className={styles.edit}>
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
            {/* delete button */}
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
