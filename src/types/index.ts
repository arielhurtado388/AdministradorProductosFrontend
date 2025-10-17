import {
  array,
  boolean,
  number,
  object,
  string,
  type InferOutput,
} from "valibot";

export const BorradorProductoSchema = object({
  nombre: string(),
  precio: number(),
});

export const ProductoSchema = object({
  id: number(),
  nombre: string(),
  precio: number(),
  disponible: boolean(),
});

export const ProductosSchema = array(ProductoSchema);

export type Producto = InferOutput<typeof ProductoSchema>;
