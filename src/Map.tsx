import { ChangeEvent, useState } from "react";
import Dialog from "./componentes/Dialog";

type Coordenadas = {
  x: number;
  y: number;
};

export type Cosas = Coordenadas & { color: string };

export const Mapa = () => {
  const [ancho, setAncho] = useState(0);
  const [alto, setAlto] = useState(0);
  const [centro, setCentro] = useState({ x: 0, y: 0 });

  const cosas: Cosas[] = [];

  const elementos = [];

  //Transformamos aqui los NaN para permitir borrar el numero en el formulario

  const anchoNaNCero = isNaN(ancho) ? 0 : ancho;
  const altoNaNCero = isNaN(alto) ? 0 : alto;
  const xNaNCero = isNaN(centro.x) ? 0 : centro.x;
  const yNaNCero = isNaN(centro.y) ? 0 : centro.y;

  for (let y = yNaNCero + altoNaNCero; y >= yNaNCero - altoNaNCero; y--) {
    const fila = [];
    for (let x = xNaNCero - anchoNaNCero; x <= xNaNCero + anchoNaNCero; x++) {
      const cosa = cosas.find((c) => c.x === x && c.y === y);
      const backgroundColor = cosa ? cosa.color : "#5A3CD6";
      fila.push(
        <span key={x + y}>
          <Dialog
            isOpen={false}
            openButton={false}
            mensaje={`Formulario para x:${x} y:${y}`}
          >
            <p>x: {x}</p>
            <p>y: {y}</p>
            {/* Aquí puedes agregar los campos del formulario relacionados a x e y */}
          </Dialog>
          <button className="cuadrado" style={{ backgroundColor }}>
            x:{x} y:{y}
          </button>
        </span>
      );
    }
    fila.push(<br></br>);
    elementos.push(fila);
  }
  console.log(elementos);

  return (
    <>
      {elementos}
      <Dialog isOpen={false} mensaje="Map Config" openButton={null}>
        {
          <>
            <p>Ancho (*2 +1)</p>
            <input
              type="number"
              value={ancho}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setAncho(parseInt(event.target.value));
              }}
            />
            <p>Alto (*2 +1)</p>
            <input
              type="number"
              value={alto}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setAlto(parseInt(event.target.value));
              }}
            />

            <p>centro.X</p>
            <input
              type="number"
              value={centro.x}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const x = parseInt(event.target.value, 10);

                setCentro((prev) => ({ ...prev, x }));
              }}
            />
            <p>centro.Y</p>
            <input
              type="number"
              value={centro.y}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const y = parseInt(event.target.value, 10);

                setCentro((prev) => ({ ...prev, y }));
              }}
            />
          </>
        }
      </Dialog>
    </>
  );
};
