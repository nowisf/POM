export type Mundo = "pom";
export type Acciones = Record<"casilla_vacia" | "test", Array<Accion>>;
export type Tipo = "pared";
export type Accion = "invocar_pared" | "test";
export type Cosas = Coordenadas & { tipo: Tipo };

export type Coordenadas = {
  x: number;
  y: number;
};
type ConfMundo = Record<
  Mundo,
  Record<"color_tipo", Array<{ tipo: Tipo; color: string }>>
>;

export const CONF_MUNDO: ConfMundo = {
  pom: { color_tipo: [{ tipo: "pared", color: "#FF0000" }] },
};
export const MUNDO_ACTUAL: Mundo = "pom";

export const ACCIONES: Acciones = {
  casilla_vacia: ["invocar_pared"],
  test: [],
};
