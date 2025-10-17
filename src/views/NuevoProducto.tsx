import {
  Form,
  Link,
  useActionData,
  type ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import MensajeError from "../components/MensajeError";
import { agregarProducto } from "../services/ProductoServicio";
import FormularioProducto from "../components/FormularioProducto";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";

  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }

  await agregarProducto(data);

  return redirect("/");
}

export default function NuevoProducto() {
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-3xl font-black text-slate-500">
          Registrar producto
        </h2>
        <Link
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          to="/"
        >
          Volver a productos
        </Link>
      </div>

      {error && <MensajeError>{error}</MensajeError>}

      <Form className="mt-10" method="POST">
        <FormularioProducto />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar producto"
        />
      </Form>
    </>
  );
}
