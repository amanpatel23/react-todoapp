import TodoProvider from "./contexts/todoContext";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <TodoProvider>
        {/* toast container for displaying messages */}
        <ToastContainer position="top-right" autoClose={3000} />
        {/* rendering Home page here */}
        <Home />
      </TodoProvider>
    </>
  );
}

export default App;
