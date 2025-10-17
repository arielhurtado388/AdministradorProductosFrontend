import { number, parse, pipe, safeParse, string, transform } from "valibot";
import {
  BorradorProductoSchema,
  ProductoSchema,
  ProductosSchema,
  type Producto,
} from "../types";
import axios from "axios";
import { toBoolean } from "../helpers";

type ProductoData = {
  [k: string]: FormDataEntryValue;
};

export async function agregarProducto(data: ProductoData) {
  try {
    const resultado = safeParse(BorradorProductoSchema, {
      nombre: data.nombre,
      precio: +data.precio,
    });

    if (resultado.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/productos`;
      await axios.post(url, {
        nombre: resultado.output.nombre,
        precio: resultado.output.precio,
      });
    } else {
      throw new Error("Datos no válidos");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function obtenerProductos() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/productos`;
    const { data } = await axios(url);
    const resultado = safeParse(ProductosSchema, data.data);
    if (resultado.success) {
      return resultado.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function obtenerProductoPorId(id: Producto["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`;
    const { data } = await axios(url);
    const resultado = safeParse(ProductoSchema, data.data);
    if (resultado.success) {
      return resultado.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function actualizarProducto(
  data: ProductoData,
  id: Producto["id"]
) {
  try {
    const NumeroSchema = pipe(string(), transform(Number), number());
    const resultado = safeParse(ProductoSchema, {
      id,
      nombre: data.nombre,
      precio: parse(NumeroSchema, data.precio),
      disponible: toBoolean(data.disponible.toString()),
    });
    if (resultado.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`;
      await axios.put(url, resultado.output);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function eliminarProducto(id: Producto["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}

export async function actualizarDisponibilidad(id: Producto["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
}
