import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import {
  actualizarDisponibilidad,
  obtenerProductos,
} from "../services/ProductoServicio";
import DetalleProducto from "../components/DetalleProducto";
import type { Producto } from "../types";

export async function loader() {
  const productos = await obtenerProductos();
  return productos;
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await actualizarDisponibilidad(+data.id);
}

export default function Productos() {
  const productos = useLoaderData() as Producto[];
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-3xl font-black text-slate-500">Productos</h2>
        <Link
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          to="productos/nuevo"
        >
          Agregar producto
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <DetalleProducto key={producto.id} producto={producto} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
