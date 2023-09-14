import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Main from '../../pages/main'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
]);

export default router;
