import TodoProvider from "./contexts/todoContext";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <TodoProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <Home />
    </TodoProvider>
    </>
  );
}

export default App;
