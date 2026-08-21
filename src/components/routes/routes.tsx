import { createBrowserRouter } from "react-router-dom";
import Main from "../../pages/main/main";
import Home from "../../pages/home/Home";
import EspeciePage from "../../pages/especie/EspeciePage";
import MapaPage from "../../pages/mapa/MapaPage";
import QueHacerPage from "../../pages/queHacer/QueHacerPage";
import AcercaPage from "../../pages/acerca/AcercaPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <Home /> },
      { path: "especie/:id", element: <EspeciePage /> },
      { path: "mapa", element: <MapaPage /> },
      { path: "que-hacer", element: <QueHacerPage /> },
      { path: "acerca", element: <AcercaPage /> },
    ],
  },
]);

export default router;
