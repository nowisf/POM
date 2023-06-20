import { CONF_MUNDO, MUNDO_ACTUAL, Tipo } from "./constants";

export const tipoToColor = (tipo: Tipo) => {
  return CONF_MUNDO[MUNDO_ACTUAL].color_tipo.find((ct) => ct.tipo === tipo)
    ?.color;
};
export const parseLabel = (label: string) => {
  return label.replace("_", " ");
};
