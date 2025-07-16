import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
// import App from "./App.jsx";

import Home from "./views/Home";
import About from "./views/About";
import Posts from "./views/Posts";
import Post from "./views/Post";
import Contact from "./views/Contact";

import LoginIndex from "./views/login/Index";
import RegisterIndex from "./views/register/Index";

import DashboardIndex from "./views/dashboard/Index";
import DashboardPostsIndex from "./views/dashboard/posts/Index";
import DashboardPostsCreate from "./views/dashboard/posts/Create";
import DashboardPostsShow from "./views/dashboard/posts/Show";
import DashboardPostsEdit from "./views/dashboard/posts/Edit";
import DashboardCategoriesIndex from "./views/dashboard/categories/Index";
import DashboardCategoriesCreate from "./views/dashboard/categories/Create";
import DashboardCategoriesEdit from "./views/dashboard/categories/Edit";
import DashboardUsersEdit from "./views/dashboard/users/Edit";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/posts", element: <Posts /> },
  { path: "/posts/:slug", element: <Post /> },
  { path: "/contact", element: <Contact /> },

  { path: "/login", element: <LoginIndex /> },
  { path: "/register", element: <RegisterIndex /> },

  { path: "/dashboard", element: <DashboardIndex /> },
  { path: "/dashboard/posts", element: <DashboardPostsIndex /> },
  { path: "/dashboard/posts/create", element: <DashboardPostsCreate /> },
  { path: "/dashboard/posts/:slug", element: <DashboardPostsShow /> },
  {
    path: "/dashboard/posts/:slugParams/edit",
    element: <DashboardPostsEdit />,
  },
  { path: "/dashboard/categories", element: <DashboardCategoriesIndex /> },
  {
    path: "/dashboard/categories/create",
    element: <DashboardCategoriesCreate />,
  },
  {
    path: "/dashboard/categories/:slugParams/edit",
    element: <DashboardCategoriesEdit />,
  },
  {
    path: "/dashboard/users/:slugParams/edit",
    element: <DashboardUsersEdit />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
