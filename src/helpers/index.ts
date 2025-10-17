export function formatearMoneda(cantidad: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cantidad);
}

export function toBoolean(str: string) {
  return str.toLowerCase() === "true";
}
