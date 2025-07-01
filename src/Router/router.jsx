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
import MyOrders from "../pages/MyOrders";
import MyFood from "../pages/MyFood";
import Error from "../pages/Error";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProfileDashboard from "../pages/Dashboard/ProfileDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/AllFoods",
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/foods`),
        hydrateFallbackElement: <Error />,
        element: <AllFoods />,
      },
      {
        path: "/Gallery",
        element: <Gallery />,
      },
      {
        path: "/AddFood",
        element: (
          <PrivetRoute>
            <AddFood />
          </PrivetRoute>
        ),
      },
      {
        path: "/food/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/food/${params.id}`),
        hydrateFallbackElement: <Error />,
        element: <FoodDetails />,
      },
      {
        path: "/purchase/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/food/${params.id}`),
        hydrateFallbackElement: <Error />,
        element: (
          <PrivetRoute>
            <PurchaseFood />
          </PrivetRoute>
        ),
      },
      {
        path: "/MyFood",
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/foods`),
        hydrateFallbackElement: <Error />,
        element: (
          <PrivetRoute>
            <MyFood />
          </PrivetRoute>
        ),
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
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard/MyFood",
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/foods`),
        hydrateFallbackElement: <Error />,
        element: (
          <PrivetRoute>
            <MyFood />
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/AddFood",
        element: (
          <PrivetRoute>
            <AddFood />
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/MyOrders",
        element: (
          <PrivetRoute>
            <MyOrders />
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivetRoute>
            <ProfileDashboard />
          </PrivetRoute>
        ),
      },
    ],
  },
]);
