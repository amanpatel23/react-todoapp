import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const todoContext = createContext();

function TodoProvider({ children }) {

  // base url for calling different api
  const baseUrl = "https://jsonplaceholder.typicode.com/todos";
  // state for storing todo items
  const [todoItems, setTodoItems] = useState([]);
  // states for keeping the information about editing mode
  const [editingMode, setEditingMode] = useState(false);
  const [clickedTodo, setClickedTodo] = useState({});

  useEffect(() => {
    // fetch the todo items from the api when the component mounts
    const fetchTodoItems = async () => {
      try {
        let todos = await axios(baseUrl + "?userId=1");
        todos = await todos.data;
        for (let todo of todos) {
          const todoId = uuidv4();
          todo.todoId = todoId;
        }
        setTodoItems(todos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodoItems();
  }, []);

  // function for adding a new todo item
  const addTodoItem = async (newTodoItem) => {
    try {
      const response = await axios.post(baseUrl, newTodoItem);
      const todoData = await response.data;
      todoData.todoId = uuidv4();

      setTodoItems((prevTodoItems) => [todoData, ...prevTodoItems]);

      toast.success("Todo Added Successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Error Adding New Todo.");
    }
  };

  // function for updating an existing todo item
  const updateTodoItem = async (todoId, todoData) => {
    try {
      const { id } = todoData;
      const response = await axios.patch(`${baseUrl}/${id}`, todoData);
      const updatedTodoData = response.data;

      setTodoItems((prevTodoItems) =>
        prevTodoItems.map((todo) => {
          if (todo.todoId === todoId) {
            return { ...updatedTodoData, todoId };
          } else {
            return todo;
          }
        })
      );

      toast.success("Todo Updated Successfully.");
    } catch (error) {
      toast.error("Error Updating The Todo.");
    }
  };

  // function for deleting an existing todo item
  const deleteTodoItem = async (todoData) => {
    try {
      const { id, todoId } = todoData;
      await axios.delete(`${baseUrl}/${id}`);
      setTodoItems((prevTodoItem) =>
        prevTodoItem.filter((todoItem) => todoItem.todoId !== todoId)
      );

      toast.success("Todo Deleted Successfully.");
    } catch (error) {
      toast.error("Error Deleting The Todo.");
    }
  };

  return (
    <todoContext.Provider
      value={{
        todoItems,
        addTodoItem,
        editingMode,
        setEditingMode,
        clickedTodo,
        setClickedTodo,
        updateTodoItem,
        deleteTodoItem,
      }}
    >
      {children}
    </todoContext.Provider>
  );
}

export default TodoProvider;
export { todoContext };
