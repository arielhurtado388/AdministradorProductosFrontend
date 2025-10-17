import type { Producto } from "../types";

type FormularioProductoProps = {
  producto?: Producto;
};
export default function FormularioProducto({
  producto,
}: FormularioProductoProps) {
  return (
    <>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="nombre">
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Nombre del producto"
          name="nombre"
          defaultValue={producto?.nombre}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="precio">
          Precio
        </label>
        <input
          id="precio"
          type="number"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Precio del producto. Ej. 200, 300"
          name="precio"
          defaultValue={producto?.precio}
        />
      </div>
    </>
  );
}
