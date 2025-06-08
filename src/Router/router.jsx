import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AllFoods from "../pages/AllFoods";
import Gallery from "../pages/Gallery";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddFood from "../pages/AddFood";
import PrivetRoute from "./PrivetRoute";
import FoodDetails from "../pages/FoodDetails";
import PurchaseFood from "../pages/PurchaseFood";

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
        loader: () => fetch("http://localhost:5000/foods"),
        element: <AllFoods />,
      },
      {
        path: "/Gallery",
        element: <Gallery />,
      },
      {
        path: "/AddFood",
        element:<PrivetRoute><AddFood /></PrivetRoute>,
      },
      {
        path: "/food/:id",
        loader: ({ params }) => fetch(`http://localhost:5000/food/${params.id}`),
        element: <FoodDetails />,
      },
      {
        path: "/purchase/:id",
        loader: ({ params }) => fetch(`http://localhost:5000/purchase/${params.id}`),
        element: <PrivetRoute><PurchaseFood /></PrivetRoute>,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
