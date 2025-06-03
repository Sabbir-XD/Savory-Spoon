import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AllFoods from "../pages/AllFoods";
import Gallery from "../pages/Gallery";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/AllFoods",
        element: <AllFoods />,
      },
      {
        path: "/Gallery",
        element: <Gallery />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path:"/register",
        element:<Register/>
      }
    ],
  },
]);
