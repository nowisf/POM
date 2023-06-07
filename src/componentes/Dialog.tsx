import { useState, ReactNode } from "react";

function Dialog({
  isOpen,
  mensaje,
  children,
  renderButton,
}: {
  isOpen: boolean;
  mensaje: string;
  children: ReactNode;
  renderButton: any;
}) {
  const [open, setOpen] = useState(isOpen);

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
        <form method="dialog">
          {children}
          <button onClick={cerrar}>OK</button>
        </form>
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
