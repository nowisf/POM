import { ChangeEvent, MouseEventHandler, useState } from "react";
import Dialog from "./componentes/Dialog";
import Select from "react-select";
type Coordenadas = {
  x: number;
  y: number;
};

const confMundo = [
  { mundo: "pom", colorTipo: [{ Tipo: "pared", color: "#FF0000" }] },
];
const mundoActual = "pom";

const obtenerConfActual = () => {
  return confMundo.filter((conf) => conf.mundo === mundoActual);
};

const acciones = [
  { tipo: "casilla vacia", opciones: ["invocar pared", "invocar Test2"] },
];

const tipoToColor = (tipo: string) => {
  return obtenerConfActual()[0].colorTipo.filter((ct) => ct.Tipo === tipo);
};

export type Cosas = Coordenadas & { tipo: string };

export const Mapa = () => {
  const [ancho, setAncho] = useState(0);
  const [alto, setAlto] = useState(0);
  const [centro, setCentro] = useState({ x: 0, y: 0 });
  const [cosas, setCosas] = useState<Cosas[]>([]);

  //TODO cambiar por casilla {x y}
  const [xCasilla, setXCasilla] = useState(NaN);
  const [yCasilla, setyCasilla] = useState(NaN);
  const [seleccion, setSeleccion] = useState({ value: "", label: "test" });

  const elementos = [];

  const setXYCasilla = ({ x, y }: { x: number; y: number }) => {
    setXCasilla(x);

    setyCasilla(y);
  };

  const agregarCosa = ({
    x,
    y,
    tipo,
  }: {
    x: number;
    y: number;
    tipo: string;
  }) => {
    console.log("intentando agregar cosa", x, y, tipo);
    setCosas((prevCosas) => {
      const nuevoCosas = prevCosas.filter((c) => !(c.x === x && c.y === y));
      return [...nuevoCosas, { x, y, tipo }];
    });
    console.log("3", cosas);
  };

  const ejecutarOpcion = () => {
    // TODO no hacer si tiene contenido

    console.log("hola", seleccion);
    const opciones = [
      {
        opcion: "invocar pared",
        fn: () => {
          agregarCosa({ x: xCasilla, y: yCasilla, tipo: "pared" });
        },
      },
    ];

    const f = opciones.find((o) => {
      return o.opcion === seleccion.value;
    })?.fn;
    f();
  };

  //Transformamos aqui los NaN para permitir borrar el numero en el formulario

  const anchoNaNCero = isNaN(ancho) ? 0 : ancho;
  const altoNaNCero = isNaN(alto) ? 0 : alto;
  const xNaNCero = isNaN(centro.x) ? 0 : centro.x;
  const yNaNCero = isNaN(centro.y) ? 0 : centro.y;

  console.log(obtenerConfActual());

  //Area Ejecutables TODO que se ejecuten en alguna parte del bucle temporal

  for (let y = yNaNCero + altoNaNCero; y >= yNaNCero - altoNaNCero; y--) {
    const fila = [];
    for (let x = xNaNCero - anchoNaNCero; x <= xNaNCero + anchoNaNCero; x++) {
      const cosa = cosas.find((c) => c.x === x && c.y === y);
      // TODO color by type
      const backgroundColor = cosa ? tipoToColor(cosa.tipo) : "#5A3CD6";

      fila.push(
        <span key={`${Math.random()}`}>
          <Dialog
            isOpen={x === xCasilla && y === yCasilla}
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
                ejecutarOpcion();
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
