import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Productos, {
  action as actualizarDisponibilidad,
  loader as loaderProductos,
} from "./views/Productos";
import NuevoProducto, {
  action as nuevoProductoAction,
} from "./views/NuevoProducto";
import EditarProducto, {
  loader as editarProductoLoader,
  action as editarProductoAction,
} from "./views/EditarProducto";
import { action as eliminarProductoAction } from "./components/DetalleProducto";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Productos />,
        loader: loaderProductos,
        action: actualizarDisponibilidad,
      },
      {
        path: "productos/nuevo",
        element: <NuevoProducto />,
        action: nuevoProductoAction,
      },
      {
        path: "productos/:id/editar", // ROA Pattern
        element: <EditarProducto />,
        loader: editarProductoLoader,
        action: editarProductoAction,
      },
      {
        path: "productos/:id/eliminar", // ROA Pattern
        action: eliminarProductoAction,
      },
    ],
  },
]);
