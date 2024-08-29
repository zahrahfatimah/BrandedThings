import { createBrowserRouter, redirect } from "react-router-dom";
import Toastify from 'toastify-js'
import Login from "../views/login";
import BaseLayout from "../views/BaseLayout";
import Home from "../views/home";
import Categories from "../views/Cartegory";
import AddPage from "../views/AddPage";
import EditForm from "../views/EditPage";
import AddUser from '../views/AddUser'

const url = "https://h8-phase2-gc.vercel.app";
// const url = "http://localhost:3000";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "kamu berhasill login",
          duration: 2000,
          newWindow: true,
          close: true,
          style: {
            background: "#B3C8CF",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
          position: "right",
        }).showToast();
        return redirect("/home");
      }

      return null;
    },
  },
  {
    path: '/',
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please login first",
          duration: 2000,
          newWindow: true,
          close: true,
          style: {
            background: "#B3C8CF",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
          position: "right",
        }).showToast();
        return redirect("/");
      }

      return null;
    },

    children: [
      {
        path: '/home',
        element: <Home url={url}/>
      },
      {
        path:'/categories',
        element: <Categories url={url}/>
      },
      {
        path:'/add',
        element: <AddPage url={url}/>
      },
      {
        path:'/edit/:id',
        element:<EditForm url={url}/>
      },
      {
        path:'/add-user',
        element: <AddUser url={url}/>
      }
    ]
  },
]);

export default router;
