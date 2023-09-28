import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Chat, { loader as chatload } from "./components/Chat";
import Login, { loader as logload } from "./components/Login";
import { AuthContext } from "./context/AuthContext";
import Loader from "./components/Loader";
import Home from "./components/Home";

function App() {
  const { currentLogin } = React.useContext(AuthContext);
  const [isLoad, setIsLoad] = React.useState(false);

  const current = true;

  console.log(currentLogin);

  const Required = ({ children }) => {
    return currentLogin ? children : <Navigate to="/login" />;
  };

  React.useEffect(() => {
    // Simulating an asynchronous data fetching or any other time-consuming process
    setTimeout(() => {
      setIsLoad(true);
    }, 2000);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path={"/" || "/?"} element={<Home />} loader={chatload} />
        <Route
          path={"/login" || "/login?"}
          element={<Login />}
          loader={logload}
        />
        <Route
          path={"/chat" || "/chat?"}
          element={
            <Required>
              <Chat />
            </Required>
          }
        />
      </Route>
    )
  );

  return isLoad ? <RouterProvider router={router} /> : <Loader />;
}

export default App;
