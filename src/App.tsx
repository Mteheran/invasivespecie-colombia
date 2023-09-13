import * as React from "react";
import {
  RouterProvider,
} from "react-router-dom";
import router from './components/routes'
import "./index.css";
import './App.css';

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
