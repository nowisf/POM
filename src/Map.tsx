import { ChangeEvent, useState } from "react";
import Dialog from "./componentes/Dialog";
import Select from "react-select";
import { ACCIONES, Accion, Coordenadas, Cosas, Tipo } from "./constants";
import { parseLabel, tipoToColor } from "./utils";

export const Mapa = () => {
  const [ancho, setAncho] = useState(2);
  const [alto, setAlto] = useState(2);
  const [centro, setCentro] = useState({ x: 0, y: 0 });
  const [cosas, setCosas] = useState<Cosas[]>([]);

  //TODO cambiar por casilla {x y}

  const [seleccion, setSeleccion] = useState<
    { value: Accion; label: string } | undefined
  >();

  const elementos = [];

  const agregarCosa = ({
    x,
    y,
    tipo,
  }: {
    x: number;
    y: number;
    tipo: Tipo;
  }) => {
    console.log(2222222, [...cosas, { x, y, tipo }]);

    setCosas((prevCosas) => {
      const nuevoCosas = prevCosas.filter((c) => !(c.x === x && c.y === y));
      return [...nuevoCosas, { x, y, tipo }];
    });
  };

  const ejecutarOpcion = ({ x, y }: Coordenadas) => {
    // TODO no hacer si tiene contenido

    console.log("hola", seleccion);

    if (seleccion?.value === "invocar_pared") {
      agregarCosa({ x, y, tipo: "pared" });
      console.log("aldfkjasldfj", cosas);
    }
  };

  //Transformamos aqui los NaN para permitir borrar el numero en el formulario

  const anchoNaNCero = isNaN(ancho) ? 0 : ancho;
  const altoNaNCero = isNaN(alto) ? 0 : alto;
  const xNaNCero = isNaN(centro.x) ? 0 : centro.x;
  const yNaNCero = isNaN(centro.y) ? 0 : centro.y;

  //Area Ejecutables TODO que se ejecuten en alguna parte del bucle temporal

  const opcionesSelect = ACCIONES["casilla_vacia"].map((opcion) => {
    return { label: parseLabel(opcion), value: opcion };
  });

  for (let y = yNaNCero + altoNaNCero; y >= yNaNCero - altoNaNCero; y--) {
    const fila = [];
    for (let x = xNaNCero - anchoNaNCero; x <= xNaNCero + anchoNaNCero; x++) {
      const cosa = cosas.find((c) => c.x === x && c.y === y);
      const backgroundColor = cosa ? tipoToColor(cosa.tipo) : "#5A3CD6";

      // TODO solo en caso de casilla vacia
      fila.push(
        <span key={x + "+" + y}>
          <Dialog
            renderButton={(onClick) => {
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
              options={opcionesSelect}
              value={seleccion}
              onChange={(event) => {
                if (event) {
                  setSeleccion({
                    label: parseLabel(event.value),
                    value: event.value,
                  });
                }
              }}
            />
            <p>x: {x}</p>
            <p>y: {y}</p>
            <button
              onClick={() => {
                ejecutarOpcion({ x, y });
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
      <Dialog mensaje="Map Config">
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

      {seleccion && (
        <>
          <br />
          seleccion: {seleccion.value}
        </>
      )}
    </>
  );
};
