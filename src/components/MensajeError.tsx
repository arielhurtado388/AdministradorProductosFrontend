import type { PropsWithChildren } from "react";

export default function MensajeError({ children }: PropsWithChildren) {
  return (
    <div className="text-center my-4 bg-red-500 text-white font-bold uppercase p-3">
      {children}
    </div>
  );
}
