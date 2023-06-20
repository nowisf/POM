import { useState, ReactNode, MouseEventHandler } from "react";

function Dialog({
  mensaje,
  children,
  renderButton,
}: {
  mensaje: string;
  children: ReactNode;
  renderButton?: (event: MouseEventHandler<HTMLButtonElement>) => ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const invertirApertura = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const cerrar = () => {
    setOpen(false);
  };

  return (
    <>
      <dialog
        open={open}
        style={{ position: "fixed", top: "20px", right: "30px" }}
      >
        <p>{mensaje}</p>

        {children}
        <button onClick={cerrar}>OK</button>
      </dialog>

      {renderButton ? (
        renderButton(invertirApertura)
      ) : (
        <button onClick={invertirApertura}>
          <p>{mensaje ? mensaje : "abrir dialog"}</p>
        </button>
      )}
    </>
  );
}

export default Dialog;
