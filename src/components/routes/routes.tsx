import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../../pages/main/main";
import Search from "../../pages/main/search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        index: true,
        element: <Search></Search>,
      },
    ]
  },
]);

export default router;
