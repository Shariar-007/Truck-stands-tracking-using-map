import {Ilocation} from "./ilocation";

export interface Locations {
  data: Ilocation[],
  success?: boolean,
  message?: string,
  errorCode?: string,
  responseCode?: number,
  debugMessage?: string
}
