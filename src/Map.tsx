import { ChangeEvent, MouseEventHandler, useState } from "react";
import Dialog from "./componentes/Dialog";
import Select from "react-select";
type Coordenadas = {
  x: number;
  y: number;
};

const confMundo = [
  { mundo: "pom", colorTipo: [{ Tipo: "obstaculo", color: "#FF0000" }] },
];
const mundoActual = "pom";

const acciones = [
  { tipo: "casilla vacia", opciones: ["invocar Test", "invocar Test2"] },
];

export type Cosas = Coordenadas & { tipo: string };

export const Mapa = () => {
  const [ancho, setAncho] = useState(0);
  const [alto, setAlto] = useState(0);
  const [centro, setCentro] = useState({ x: 0, y: 0 });
  const [cosas, setCosas] = useState<Cosas[]>([]);

  const [xCasilla, setXCasilla] = useState(0);
  const [yCasilla, setyCasilla] = useState(0);
  const [seleccion, setSeleccion] = useState("");

  const elementos = [];

  //Transformamos aqui los NaN para permitir borrar el numero en el formulario

  const anchoNaNCero = isNaN(ancho) ? 0 : ancho;
  const altoNaNCero = isNaN(alto) ? 0 : alto;
  const xNaNCero = isNaN(centro.x) ? 0 : centro.x;
  const yNaNCero = isNaN(centro.y) ? 0 : centro.y;

  //Area Ejecutables TODO que se ejecuten en alguna parte del bucle temporal

  const agregarCosa = ({
    x,
    y,
    tipo,
  }: {
    x: number;
    y: number;
    tipo: string;
  }) => {
    setCosas((prevCosas) => {
      const nuevoCosas = prevCosas.filter((c) => !(c.x === x && c.y === y));
      return [...nuevoCosas, { x, y, tipo }];
    });
  };

  for (let y = yNaNCero + altoNaNCero; y >= yNaNCero - altoNaNCero; y--) {
    const fila = [];
    for (let x = xNaNCero - anchoNaNCero; x <= xNaNCero + anchoNaNCero; x++) {
      const cosa = cosas.find((c) => c.x === x && c.y === y);

      //creo los states

      // TODO color by type
      const backgroundColor = cosa ? cosa.color : "#5A3CD6";

      fila.push(
        <span key={`${x}+${y}`}>
          <Dialog
            isOpen={false}
            renderButton={(
              onClick: MouseEventHandler<HTMLButtonElement> | undefined
            ) => {
              return (
                <button
                  className="cuadrado"
                  style={{ backgroundColor }}
                  onClick={onClick}
                >
                  x:{x} y:{y}
                </button>
              );
            }}
            mensaje={"Casilla Vacia"}
          >
            <Select
              options={acciones
                .filter((conAcc) => conAcc.tipo === "casilla vacia")[0]
                .opciones.map((opcion) => {
                  return { label: `label:${opcion}`, value: opcion };
                })}
              value={seleccion}
              onChange={(event) => {
                setSeleccion(event);
              }}
            />
            <p>x: {x}</p>
            <p>y: {y}</p>
            <button
              onClick={() => {
                setXCasilla(x);

                setyCasilla(y);
              }}
            >
              ejecutar
            </button>
          </Dialog>
        </span>
      );
    }
    fila.push(<br key={y}></br>);
    elementos.push(fila);
  }

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
      {xCasilla ? (
        <>
          <br />
          x: {xCasilla}
        </>
      ) : null}

      {yCasilla ? (
        <>
          <br />
          y: {yCasilla}
        </>
      ) : null}
      {seleccion ? (
        <>
          <br />
          seleccion: {seleccion.value}
        </>
      ) : null}
    </>
  );
};
