import {
  Form,
  redirect,
  useFetcher,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router-dom";
import { formatearMoneda } from "../helpers";
import type { Producto } from "../types";
import { eliminarProducto } from "../services/ProductoServicio";

type DetalleProductoProps = {
  producto: Producto;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await eliminarProducto(+params.id);
    return redirect("/");
  }
}

export default function DetalleProducto({ producto }: DetalleProductoProps) {
  const fetcher = useFetcher();
  const navegacion = useNavigate();
  const estaDisponible = producto.disponible;
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{producto.nombre}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatearMoneda(producto.precio)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={producto.id}
            className={`${
              estaDisponible ? "text-black" : "text-red-500"
            } rounded-lg p-2 text-sm uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
          >
            {estaDisponible ? "Disponible" : "No disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            className="bg-indigo-600 text-white rounded-lg w-full p-2 font-bold uppercase text-center text-xs"
            onClick={() => navegacion(`productos/${producto.id}/editar`)}
          >
            Editar
          </button>

          <Form
            className="w-full"
            method="POST"
            action={`productos/${producto.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("¿Eliminar?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              className="bg-red-500 text-white rounded-lg w-full p-2 font-bold uppercase text-center text-xs"
              type="submit"
              value="Eliminar"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
