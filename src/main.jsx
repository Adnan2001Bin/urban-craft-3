import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { AuthLayout, Login, Signup } from "./components/index.js";

import AddHomepageImg from './pages/AddHomepageImg.jsx'
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import AllPosts from "./pages/AllPosts.jsx";
// import BedRoomCatagoriesPage from "./components/ProductCatagories/Beedroom/BedRoomCatagoriesPage.jsx"
// import DinningRoomCatagoriesPage from "./components/ProductCatagories/Dinning/DinningRoomCatagoriesPage.jsx"
// import Signup from './pages/AddPost.jsx'
// import EditPost from "./pages/EditPost.jsx";

// import Post from "./pages/Post.jsx";

// import AllPosts from "./pages/AllPosts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },

      {
        path: "/AddHomePageImg",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddHomepageImg />
          </AuthLayout>
        ),
      },
      {
        path: "/EditHomePageImg/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/All HomePage Img",
        element: <AllPosts />,
      },
      // {
      //   path: "/BedRoomCatagoriesPage",
      //   element: <BedRoomCatagoriesPage />,
      // },
      // {
      //   path: "/DinningRoomCatagoriesPage",
      //   element: <DinningRoomCatagoriesPage />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
